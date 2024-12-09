'use client'
import { ITransaction } from "@/interfaces/transactions.interface";
import { formatCurrency } from "@/utils/currency.util";
import { ColumnDef } from "@tanstack/react-table";


export const transactionColumns: ColumnDef<ITransaction>[] = [

  {
    header: 'Título',
    accessorKey: 'title',
  },
  {
    header: 'Tipo',
    accessorKey: 'type',
    cell: ({row: {original: trasaction}}) => trasaction.type === 'INCOME' ? 'Entrada' : 'Saída', 
  },
  {
    header: 'Valor',
    accessorKey: 'amount',
    cell: ({row: {original: trasaction}}) => formatCurrency(trasaction.amount), 
  },
  {
    header: 'Data de criação',
    accessorKey: 'createdAt',
        cell: ({ row: { original: transaction } }) =>
      new Date(transaction.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
  },
]