import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (
          credentials?.username === "jsmith" &&
          credentials?.password === "password"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
