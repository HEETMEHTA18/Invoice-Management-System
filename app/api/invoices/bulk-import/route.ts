
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import * as yaml from "js-yaml";

import { auth } from "@/app/utils/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Fetch settings if user is authenticated
        const settings = session?.user?.id ? await prisma.companySettings.findUnique({
            where: { userId: session.user.id }
        }) : null;

        const text = await req.text();
        let data;

        // Try parsing as JSON first, then YAML
        try {
            data = JSON.parse(text);
        } catch {
            try {
                data = yaml.load(text);
            } catch (e) {
                return NextResponse.json({ error: "Invalid format. Upload JSON or YAML." }, { status: 400 });
            }
        }

        if (!data || !data.transactions || !Array.isArray(data.transactions)) {
            return NextResponse.json({ error: "Invalid data structure. Expected 'transactions' array." }, { status: 400 });
        }

        const createdInvoices = [];
        const errors = [];

        for (const txn of data.transactions) {
            try {
                // Only process Sales vouchers for now
                if (txn.voucher_type !== "Sales") continue;

                // Map YAML fields to Prisma model
                // Assuming date format is "1-Apr-2025" or ISO
                let date = new Date();
                if (txn.date) {
                    // Simple check for "1-Apr-2025" format
                    if (txn.date.match(/^\d{1,2}-[A-Za-z]{3}-\d{4}$/)) {
                        date = new Date(txn.date);
                    } else {
                        date = new Date(txn.date);
                    }
                }

                let subtotal = 0;
                let tax = 0;

                // Calculate totals from inventory
                const items = (txn.inventory || []).map((item: any) => {
                    const amount = parseFloat(item.amount) || 0;
                    subtotal += amount;
                    return {
                        description: item.item_name || "Item",
                        quantity: parseInt(item.quantity) || 1,
                        rate: parseFloat(item.rate) || 0,
                        amount: amount
                    }
                });

                // Calculate tax from ledger allocations
                if (txn.ledger_allocations) {
                    for (const ledger of txn.ledger_allocations) {
                        if (ledger.ledger_name.includes("GST") || ledger.ledger_name.includes("Tax")) {
                            tax += parseFloat(ledger.amount) || 0;
                        }
                    }
                }

                const total = subtotal + tax;

                // Find customer if exists
                let customerId = null;
                if (txn.party_ledger) {
                    const customer = await prisma.customer.findUnique({
                        where: { name: txn.party_ledger }
                    });
                    if (customer) customerId = customer.id;
                }

                // Check for duplicate invoice number
                const invoiceNumber = txn.invoice_no;
                if (invoiceNumber) {
                    const existingInvoice = await prisma.invoice.findFirst({
                        where: { invoiceNumber: invoiceNumber }
                    });
                    if (existingInvoice) {
                        console.log(`Skipping duplicate invoice: ${invoiceNumber}`);
                        continue;
                    }
                }

                const invoice = await prisma.invoice.create({
                    data: {
                        invoiceNumber: txn.invoice_no || `INV-${Date.now()}`,
                        senderName: settings?.name || "Shiv Hardware",
                        senderEmail: settings?.email || "shivhardware@gmail.com",
                        senderAddress: settings?.address || "Shiv Hardware, Nadiad",
                        clientName: txn.party_ledger || "Unknown Client",
                        date: date,
                        status: "Pending", // Default status
                        subtotal: subtotal,
                        tax: tax,
                        total: total,
                        note: txn.narration || "",
                        // Use legacy fields for compatibility if needed, or map properly
                        customer: txn.party_ledger || "Unknown Client",
                        amount: total,
                        customerId: customerId,
                        items: {
                            create: items
                        }
                    },
                });
                createdInvoices.push(invoice);
            } catch (error) {
                console.error("Error creating invoice:", error);
                errors.push({ transaction: txn, error: String(error) });
            }
        }

        return NextResponse.json({
            message: `Successfully created ${createdInvoices.length} invoices.`,
            createdCount: createdInvoices.length,
            errors: errors
        });

    } catch (error) {
        console.error("Bulk import error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
