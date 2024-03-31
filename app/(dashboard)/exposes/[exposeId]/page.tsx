import { Expose, User } from "@prisma/client"
import { notFound } from "next/navigation"

// import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
// import { getCurrentUser } from "@/lib/session"
// import { Editor } from "@/components/editor"

import { ResponsiveBarChart } from "@/app/(dashboard)/exposes/[exposeId]/components/responsive-bar-chart"
import { DashboardHeader } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { ResponsiveLineChart } from "./components/responsive-line-chart"

const data: DataPoint[] = [
  {
    name: "Jan",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    price: Math.floor(Math.random() * 5000) + 1000,
  },
]

async function getExposeForUser(exposeId: Expose["id"], userId?: User["id"]) {
  return await db.expose.findFirst({
    where: {
      id: exposeId,
      // authorId: userId,
    },
  })
}

export interface DataPoint {
  name: string
  price: number
}

const generateChartData = (price: number, rent: number): DataPoint[] => {
  const data: DataPoint[] = []
  let year = 1
  let amount = price - rent

  while (amount >= 0) {
    const dataPoint: DataPoint = {
      name: `${year}`,
      price: amount,
    }
    data.push(dataPoint)
    amount = price - rent * 12 * year
    year++
  }

  return data
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

  const factorData = generateChartData(expose.price, expose.rent)

  return (
    <>
      <DashboardHeader heading={expose.title} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kaufpreis</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="size-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expose.price.toLocaleString("de-DE")} €
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monatsmiete</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="size-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expose.rent.toLocaleString("de-DE")} €
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Größe</CardTitle>
            <Icons.size className="size-4 text-muted-foreground" />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="size-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expose.size} m²</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zimmer</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="size-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expose.rooms}</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Faktor</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveLineChart data={factorData} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Rendite</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveLineChart data={data} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Mieteinahmen</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveBarChart data={data} />
          </CardContent>
        </Card>

        {/* <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ask a question</CardTitle>
          </CardHeader>
          <CardContent>
            <Chat />
          </CardContent>
        </Card> */}
      </section>
    </>
  )
}
