const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.customer.count();
        console.log('--- CUSTOMER COUNT: ' + count + ' ---');
        const customers = await prisma.customer.findMany({ take: 5 });
        console.log('--- SAMPLED CUSTOMERS ---');
        console.log(JSON.stringify(customers, null, 2));
    } catch (e) {
        console.error('--- ERROR CHECKING CUSTOMERS ---');
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
