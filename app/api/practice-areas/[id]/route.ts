import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const token = cookies().get("selam_auth")?.value;
  if (!token || !(await verifyToken(token))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { title, description } = await req.json();
  const updated = await prisma.practiceArea.update({ where: { id: params.id }, data: { title, description } });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const token = cookies().get("selam_auth")?.value;
  if (!token || !(await verifyToken(token))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.practiceArea.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
