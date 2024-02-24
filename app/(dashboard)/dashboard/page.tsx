import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ExposeCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  // const posts = await db.post.findMany({
  //   where: {
  //     authorId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     published: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Meine Exposés"
        text="Erstellen und verwalten Sie Ihre Exposés"
      >
        <ExposeCreateButton />
      </DashboardHeader>
      <div>
        {/* {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : ( */}
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>Noch keine Exposés</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Sie haben noch keine Exposés erstellt. Erstellen Sie jetzt Ihr
            erstes.
          </EmptyPlaceholder.Description>
          <ExposeCreateButton variant="outline" />
        </EmptyPlaceholder>
        {/* )} */}
      </div>
    </DashboardShell>
  )
}
