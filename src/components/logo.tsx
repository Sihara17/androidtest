import { FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-lg font-bold font-headline text-primary",
        className
      )}
    >
      <FileCheck2 className="h-6 w-6" />
      <span>DocuSite</span>
    </div>
  );
}
