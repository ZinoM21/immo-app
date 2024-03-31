import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/db"
import { CreateExposeModal } from "./components/create-expose-modal"
import { ExposesList } from "./components/exposes-list"

export const metadata = {
  title: "Exposés",
}

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  const exposes = await db.expose.findMany({
    // where: {
    //   authorId: user.id,
    // },
    // select: {
    //   id: true,
    //   title: true,
    //   published: true,
    //   createdAt: true,
    // },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Meine Exposés"
        text="Erstellen und verwalten Sie Ihre Exposés"
      >
        <div className="relative ml-auto flex-1 md:grow-0">
          <Icons.search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="z-10 w-full rounded-lg bg-background pl-9 md:w-[200px] lg:w-[336px]"
          />
        </div>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Icons.filter className="size-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Icons.page className="size-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <CreateExposeModal
              trigger={
                //
                //
                <Button size="sm" className="h-8 gap-1">
                  <Icons.add className="mr-2 size-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exposé erstellen
                  </span>
                </Button>
              }
            />
          </div>
        </div>
        {exposes?.length ? (
          <ExposesList exposes={exposes} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>Noch keine Exposés</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Sie haben noch keine Exposés erstellt. Erstellen Sie jetzt Ihr
              erstes.
            </EmptyPlaceholder.Description>
            <CreateExposeModal
              trigger={
                //
                //
                <Button>
                  <Icons.add className="mr-2 size-4" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exposé erstellen
                  </span>
                </Button>
              }
            />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
