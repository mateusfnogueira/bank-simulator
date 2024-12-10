import { DataTable } from "@/components/ui/data-table";
import { transactionColumns } from "./_columns";
import { getAllTransactions } from "@/services/get-transactions.service";
import { getSession } from "@/lib/session";
import { formatCurrency } from "@/utils/currency.util";

export default async function TransactionsPage() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const data = await getAllTransactions({ userId: session.user.id });

  return (
    <div className="px-2">
      <div className="flex justify-between lg:justify-end">
        <h1>Extrato</h1>
        <p>Saldo parcial: {formatCurrency(session?.user?.totalBalance ?? 0)}</p>
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
}
