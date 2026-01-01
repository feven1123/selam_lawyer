const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
    const email = 'admin@gmail.com';
    const password = '123';

    console.log(`Testing login for ${email}...`);

    try {
        const admin = await prisma.admin.findUnique({ where: { email } });

        if (!admin) {
            console.log('❌ Admin user NOT found in database.');
            return;
        }
        console.log('✅ Admin user found:', admin.email);
        console.log('   Hash in DB:', admin.passwordHash);

        const valid = await bcrypt.compare(password, admin.passwordHash);
        if (valid) {
            console.log('✅ Password "123" is VALID.');
        } else {
            console.log('❌ Password "123" is INVALID.');
        }
    } catch (e) {
        console.error('❌ Database Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

testLogin();
