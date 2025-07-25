"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps {
  data: Array<{
    id: number
    header: string
    type: string
    status: string
    target: string
    limit: string
    reviewer: string
  }>
}

export function DataTableSimple({ data }: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
        <CardDescription>
          A list of your recent tasks and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Reviewer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(0, 10).map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.header}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "Done"
                        ? "default"
                        : item.status === "In Process"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.target}</TableCell>
                <TableCell>{item.limit}</TableCell>
                <TableCell>{item.reviewer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
