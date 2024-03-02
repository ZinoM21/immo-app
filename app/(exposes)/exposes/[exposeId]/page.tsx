import { notFound, redirect } from "next/navigation"
import { Expose, User } from "@prisma/client"

// import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { ExposeCharts } from "@/components/expose-charts"

// import { getCurrentUser } from "@/lib/session"
// import { Editor } from "@/components/editor"

async function getExposeForUser(exposeId: Expose["id"], userId?: User["id"]) {
  return await db.expose.findFirst({
    where: {
      id: exposeId,
      // authorId: userId,
    },
  })
}

interface EditorPageProps {
  params: { exposeId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  const expose = await getExposeForUser(params.exposeId)

  if (!expose) {
    notFound()
  }

  return (
    <>
      <div>{expose.title}</div>
      <ExposeCharts />
    </>
  )
}
