import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";

export function TotalBalanceCard() {
  return (
    <Card className="w-1/3 flex flex-col justify-between items-center py-4">
      <CardContent className="flex gap-2">
        <h2 className="text-2xl font-semibold">Saldo total:</h2>
        <p className="text-4xl font-bold">$0.00</p>
      </CardContent>
      <CardFooter>
        <Link className="text-lg" href="/transactions">
          Acessar extrato
        </Link>
      </CardFooter>
    </Card>
  );
}
