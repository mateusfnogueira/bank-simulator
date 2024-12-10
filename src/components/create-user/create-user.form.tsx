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
import { FormType, Schema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser } from '@/services/create-user.service'
import { signIn } from 'next-auth/react'

export function CreateAccountForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { isValid } = form.formState

  const onSubmit = async (data: FormType) => {
    const user = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    try {
      const resp = await createUser(user)
      if (resp.id) {
        const result = await signIn('credentials', {
          email: user.email,
          password: user.password,
          redirect: false
        })
        if (result?.ok) {
          window.location.href = '/'
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="confirme sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!isValid} type="submit">
          Criar usuário
        </Button>
      </form>
    </Form>
  )
}
