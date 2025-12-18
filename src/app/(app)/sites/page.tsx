import { SiteList } from "@/components/site-list";

export default function SitesPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-headline font-bold">Sites</h1>
            <SiteList />
        </div>
    );
}
