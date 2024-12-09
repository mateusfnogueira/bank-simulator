import { CreateAccountForm } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-2">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Bank Simulator
      </h1>
      <p className="text-center">
        Create a bank account and simulate transactions
      </p>
      <CreateAccountForm />
    </main>
  );
}
