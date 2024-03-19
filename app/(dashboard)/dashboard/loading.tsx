import { DashboardHeader } from "@/components/header"
import { ExposeCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <ExposeCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        Loading...
      </div>
    </DashboardShell>
  )
}
