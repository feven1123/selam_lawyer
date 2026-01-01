import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: "Missing" }, { status: 400 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ ok: true });
  await prisma.contactMessage.create({ data: { name, email, phone: phone ?? null, message } });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const token = cookies().get("selam_auth")?.value;
  if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json([]);
  const list = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(list);
}
