
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const total = await prisma.invoice.count()
    const withUserId = await prisma.invoice.count({ where: { userId: { not: null } } })
    const withOwnerUserId = await prisma.invoice.count({ where: { ownerUserId: { not: null } } })

    console.log('Total Invoices:', total)
    console.log('Invoices with userId:', withUserId)
    console.log('Invoices with ownerUserId:', withOwnerUserId)
}

main().finally(() => prisma.$disconnect())
