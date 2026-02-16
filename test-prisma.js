
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log("Successfully connected to database");
        const count = await prisma.invoice.count();
        console.log(`Invoice count: ${count}`);
    } catch (e) {
        console.error("Prisma connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
