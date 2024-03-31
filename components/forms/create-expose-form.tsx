"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { exposeCreateSchema } from "@/lib/validations/expose"

import { ROUTES } from "@/config/api-routes"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import {
  Form,
  FormControl,
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

interface CreateExposeFormProps extends React.HTMLAttributes<HTMLFormElement> {}

type ExposeFormValues = z.infer<typeof exposeCreateSchema>

export function CreateExposeForm({
  className,
  ...props
}: CreateExposeFormProps) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const formMethods = useForm<ExposeFormValues>({
    resolver: zodResolver(exposeCreateSchema),
  })
  const { control, handleSubmit } = formMethods

  const createPost = async (values: ExposeFormValues) => {
    const response = await fetch(ROUTES.CREATE_EXPOSE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    const expose = await response.json()
    return expose
  }

  const onSubmit = async (values: z.infer<typeof exposeCreateSchema>) => {
    setIsPending(true)
    try {
      const expose = await createPost(values)
      // router.refresh()
      router.push(`/exposes/${expose.id}`)
      toast.success("Exposé erstellt.")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong.", {
        description: `Your exposé was not created. ${error.message}`,
      })
    }
    setIsPending(false)
  }

  return (
    <Form {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
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
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            "Exposé erstellen"
          )}
        </Button>
      </form>
    </Form>
  )
}
