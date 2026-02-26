
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('Current DATABASE_URL:', process.env.DATABASE_URL)
    try {
        const start = Date.now()
        const result = await prisma.$queryRaw`SELECT 1 as connected`
        const end = Date.now()
        console.log('Success! Time:', end - start, 'ms')
        console.log('Result:', result)
    } catch (e: any) {
        console.error('FAILED to connect!')
        console.error('Code:', e.code)
        console.error('Message:', e.message)
    }
}

main().finally(() => prisma.$disconnect())
