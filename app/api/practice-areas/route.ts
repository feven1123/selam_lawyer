import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json([]);
  const list = await prisma.practiceArea.findMany({ orderBy: { title: "asc" } });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const token = cookies().get("selam_auth")?.value;
  if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description } = await req.json();
  if (!title || !description) return NextResponse.json({ error: "Missing" }, { status: 400 });
  const created = await prisma.practiceArea.create({ data: { title, description } });
  return NextResponse.json(created);
}
