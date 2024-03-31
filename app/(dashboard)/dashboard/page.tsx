import Link from "next/link"

import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ExposeCreateButton } from "@/components/post-create-button"
import { DashboardShell } from "@/components/shell"
import { db } from "@/lib/db"

export const metadata = {
  title: "Dashboard",
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
        <ExposeCreateButton />
      </DashboardHeader>
      <div>
        {exposes?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {exposes.map((expose) => (
              // <PostItem key={post.id} post={post} />
              <div key={expose.id}>
                {expose.title}

                <Link href={`/exposes/${expose.id}`}>Ansehen</Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>Noch keine Exposés</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Sie haben noch keine Exposés erstellt. Erstellen Sie jetzt Ihr
              erstes.
            </EmptyPlaceholder.Description>
            <ExposeCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
