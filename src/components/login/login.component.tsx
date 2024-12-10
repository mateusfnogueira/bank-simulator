'use client'
import { useForm } from 'react-hook-form'
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
import { signIn } from 'next-auth/react'
import { FormType, Schema } from './schema'

export function LoginForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isValid } = form.formState

  const onSubmit = async (data: FormType) => {
    const user = {
      email: data.email,
      password: data.password
    }
    signIn('credentials', {
      email: user.email,
      password: user.password,
      callbackUrl: '/'
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu melhor email..."
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  placeholder="crie uma senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isValid} type="submit">
          Login
        </Button>
      </form>
    </Form>
  )
}
