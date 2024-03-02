"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { exposeCreateSchema } from "@/lib/validations/expose"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface CreateExposeFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof exposeCreateSchema>

export function CreateExposeForm({
  className,
  ...props
}: CreateExposeFormProps) {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(exposeCreateSchema),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const router = useRouter()

  async function onClick() {
    setIsLoading(true)

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    })

    setIsLoading(false)

    if (!response?.ok) {
      if (response.status === 402) {
        return toast.error("Limit of 3 posts reached.", {
          description: "Please upgrade to the PRO plan.",
        })
      }

      return toast.error("Something went wrong.", {
        description: "Your post was not created. Please try again.",
      })
    }

    const post = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/editor/${post.id}`)
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const response = await fetch("/api/exposes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setIsLoading(false)

    if (!response?.ok) {
      // if (response.status === 402) {
      //   return toast({
      //     title: "Limit of 3 posts reached.",
      //     description: "Please upgrade to the PRO plan.",
      //     variant: "destructive",
      //   })
      // }

      return toast.error("Something went wrong.", {
        description: "Your exposé was not created. Please try again.",
      })
    }

    const expose = await response.json()

    // This forces a cache invalidation.
    router.refresh()

    router.push(`/exposes/${expose.id}`)

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your sign in request failed. Please try again.",
    //     variant: "destructive",
    //   })
    // }
  }

  return (
    <Form {...formMethods} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wohnungsart</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wohnugsart wählen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="old">Altbau</SelectItem>
                    <SelectItem value="new">Neubau</SelectItem>
                    {/* <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Größe in m²</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="120"
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anzahl an Räumen</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="5"
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stockwerk</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="3"
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kaufpreis in €</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="1.000.000 €"
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monatsmiete</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(event) => field.onChange(+event.target.value)}
                  placeholder="3.000 €"
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full",
            "mt-4",
            "justify-center"
          )}
          disabled={isLoading}
        >
          Exposé erstellen
        </Button>
      </form>
    </Form>
  )
}
