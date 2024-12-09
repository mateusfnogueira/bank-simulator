import { authOptions } from "@/lib/auth";
import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import { InstallProviders } from "@/providers/install-providers";
import { AuthWrapper } from "@/providers/auth-provider";
import { Header } from "@/components/header/header.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bank Simulator",
  description: "Create a bank account and simulate transactions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <InstallProviders session={session} locale="en">
          <AuthWrapper>
            <Header />
            {children}
          </AuthWrapper>
        </InstallProviders>
      </body>
    </html>
  );
}
