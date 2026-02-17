
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { sendInvoiceReminder } from "@/app/utils/gmail";

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
        });

        if (!invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        if (!invoice.clientEmail) {
            return NextResponse.json({ error: "Client email is missing for this invoice" }, { status: 400 });
        }

        // Dynamic email content
        const subject = `Reminder: Payment Due for Invoice #${invoice.invoiceNumber}`;
        const body = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #000;">Payment Reminder</h2>
        <p>Dear ${invoice.clientName},</p>
        <p>This is a friendly reminder that payment for <strong>Invoice #${invoice.invoiceNumber}</strong> is currently pending.</p>
        <p><strong>Amount Due:</strong> ${invoice.currency} ${Number(invoice.total).toLocaleString()}</p>
        <p><strong>Due Date:</strong> ${invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</p>
        <div style="margin: 24px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard/invoices" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">View Invoice</a>
        </div>
        <p>Thank you for your business!</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">Sent via Invoice Management System</p>
      </div>
    `;

        await sendInvoiceReminder({
            userId: session.user.id,
            to: invoice.clientEmail,
            subject,
            body,
        });

        return NextResponse.json({ success: true, message: "Reminder sent successfully" });
    } catch (error: any) {
        console.error("Failed to send reminder:", error);
        return NextResponse.json({ error: error.message || "Failed to send reminder" }, { status: 500 });
    }
}
