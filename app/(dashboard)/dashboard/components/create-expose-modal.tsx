import { CreateExposeForm } from "@/components/forms/create-expose-form"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogTriggerProps } from "@radix-ui/react-dialog"
import { ReactNode } from "react"

interface PostCreateButtonProps extends DialogTriggerProps {
  trigger: ReactNode
}

export function CreateExposeModal({
  className,
  trigger,
  ...props
}: PostCreateButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className={className} {...props}>
        {trigger}
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
