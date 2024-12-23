interface GetLastTransactionsDTO {
  userId: string;
}

export const getLastTransactions = async ({
  userId,
}: GetLastTransactionsDTO) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?userId=${userId}&lastTransactions=${5}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar transações");
  }
  const data = await response.json();
  return data;
};

export const getAllTransactions = async ({
  userId,
}: GetLastTransactionsDTO) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar transações");
  }
  const data = await response.json();
  return data;
};
