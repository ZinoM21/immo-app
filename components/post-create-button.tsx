"use client"

import * as React from "react"
// import { useRouter } from "next/navigation"

import { Icons } from "@/components/icons"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { CreateExposeForm } from "./forms/create-expose-form"

interface PostCreateButtonProps extends ButtonProps {}

export function ExposeCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  // const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant }),
          {
            "cursor-not-allowed opacity-60": isLoading,
          },
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 size-4 animate-spin" />
        ) : (
          <Icons.add className="mr-2 size-4" />
        )}
        Exposé erstellen
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Exposé erstellen</DialogTitle>
          <DialogDescription>
            Um ein neues Exposé zu erstellen, benötigen wir einige Informationen
            über die Immobilie.
          </DialogDescription>
          <CreateExposeForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
