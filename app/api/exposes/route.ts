// import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { db } from "@/lib/db"
import { exposeCreateSchema } from "@/lib/validations/expose"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new Response("Unauthorized", { status: 403 })
    // }

    // const { user } = session
    // const subscriptionPlan = await getUserSubscriptionPlan(user.id)

    // If user is on a free plan.
    // Check if user has reached limit of 3 posts.
    // if (!subscriptionPlan?.isPro) {
    //   const count = await db.post.count({
    //     where: {
    //       authorId: user.id,
    //     },
    //   })

    //   if (count >= 3) {
    //     throw new RequiresProPlanError()
    //   }
    // }

    const json = await req.json()
    const body = exposeCreateSchema.parse(json)

    const expose = await db.expose.create({
      data: body,
      select: {
        id: true,
      },
    })

    return new NextResponse(JSON.stringify(expose))
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    // if (error instanceof RequiresProPlanError) {
    //   return new NextResponse("Requires Pro Plan", { status: 402 })
    // }

    return new NextResponse(null, { status: 500 })
  }
}
