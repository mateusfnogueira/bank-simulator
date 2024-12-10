import { LastTransactions, TotalBalanceCard } from "@/components";
import { getSession } from "@/lib/session";
import { getLastTransactions } from "@/services/get-transactions.service";

export default async function HomePage() {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const lastTransactions = await getLastTransactions({
    userId: session?.user.id as string,
  });

  return (
    <div className="flex h-screen flex-col-reverse justify-end gap-6 p-4 lg:flex-row">
      <LastTransactions lastTransactions={lastTransactions.transactions} />
      <TotalBalanceCard session={session} />
    </div>
  );
}
