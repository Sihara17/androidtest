"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { analyzeComplianceAction } from "@/lib/actions";
import { Document } from "@/lib/types";
import { Loader2, Sparkles, CheckCircle, XCircle } from "lucide-react";

const initialState = {
  message: "",
  errors: null,
  analysis: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Analyze
    </Button>
  );
}

export function ComplianceAnalyzerDialog({
  doc,
  isOpen,
  setIsOpen,
}: {
  doc: Document;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [state, formAction] = useFormState(analyzeComplianceAction, initialState);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Compliance Analyzer
          </DialogTitle>
          <DialogDescription>
            Use AI to analyze '{doc.name}' for compliance gaps.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="documentText">Document Text (Paste here)</Label>
              <Textarea
                id="documentText"
                name="documentText"
                placeholder="Paste the full text of the document here for analysis."
                className="min-h-[150px] font-code"
              />
              {state.errors?.documentText && (
                <p className="text-sm text-destructive">{state.errors.documentText[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="complianceStandards">Compliance Standards</Label>
              <Textarea
                id="complianceStandards"
                name="complianceStandards"
                placeholder="Specify the compliance standards to check against (e.g., 'ISO 27001 Section A.12', 'Fire code section 4.b')."
                className="min-h-[100px] font-code"
              />
               {state.errors?.complianceStandards && (
                <p className="text-sm text-destructive">{state.errors.complianceStandards[0]}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <SubmitButton />
          </DialogFooter>
        </form>
        {state.analysis && (
          <div className="mt-4 rounded-lg border bg-muted/50 p-4">
            <h4 className="font-semibold mb-2">Analysis Result</h4>
            <div className="space-y-4">
                <div>
                    <Badge variant={state.analysis.isCompliant ? "default" : "destructive"} className={cn(state.analysis.isCompliant ? "bg-green-600" : "")}>
                        {state.analysis.isCompliant ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
                        {state.analysis.isCompliant ? "Compliant" : "Non-Compliant"}
                    </Badge>
                </div>
              <div>
                <p className="font-medium text-sm">Explanation</p>
                <p className="text-sm text-muted-foreground">{state.analysis.explanation}</p>
              </div>
              {state.analysis.missingInformation && state.analysis.missingInformation.length > 0 && (
                <div>
                  <p className="font-medium text-sm">Missing Information</p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {state.analysis.missingInformation.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
