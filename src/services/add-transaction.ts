import { ITransaction } from '@/interfaces/transactions.interface'

export const addTransaction = async (body: ITransaction) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )
  return response.json()
}
