import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Login attempt for:", email);

    if (!email || !password) {
      console.log("Missing credentials");
      return NextResponse.json({ error: "Missing" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      console.log("Admin user not found in DB");
      return NextResponse.json({ error: "Invalid" }, { status: 401 });
    }

    const valid = await comparePassword(password, admin.passwordHash);
    if (!valid) {
      console.log("Password invalid for user:", email);
      return NextResponse.json({ error: "Invalid" }, { status: 401 });
    }

    console.log("Login successful for:", email);
    const token = await signToken({ id: admin.id, email: admin.email });
    const res = NextResponse.json({ ok: true });
    res.cookies.set("selam_auth", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    return res;
  } catch (e) {
    console.error("Login Error:", e);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
