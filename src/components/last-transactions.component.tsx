import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { formatCurrency } from "@/utils/currency.util";
import { TransactionType } from "@prisma/client";
import { ITransaction } from "@/interfaces/transactions.interface";

interface LastTransactionsProps {
  lastTransactions: ITransaction[];
}

export function LastTransactions({ lastTransactions }: LastTransactionsProps) {
  const getAmountColor = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.OUTCOME) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.INCOME) {
      return "text-primary";
    }
    return "text-white";
  };
  const getAmountPrefix = (transaction: ITransaction) => {
    if (transaction.type === TransactionType.INCOME) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white"></div>
              <div>
                <p className="text-sm font-bold">{transaction.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
