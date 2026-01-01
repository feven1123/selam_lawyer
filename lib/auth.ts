import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const key = new TextEncoder().encode(JWT_SECRET);

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function signToken(payload: { id: string; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as { id: string; email: string };
  } catch {
    return null;
  }
}

export async function getAdminFromToken(token: string) {
  const decoded = await verifyToken(token);
  if (!decoded) return null;
  return prisma.admin.findUnique({ where: { id: decoded.id } });
}
