'use client'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormType, Schema } from './schema'
import { ITransaction } from '@/interfaces/transactions.interface'
import { TransactionType } from '@prisma/client'
import { Select } from '@radix-ui/react-select'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  NumericFormat,
  NumberFormatBase as NumberFormat
} from 'react-number-format'
import { useSession } from 'next-auth/react'
import { addTransaction } from '@/services/add-transaction'
import { useRouter } from 'next/navigation'

export default function TransfersPage() {
  const session = useSession()
    const router = useRouter()

  const form = useForm<FormType>({
    resolver: zodResolver(Schema),
    mode: 'all',
    defaultValues: {
      type: 'pix',
      pixKey: '',
      bank: '',
      account: '',
      amount: '0'
    }
  })

  const { isValid } = form.formState

  const onSubmit = async (data: FormType) => {
    const transfer: ITransaction = {
      title: `Transferência ${data.type}`,
      type: TransactionType.OUTCOME,
      recipient:
        data.type === 'pix'
          ? (data.pixKey as string)
          : `${data.bank} - ${data.account}`,
      category: data.type.toUpperCase(),
      amount: Number(
        data.amount
          .replace('R$ ', '')
          .replace('.', '')
          .replace(',', '.')
      ),
      userId: session.data?.user.id as string
    }

    try {
      const resp = await addTransaction(transfer)
      if (resp.transaction.id) {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (!session) {
    return null
  }

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form className="mt-10 flex w-1/2 flex-col items-center gap-1 rounded-xl border border-cyan-950 p-6 shadow-sm shadow-black">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
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
            disabled={form.watch('type') !== 'pix'}
            control={form.control}
            name="pixKey"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Chave Pix</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Digite a chave pix..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={form.watch('type') === 'pix'}
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Banco</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o banco..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={form.watch('type') === 'pix'}
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Conta</FormLabel>
                <FormControl>
                  <NumberFormat
                    {...field}
                    format={(inputValue: string) => {
                      const cleaned = inputValue.replace(/\D/g, '')
                      const match = cleaned.match(/^(\d{6})(\d{1})$/)
                      if (match) {
                        return `${match[1]}-${match[2]}`
                      }
                      return inputValue
                    }}
                    maxLength={8}
                    placeholder="Digite a conta..."
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <NumericFormat
                    {...field}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    placeholder="Digite o valor da transferência..."
                    customInput={Input}
                    onValueChange={(values) => {
                      field.onChange(values.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-3"
            disabled={!isValid}
            onClick={form.handleSubmit(onSubmit)}
          >
            Transferir
          </Button>
        </form>
      </Form>
    </div>
  )
}
