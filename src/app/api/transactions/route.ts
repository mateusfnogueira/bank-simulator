import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log(req.nextUrl);
  const { searchParams } = req.nextUrl
  const userId = searchParams.get("userId");
  const lastTransactions = searchParams.get("lastTransactions");
  console.log(userId, 'userId');
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
      console.log(transactions, 'transactions');
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
