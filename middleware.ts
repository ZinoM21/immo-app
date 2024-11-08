import { authMiddleware } from "@clerk/nextjs"
// import { getToken } from "next-auth/jwt"
// import { withAuth } from "next-auth/middleware"

export default authMiddleware({})

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/exposes/:path*",
    "/login",
    "/register",
  ],
}

// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req })
//     const isAuth = !!token
//     const isAuthPage =
//       req.nextUrl.pathname.startsWith("/login") ||
//       req.nextUrl.pathname.startsWith("/register")

//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/dashboard", req.url))
//       }

//       return null
//     }

//     // if (!isAuth) {
//     //   let from = req.nextUrl.pathname;
//     //   if (req.nextUrl.search) {
//     //     from += req.nextUrl.search;
//     //   }

//     //   return NextResponse.redirect(
//     //     new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
//     //   );
//     // }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true
//       },
//     },
//   }
// )

// --- Clerk boilerplate ---:
// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// }
