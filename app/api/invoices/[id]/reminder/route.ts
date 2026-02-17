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
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  if (!invoice.clientEmail) {
    return NextResponse.json({ error: "Client email missing" }, { status: 400 });
  }

  try {
    const subject = `Reminder: Payment Due for Invoice #${invoice.invoiceNumber}`;
    const body = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Payment Reminder</h2>
        <p>Dear ${invoice.clientName},</p>
        <p>This is a reminder that payment for <strong>Invoice #${invoice.invoiceNumber}</strong> is pending.</p>
        <p><strong>Amount Due:</strong> ${invoice.currency} ${Number(invoice.total).toLocaleString()}</p>
        <p>Thank you!</p>
      </div>
    `;

    await sendInvoiceReminder({
      userId: session.user.id,
      to: invoice.clientEmail,
      subject,
      body,
    });

    return NextResponse.json({ success: true, message: "Reminder sent successfully!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
