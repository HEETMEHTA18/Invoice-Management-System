
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

// GET: Get a single invoice with items
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
      include: { items: true },
    });
    if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
  }
}

// PUT: Update an invoice (using PUT as it replaces the resource conceptually if we replace items)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();
    const { items, ...invoiceData } = data;

    // Update invoice and optionally replace items
    const updateData: any = {
      ...invoiceData,
      template: invoiceData.template || undefined,
      date: invoiceData.date ? new Date(invoiceData.date) : undefined,
      dueDate: invoiceData.dueDate ? new Date(invoiceData.dueDate) : undefined,
    };

    // Calculate tax breakdown matching the POST logic
    if (updateData.subtotal !== undefined && updateData.taxRate !== undefined) {
      const subtotal = Number(updateData.subtotal);
      const discount = Number(updateData.discount) || 0;
      const taxRate = Number(updateData.taxRate);
      const gstType = updateData.gstType || "INTRA";

      const taxableAmount = Math.max(0, subtotal - discount);
      const totalTax = (taxableAmount * taxRate) / 100;

      updateData.tax = totalTax;
      if (gstType === "INTRA") {
        updateData.cgst = totalTax / 2;
        updateData.sgst = totalTax / 2;
        updateData.igst = 0;
      } else {
        updateData.igst = totalTax;
        updateData.cgst = 0;
        updateData.sgst = 0;
      }
      updateData.total = taxableAmount + totalTax;
      updateData.amount = updateData.total; // Legacy field

      // Recalculate balance based on existing amountPaid
      const existingInvoice = await prisma.invoice.findUnique({
        where: { id: Number(id) },
        select: { amountPaid: true }
      });
      const amountPaid = Number(existingInvoice?.amountPaid || 0);
      updateData.amountPaid = amountPaid;
      updateData.balance = Number(updateData.total) - amountPaid;
    }

    if (items) {
      // Transactional update would be better, but simple approach for now
      // Delete existing items and create new ones
      await prisma.invoiceItem.deleteMany({ where: { invoiceId: Number(id) } });
      updateData.items = {
        create: items.map(
          (item: { description: string; hsnCode?: string; quantity: number | string; rate: number | string; amount: number | string }) => ({
            description: item.description,
            hsnCode: item.hsnCode || null,
            quantity: Number(item.quantity),
            rate: Number(item.rate),
            amount: Number(item.amount),
          })
        ),
      };
    }

    const invoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: updateData as any,
      include: { items: true },
    });
    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Failed to update invoice:", error);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

// DELETE: Delete an invoice
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.invoice.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete invoice:", error);
    return NextResponse.json({ error: "Failed to delete invoice" }, { status: 500 });
  }
}

// PATCH: Partial update (e.g., status)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();

    const invoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: data,
    });
    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Failed to update invoice:", error);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}
