interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (data: CreateUserDTO) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(response, "service");

  return response.json();
};
