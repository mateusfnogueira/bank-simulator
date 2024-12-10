interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (body: CreateUserDTO) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar transações");
  }
  const data = await response.json();
  return data;
};
