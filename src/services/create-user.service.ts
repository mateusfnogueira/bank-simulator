"use server";
import bcrypt from "bcrypt";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (data: CreateUserDTO) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      password: hashedPassword,
    }),
  });
  console.log(response, "service");

  return response.json();
};
