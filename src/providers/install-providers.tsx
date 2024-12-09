"use client";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  locale: string;
  session: Session | null;
}

export const InstallProviders: React.FC<Props> = ({
  children,
  locale,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
