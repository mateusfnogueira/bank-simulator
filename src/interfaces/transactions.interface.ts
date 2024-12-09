import { TransactionType } from "@prisma/client";

export interface ITransaction {
  id: String;
  title: String;
  type: TransactionType;
  amount: number;
  category: String;
  createdAt: Date;
  updatedAt: Date;
  userId: String;
}
