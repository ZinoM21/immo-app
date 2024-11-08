import { MainNav } from "@/components/main-nav"
import { DashboardNav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { dashboardConfig } from "@/config/dashboard"
import Link from "next/link"

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    // <div className="min-h-screen">
    //   <header className="container z-40 bg-background">
    //     <div className="flex h-20 items-center justify-between py-6">
    //       <MainNav items={dashboardConfig.mainNav} />
    //       {/* <nav>
    //         <Link
    //           href="/login"
    //           className={cn(
    //             buttonVariants({ variant: "secondary", size: "sm" }),
    //             "px-4"
    //           )}
    //         >
    //           Anmelden
    //         </Link>
    //       </nav> */}
    //     </div>
    //   </header>
    //   {children}
    // </div>
    <div className="flex min-h-screen flex-col space-y-6">
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={dashboardConfig.mainNav} />
        {/* <UserAccountNav
          user={{
            name: user.name,
            image: user.image,
            email: user.email,
          }}
        /> */}
      </div>
    </header>
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
        <DashboardNav items={dashboardConfig.sidebarNav} />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
    <SiteFooter className="border-t" />
  </div>
  )
}
