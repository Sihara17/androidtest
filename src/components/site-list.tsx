import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockSites, mockOrganizations } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export function SiteList() {
  const sitesByOrg = mockOrganizations.map(org => ({
      ...org,
      sites: mockSites.filter(site => site.organizationId === org.id)
  }));


  return (
    <div className="space-y-8">
        {sitesByOrg.map(org => (
            <Card key={org.id}>
                <CardHeader>
                <CardTitle className="font-headline">{org.name}</CardTitle>
                <CardDescription>
                    All sites under {org.name}.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <div className="divide-y divide-border">
                    {org.sites.map(site => (
                        <Link href={`/sites/${site.id}`} key={site.id} className="block hover:bg-muted/50 -mx-6 px-6">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="font-medium">{site.name}</p>
                                    <p className="text-sm text-muted-foreground">{site.address}</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            </div>
                        </Link>
                    ))}
                </div>
                </CardContent>
            </Card>
        ))}
    </div>
  );
}
