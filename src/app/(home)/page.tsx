import { LastTransactions, TotalBalanceCard } from "@/components";
import { getSession } from "@/lib/session";
import { getLastTransactions } from "@/services/get-transactions.service";

export default async function HomePage() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  console.log("inicio");
  try {
    const session = await getSession();
    console.log("session", session);
    if (!session) {
      console.log("no session");
      return null;
    }

    const lastTransactions = await getLastTransactions({
      userId: session?.user.id as string,
    });
    console.log("lastTransactions", lastTransactions);

    return (
      <div className="flex h-screen flex-col-reverse justify-end gap-6 p-4 lg:flex-row">
        <LastTransactions lastTransactions={lastTransactions.transactions} />
        <TotalBalanceCard session={session} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}
