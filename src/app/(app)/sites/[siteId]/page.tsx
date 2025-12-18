import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DocumentTable } from "@/components/document-table";
import { UploadDocumentDialog } from "@/components/upload-document-dialog";
import { getSiteById, getDocumentsForSite } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SiteDetailsPage({
  params,
}: {
  params: { siteId: string };
}) {
  const site = getSiteById(params.siteId);
  if (!site) {
    notFound();
  }

  const documents = getDocumentsForSite(params.siteId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Link href="/sites">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-headline font-semibold tracking-tight sm:grow-0">
            {site.name}
          </h1>
          <p className="text-sm text-muted-foreground">{site.address}</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter by Category
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Service Report
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Safety Certificate
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Compliance Audit
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UploadDocumentDialog siteId={site.id} />
        </div>
      </div>
      <DocumentTable documents={documents} />
    </div>
  );
}
