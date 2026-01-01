import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json(null);
  const attorney = await prisma.attorney.findFirst();
  return NextResponse.json(attorney);
}

export async function PUT(req: Request) {
  const token = cookies().get("selam_auth")?.value;
  if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, bio, education, experience, photoUrl } = await req.json();
  const existing = await prisma.attorney.findFirst();
  const updated = existing
    ? await prisma.attorney.update({ where: { id: existing.id }, data: { name, bio, education, experience, photoUrl } })
    : await prisma.attorney.create({ data: { name, bio, education, experience, photoUrl } });
  return NextResponse.json(updated);
}
