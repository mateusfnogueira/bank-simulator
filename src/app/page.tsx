"use client";
import { Button, CreateAccountForm } from "@/components";
import { LoginForm } from "@/components/login/login.component";
import { useState } from "react";

export default function Home() {
  const [children, setChildren] = useState("create-account");
  function changeChildren() {
    if (children === "create-account") {
      setChildren("login");
    }
    if (children === "login") {
      setChildren("create-account");
    }
  }

  function textButton() {
    if (children === "create-account") {
      return "Já tenho uma conta";
    }
    if (children === "login") {
      return "Criar uma conta";
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 gap-2">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Bank Simulator
      </h1>
      <p className="text-center">
        Create a bank account and simulate transactions
      </p>
      {children === "create-account" ? <CreateAccountForm /> : <LoginForm />}

      <Button onClick={changeChildren}>{textButton()}</Button>
    </main>
  );
}
