import { authOptions } from "@/lib/auth";
import { PrismaClient, TransactionType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // const session = await getServerSession({ req, ...authOptions })

  // if (!session) {
  //   return NextResponse.json(
  //     { error: 'You must be logged in to create a transaction' },
  //     { status: 401 }
  //   )
  // }

  const { searchParams } = req.nextUrl;
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
      return NextResponse.json({ transactions: [] }, { status: 200 });
    }

    prisma.$disconnect();

    const resp = NextResponse.json({ transactions }, { status: 200 });
    resp.headers.set("Access-Control-Allow-Origin", "*");
    resp.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    resp.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return resp;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session) {
    return NextResponse.json(
      { error: "You must be logged in to create a transaction" },
      { status: 401 }
    );
  }
  const { userId, title, type, recipient, category, amount } = await req.json();

  if (!userId || !title || !type || !recipient || !category || !amount) {
    return NextResponse.json(
      {
        error:
          "userId, title, type, recipient, category and amount are required",
      },
      { status: 400 }
    );
  }

  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        title,
        type,
        recipient,
        category,
        amount,
      },
    });

    if (type === TransactionType.OUTCOME) {
      await prisma.user.update({
        where: { id: userId },
        data: { totalBalance: { decrement: amount } },
      });
    }

    prisma.$disconnect();

    const resp = NextResponse.json({ transaction }, { status: 200 });
    resp.headers.set("Access-Control-Allow-Origin", "*");
    resp.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    resp.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return resp;
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating transaction" },
      { status: 500 }
    );
  }
}
