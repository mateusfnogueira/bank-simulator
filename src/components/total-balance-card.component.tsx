import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";

export function TotalBalanceCard() {
  return (
    <Card className="w-full lg:w-1/3 flex flex-col justify-between items-center py-4 px-2 h-fit">
      <div className="flex w-full gap-1">
        <h2 className="text-2xl font-semibold">Saldo total:</h2>
        <p className="text-4xl font-bold">$0.00</p>
      </div>
      <CardContent className="flex flex-col gap-2 mt-2 w-full p-0">
        <div className="flex items-center w-full">
          <h2 className="text-lg font-semibold">Saldo real:</h2>
          <p className="text-lg font-bold text-green-500">$0.00</p>
        </div>
        <div className="flex items-center w-full">
          <h2 className="text-lg font-semibold">Cheque especial:</h2>
          <p className="text-lg font-bold text-orange-950">$0.00</p>
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
