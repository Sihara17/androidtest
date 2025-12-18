import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileCheck, FileClock, FileX, Building } from "lucide-react";
import { mockDocuments, mockSites, getMissingDocuments } from "@/lib/data";

export function StatsCards() {
  const totalSites = mockSites.length;
  const expiringDocsCount = mockDocuments.filter(doc => doc.status === "Expiring Soon").length;
  const missingDocsCount = getMissingDocuments().length;
  const compliantSitesCount = mockSites.filter(site => {
    const siteDocs = mockDocuments.filter(doc => doc.siteId === site.id);
    return siteDocs.every(doc => doc.status === 'Compliant') && getMissingDocuments().filter(md => md.siteId === site.id).length === 0;
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Sites
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSites}</div>
          <p className="text-xs text-muted-foreground">
            Managed across all organizations
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Compliant Sites
          </CardTitle>
          <FileCheck className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{compliantSitesCount}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((compliantSitesCount/totalSites) * 100)}% of all sites
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Documents Expiring
          </CardTitle>
          <FileClock className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{expiringDocsCount}</div>
          <p className="text-xs text-muted-foreground">
            Within the next 90 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Missing Documents
          </CardTitle>
          <FileX className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{missingDocsCount}</div>
          <p className="text-xs text-muted-foreground">
            Required documents not uploaded
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
