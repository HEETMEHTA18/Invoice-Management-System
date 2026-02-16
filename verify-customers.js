
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.customer.count();
        console.log(`Total Customers: ${count}`);

        const customers = await prisma.customer.findMany();
        console.log("Customers:");
        customers.forEach(c => {
            console.log(`- ${c.name} (${c.email || 'No Email'})`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
