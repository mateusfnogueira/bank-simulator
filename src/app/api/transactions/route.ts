import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const request = await req.json();
  console.log(request);
  const transactions = await prisma.transaction.findMany();

  return { transactions };
}
