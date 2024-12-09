import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const userId = searchParams.get("userId");
  const lastTransactions = searchParams.get("lastTransactions");
  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 }
    );
  }
  try {
    let transactions;
    if (lastTransactions) {
      transactions = await prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: parseInt(lastTransactions, 10) || 5,
      });
    } else {
      transactions = await prisma.transaction.findMany({
        where: { userId },
      });
    }

    if (!transactions) {
      return NextResponse.json(
        { transactions: [] },
        { status: 200 }
      );
    }


    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching transactions" },
      { status: 500 }
    );
  }
}
