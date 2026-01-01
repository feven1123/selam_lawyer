import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) return;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  await prisma.admin.create({ data: { email, passwordHash: hash } });
}

main()
  .catch(() => {})
  .finally(async () => {
    await prisma.$disconnect();
  });
