
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findFirst()
    if (!user) {
        console.log('No user found.')
        return
    }
    console.log('User found:', user.id, user.email)

    const updated = await prisma.invoice.updateMany({
        where: {
            OR: [
                { ownerUserId: null },
                { userId: null }
            ]
        },
        data: {
            ownerUserId: user.id,
            userId: user.id
        }
    })
    console.log('Updated invoices:', updated.count)
}

main().finally(() => prisma.$disconnect())
