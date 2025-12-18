"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  FileClock,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getExpiringDocuments, getSiteById } from "@/lib/data";
import { Document } from "@/lib/types";
import { format, parseISO } from "date-fns";

type Period = "30" | "60" | "90";

export function ExpiringDocsCard() {
  const [period, setPeriod] = React.useState<Period>("30");

  const data: Document[] = React.useMemo(() => {
    return getExpiringDocuments(parseInt(period, 10) as 30 | 60 | 90);
  }, [period]);

  const onPeriodChange = (value: string) => {
    setPeriod(value as Period);
  };

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="font-headline">Expiring Documents</CardTitle>
          <CardDescription>
            Documents that will expire soon.
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Tabs onValueChange={onPeriodChange} value={period} >
            <TabsList>
              <TabsTrigger value="30">30 days</TabsTrigger>
              <TabsTrigger value="60">60 days</TabsTrigger>
              <TabsTrigger value="90">90 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Site</TableHead>
              <TableHead className="hidden sm:table-cell">Document</TableHead>
              <TableHead className="text-right">Expires On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? data.map((doc) => {
              const site = getSiteById(doc.siteId);
              return (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="font-medium">{site?.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {doc.category}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {doc.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {format(parseISO(doc.expiryDate), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              )
            }) : (
                <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                        No documents expiring in this period.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
