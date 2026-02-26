
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const invoices = await prisma.invoice.findMany({
    where: {
      invoiceNumber: {
        in: ['SAL-101', 'SAL-102', 'SAL-103']
      }
    },
    select: {
      invoiceNumber: true,
      ownerUserId: true,
      userId: true
    }
  })
  console.log(JSON.stringify(invoices, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
