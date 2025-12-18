"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Download,
  Trash2,
  Sparkles,
  FileCheck,
  FileClock,
  FileX,
  FileQuestion
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Document, DocumentStatus } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { ComplianceAnalyzerDialog } from "./compliance-analyzer-dialog";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: DocumentStatus }) => {
    const statusConfig = {
        "Compliant": { icon: FileCheck, color: "bg-green-500 hover:bg-green-500" },
        "Expiring Soon": { icon: FileClock, color: "bg-orange-500 hover:bg-orange-500" },
        "Expired": { icon: FileX, color: "bg-red-500 hover:bg-red-500" },
        "Missing": { icon: FileQuestion, color: "bg-yellow-500 hover:bg-yellow-500" }
    }
    const {icon: Icon, color} = statusConfig[status];
    return (
        <Badge variant="secondary" className={cn("text-white", color)}>
            <Icon className="h-3 w-3 mr-1" />
            {status}
        </Badge>
    )
}

export function DocumentTable({ documents }: { documents: Document[] }) {
  const [analyzingDoc, setAnalyzingDoc] = React.useState<Document | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            A list of all compliance documents for this site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">
                  Expiry Date
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={doc.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {doc.category}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(parseISO(doc.expiryDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setAnalyzingDoc(doc)}>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Analyze Compliance
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {analyzingDoc && (
        <ComplianceAnalyzerDialog
          doc={analyzingDoc}
          isOpen={!!analyzingDoc}
          setIsOpen={() => setAnalyzingDoc(null)}
        />
      )}
    </>
  );
}
