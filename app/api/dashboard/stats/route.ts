import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

export async function GET(req: NextRequest) {
    try {
        // 1. Fetch user invoices to calculate KPIs
        const invoices = await prisma.invoice.findMany({
            select: {
                id: true,
                clientName: true,
                clientEmail: true,
                total: true,
                amount: true,
                status: true,
                dueDate: true,
                date: true,
                currency: true,
            },
        });

        // 2. Initialize KPI counters
        let totalRevenue = 0;
        let pendingAmount = 0;
        let overdueAmount = 0;
        let totalInvoices = invoices.length;

        // Helper to normalize amount (handle potential string/number mismatch if any)
        const getAmount = (inv: any) => parseFloat(inv.total || inv.amount || "0");

        const now = new Date();
        const highRiskMap = new Map<string, {
            name: string;
            email: string;
            totalOverdue: number;
            count: number;
            lastInvoiceDate: Date | null;
        }>();

        // 3. Process invoices
        for (const inv of invoices) {
            const amt = getAmount(inv);
            const isPaid = inv.status === "Paid";
            const isPending = inv.status === "Pending" || inv.status === "Draft"; // Assuming Draft counts as pending work? Usually Pending.

            // Check for Overdue
            let isOverdue = false;
            if (inv.status !== "Paid" && inv.dueDate) {
                const due = new Date(inv.dueDate);
                if (due < now) {
                    isOverdue = true;
                }
            }

            // Aggregate Totals
            if (isPaid) {
                totalRevenue += amt;
            } else if (isPending) {
                // Add to pending
                pendingAmount += amt;

                if (isOverdue) {
                    overdueAmount += amt;

                    // Track High Risk Customer
                    const key = inv.clientEmail || inv.clientName || "Unknown";
                    if (!highRiskMap.has(key)) {
                        highRiskMap.set(key, {
                            name: inv.clientName || "Unknown",
                            email: inv.clientEmail || "",
                            totalOverdue: 0,
                            count: 0,
                            lastInvoiceDate: null
                        });
                    }
                    const riskProfile = highRiskMap.get(key)!;
                    riskProfile.totalOverdue += amt;
                    riskProfile.count += 1;

                    const invDate = inv.date ? new Date(inv.date) : null;
                    if (invDate && (!riskProfile.lastInvoiceDate || invDate > riskProfile.lastInvoiceDate)) {
                        riskProfile.lastInvoiceDate = invDate;
                    }
                }
            }
        }

        // 4. Format High Risk Customers List
        const highRiskCustomers = Array.from(highRiskMap.values())
            .sort((a, b) => b.totalOverdue - a.totalOverdue) // Sort by highest overdue amount
            .slice(0, 10); // Top 10

        // 5. Recent Activity (Last 5 Invoices)
        const recentActivity = await prisma.invoice.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            select: {
                id: true,
                clientName: true,
                amount: true,
                total: true,
                status: true,
                date: true,
                invoiceNumber: true
            }
        });

        return NextResponse.json({
            kpi: {
                totalRevenue,
                pendingAmount,
                overdueAmount,
                totalInvoices,
                highRiskCount: highRiskMap.size
            },
            highRiskCustomers,
            recentActivity
        });

    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 });
    }
}
