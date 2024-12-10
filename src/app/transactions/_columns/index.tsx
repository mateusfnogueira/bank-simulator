'use client'
import { ITransaction } from '@/interfaces/transactions.interface'
import { formatCurrency } from '@/utils/currency.util'
import { ColumnDef } from '@tanstack/react-table'

export const transactionColumns: ColumnDef<ITransaction>[] = [
  {
    header: 'Título',
    accessorKey: 'title'
  },
  {
    header: 'Destinatário',
    accessorKey: 'recipient',
    cell: ({ row: { original: trasaction } }) =>
      setRecipient(trasaction)
  },
  {
    header: 'Tipo',
    accessorKey: 'type',
    cell: ({ row: { original: trasaction } }) =>
      trasaction.type === 'INCOME' ? 'Entrada' : 'Saída'
  },
  {
    header: 'Valor',
    accessorKey: 'amount',
    cell: ({ row: { original: trasaction } }) =>
      formatCurrency(trasaction.amount)
  },
  {
    header: 'Data de criação',
    accessorKey: 'createdAt',
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.createdAt || '').toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }
      )
  }
]

function setRecipient(transaction: ITransaction) {
  if (transaction.category === 'PIX') {
    return 'PIX para ' + transaction.recipient
  } else if (transaction.category === 'TED') {
    return 'TED para ' + transaction.recipient
  }
  return transaction.recipient || '-'
}
