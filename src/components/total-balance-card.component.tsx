import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Session } from "next-auth";
import { formatCurrency } from "@/utils/currency.util";

interface TotalBalanceCardProps {
  session: Session;
}

export function TotalBalanceCard({ session }: TotalBalanceCardProps) {
  const { totalBalance, specialBalance } = session?.user;

  return (
    <Card className="w-full lg:w-1/3 flex flex-col justify-between items-center py-4 px-2 h-fit">
      <div className="flex w-full gap-1">
        <h2 className="text-2xl font-semibold">Saldo total:</h2>
        <p className="text-2xl font-bold">
          {formatCurrency(Number(totalBalance) + Number(specialBalance))}
        </p>
      </div>
      <CardContent className="flex flex-col gap-2 mt-2 w-full p-0">
        <div className="flex items-center w-full gap-0.5">
          <h2 className="text-lg font-semibold">Saldo real:</h2>
          <p className="text-lg font-bold text-green-500">
            {formatCurrency(totalBalance as number)}
          </p>
        </div>
        <div className="flex items-center w-full gap-0.5">
          <h2 className="text-lg font-semibold">Cheque especial:</h2>
          <p className="text-lg font-bold text-orange-950">
            {formatCurrency(specialBalance as number)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <Link className="text-lg" href="/transactions">
          Acessar extrato
        </Link>
      </CardFooter>
    </Card>
  );
}
