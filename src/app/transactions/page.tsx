import { DataTable } from "@/components/ui/data-table";
import { transactionColumns } from "./_columns";
import { getAllTransactions } from "@/services/get-transactions.service";
import { getSession } from "@/lib/session";
import { formatCurrency } from "@/utils/currency.util";

export default async function TransactionsPage() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  console.log("inicio");
  try {
    const session = await getSession();
    console.log("session", session);
    if (!session) {
      console.log("no session");
      return null;
    }
    const data = await getAllTransactions({ userId: session.user.id });

    return (
      <div className="px-2">
        <div className="flex justify-between lg:justify-end">
          <h1>Extrato</h1>
          <p>
            Saldo parcial: {formatCurrency(session?.user?.totalBalance ?? 0)}
          </p>
        </div>
        <div className="px-2 mt-3">
          {data.transactions.length > 0 ? (
            <DataTable columns={transactionColumns} data={data.transactions} />
          ) : (
            <p>No transactions found</p>
          )}
        </div>
      </div>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
}
