import { AI } from "./action"

interface ExposeLayoutPropse {
  children?: React.ReactNode
}

export default function ExposeLayout({ children }: ExposeLayoutPropse) {
  return (
    <div className="container mx-auto grid items-start gap-10">
      <AI>{children}</AI>
    </div>
  )
}
