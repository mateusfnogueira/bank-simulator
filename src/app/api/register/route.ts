import { PrismaClient, TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, name, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      totalBalance: 0,
      specialBalance: 500,
      password: hashedPassword,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      amount: 10000,
      title: "Initial deposit",
      type: TransactionType.INCOME,
      userId: user.id,
      category: "Salary",
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { totalBalance: transaction.amount },
  });

  const resp = NextResponse.json(user, { status: 201 });
  resp.headers.set("Access-Control-Allow-Origin", "*");
  resp.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  resp.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return resp;
}
