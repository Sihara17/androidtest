import { StatsCards } from "@/components/dashboard/stats-cards";
import { ExpiringDocsCard } from "@/components/dashboard/expiring-docs-card";
import { MissingDocsCard } from "@/components/dashboard/missing-docs-card";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-headline font-bold">Dashboard</h1>
      <StatsCards />
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <ExpiringDocsCard />
        <MissingDocsCard />
      </div>
    </div>
  );
}
