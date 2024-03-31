import { Badge } from "@/components/ui/badge"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Expose } from "@prisma/client"
import Link from "next/link"
import { HTMLAttributes } from "react"

export interface ExposesListProps extends HTMLAttributes<HTMLTableElement> {
  exposes: Expose[]
}

export function ExposesList({
  exposes,
  className,
  ...props
}: ExposesListProps) {
  return (
    <Table className={className} {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Size</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exposes.map((expose) => (
          <TableRow key={expose.id}>
            <TableCell className="font-medium">
              <Link href={`/exposes/${expose.id}`} passHref>
                {expose.title}
              </Link>
            </TableCell>
            <TableCell>
              <Badge variant="outline">Draft</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {expose.price.toLocaleString("de-DE")} €
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {expose.size} m²
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {expose.createdAt.toLocaleDateString("de-DE")}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <Icons.moreH className="size-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
