"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormType, Schema } from "./schema";
import { ITransaction } from "@/interfaces/transactions.interface";
import { TransactionType } from "@prisma/client";
import { useState } from "react";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TransfersPage() {
  const [pixData, setPixData] = useState<any | null>(null);

  const form = useForm<FormType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      type: "pix",
      pixKey: "",
      bank: "",
      account: "",
      amount: 0,
    },
  });

  async function consultaChavePix(pixKey: string) {
    const response = await fetch(`/api/validate?pixKey=${pixKey}`);
    const data = await response.json();
    console.log(data);
    setPixData(data);
  }

  const onSubmit = async (data: FormType) => {
    const transfer: ITransaction = {
      title: `Transferência ${data.type}`,
      type: TransactionType.OUTCOME,
      recipient:
        data.type === "pix"
          ? (data.pixKey as string)
          : `${data.bank} - ${data.account}`,
      category: data.type.toUpperCase(),
      amount: data.amount,
      userId: "1",
    };

    console.log(transfer);
  };

  return (
    <Form {...form}>
      <form className="p-6 flex flex-col items-center w-full gap-1">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="ted">TED</SelectItem>
                    <SelectItem value="doc">DOC</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.watch("type") !== "pix"}
          control={form.control}
          name="pixKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chave Pix</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    consultaChavePix(e.target.value);
                  }}
                  placeholder="Digite a chave pix..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.watch("type") === "pix"}
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banco</FormLabel>
              <FormControl>
                <Input placeholder="Digite o banco..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.watch("type") === "pix"}
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <Input placeholder="Digite a conta..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o valor da transferência..."
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-3" onClick={form.handleSubmit(onSubmit)}>
          Transferir
        </Button>
      </form>
    </Form>
  );
}
