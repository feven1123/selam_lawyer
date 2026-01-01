import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json({ phone: null, email: null, address: null, about: null, mission: null, vision: null, values: null });
  const settings = await prisma.siteSettings.findFirst();
  if (!settings) return NextResponse.json(await prisma.siteSettings.create({ data: {} }));
  return NextResponse.json(settings);
}

export async function PUT(req: Request) {
  const token = cookies().get("selam_auth")?.value;
  if (!token || !verifyToken(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { phone, email, address, about, mission, vision, values } = await req.json();
  const existing = await prisma.siteSettings.findFirst();
  const data: any = { phone, email, address, about, mission, vision, values };
  const updated = existing
    ? await prisma.siteSettings.update({ where: { id: existing.id }, data })
    : await prisma.siteSettings.create({ data });
  return NextResponse.json(updated);
}
