import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "insira seu email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!credentials) {
          throw new Error("Não há credenciais");
        }
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return user;
        } else {
          throw new Error("Credenciais inválidas");
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: { id: token.id as string },
      });

      if (session?.user) {
        session.user.id = user?.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.totalBalance = Number(user?.totalBalance);
        session.user.specialBalance = Number(user?.specialBalance);
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
