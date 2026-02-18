import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { auth } from "@/app/utils/auth";
import { sendInvoiceReminder } from "@/app/utils/gmail";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: Number(id) },
    include: { items: true },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  if (!invoice.clientEmail) {
    return NextResponse.json({ error: "Client email missing" }, { status: 400 });
  }

  try {
    // Generate PDF
    const companySettings = await prisma.companySettings.findUnique({
      where: { userId: session.user.id },
    });

    const formattedInvoice = {
      ...invoice,
      date: invoice.date.toISOString(),
      dueDate: invoice.dueDate?.toISOString() || null,
      subtotal: invoice.subtotal.toString(),
      total: invoice.total.toString(),
      amount: invoice.total.toString(),
      items: invoice.items.map(item => ({
        ...item,
        rate: item.rate.toString(),
        amount: item.amount.toString(),
      })),
    };

    const { generateInvoicePDFBuffer } = await import("@/app/utils/pdfGenerator");
    const pdfBuffer = generateInvoicePDFBuffer(formattedInvoice as any, companySettings || undefined);

    const subject = `Reminder: Payment Due for Invoice #${invoice.invoiceNumber}`;
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

    return NextResponse.json({ success: true, message: "Reminder sent successfully!" });
  } catch (err: any) {
    console.error("Reminder Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
