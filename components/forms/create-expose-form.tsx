"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { exposeSchema } from "@/lib/validations/expose"
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

type FormData = z.infer<typeof exposeSchema>

export function CreateExposeForm({
  className,
  ...props
}: CreateExposeFormProps) {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(exposeSchema),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  //   const searchParams = useSearchParams()

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Exposé created",
        description: "You can now retireve your marketing material.",
      })
    }, 1000)

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
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
      <Button
        type="submit"
        className={cn(
          buttonVariants({ variant: "default" }),
          "w-full",
          "mt-4",
          "justify-center"
        )}
        disabled={isLoading}
        />
    </Form>
  )
}
