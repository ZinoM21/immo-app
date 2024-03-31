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
import { CreateExposeModal } from "./components/create-expose-modal"

export default function DashboardLoading() {
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
            className="w-full rounded-lg bg-background pl-9 md:w-[200px] lg:w-[336px]"
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
        Loading...
      </div>
    </DashboardShell>
  )
}
