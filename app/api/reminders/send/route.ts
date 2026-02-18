
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { sendInvoiceReminder } from "@/app/utils/gmail";
import { generateInvoicePDFBuffer } from "@/app/utils/pdfGenerator";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { invoiceId } = await req.json();
    if (!invoiceId) {
      return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(invoiceId) },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (!invoice.clientEmail) {
      return NextResponse.json({ error: "Client email is missing for this invoice" }, { status: 400 });
    }

    // Fetch company settings for the user
    const companySettings = await prisma.companySettings.findUnique({
      where: { userId: session.user.id },
    });

    // Generate PDF Buffer
    // Map Decimal to string for the generator
    const formattedInvoice = {
      ...invoice,
      date: invoice.date.toISOString(),
      dueDate: invoice.dueDate?.toISOString() || null,
      subtotal: invoice.subtotal.toString(),
      total: invoice.total.toString(),
      amount: invoice.total.toString(), // backward compat
      items: invoice.items.map(item => ({
        ...item,
        rate: item.rate.toString(),
        amount: item.amount.toString(),
      })),
    };

    const pdfBuffer = generateInvoicePDFBuffer(formattedInvoice as any, companySettings || undefined);

    // Professional HTML Template
    const subject = `Invoice #${invoice.invoiceNumber} from ${invoice.senderName || 'our company'}`;
    const { getInvoiceReminderTemplate } = await import("@/app/utils/emailTemplates");
    const body = getInvoiceReminderTemplate({
      clientName: invoice.clientName || 'Valued Customer',
      invoiceNumber: invoice.invoiceNumber,
      amountDue: Number(invoice.balance).toLocaleString(),
      dueDate: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A',
      senderName: invoice.senderName || 'Shiv Hardware',
      senderAddress: invoice.senderAddress || 'Shiv Hardware, Nadiad',
      logoUrl: companySettings?.logo,
      currency: invoice.currency
    });

    await sendInvoiceReminder({
      userId: session.user.id,
      to: invoice.clientEmail,
      subject,
      body,
      attachment: pdfBuffer,
      attachmentName: `invoice-${invoice.invoiceNumber}.pdf`,
    });

    return NextResponse.json({ success: true, message: "Invoice sent successfully" });
  } catch (error: any) {
    console.error("Failed to send invoice:", error);
    return NextResponse.json({ error: error.message || "Failed to send invoice" }, { status: 500 });
  }
}
