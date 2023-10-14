"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
  id: string,
  type: "salary" | "income" | "expense" | "spent" | "investment",
  value: string,
  description: string,
  date: string,
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
