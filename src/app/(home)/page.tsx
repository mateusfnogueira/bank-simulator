import { LastTransactions, TotalBalanceCard } from "@/components";
import { ITransaction } from "@/interfaces/transactions.interface";

const lastTransactions: ITransaction[] = [
  {
    id: "1",
    userId: "1",
    title: "Teste",
    amount: 100,
    type: "INCOME",
    category: "teste",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function HomePage() {
  return (
    <div className="flex h-screen p-4 gap-6 flex-col-reverse justify-end lg:flex-row">
      <LastTransactions lastTransactions={lastTransactions} />
      <TotalBalanceCard />
    </div>
  );
}
