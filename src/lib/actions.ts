"use server";

import { analyzeComplianceStatus } from "@/ai/flows/compliance-status-analyzer";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const UploadDocumentSchema = z.object({
  siteId: z.string(),
  category: z.string(),
  expiryDate: z.string().optional(),
});

export async function uploadDocument(formData: FormData) {
  // Mock action for MVP
  const validatedFields = UploadDocumentSchema.safeParse({
    siteId: formData.get("siteId"),
    category: formData.get("category"),
    expiryDate: formData.get("expiryDate"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields.",
    };
  }
  
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { error: "File is required." };
  }
  
  console.log("Uploading document:", {
    ...validatedFields.data,
    fileName: file.name,
    fileSize: file.size
  });

  // In a real app, you would:
  // 1. Generate a signed URL to upload to Firebase Storage.
  // 2. Return the signed URL to the client.
  // 3. Client uploads the file.
  // 4. Client calls another server action to confirm upload and create a DB record.
  
  // For now, we'll just pretend it worked.
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Revalidate the path to show the new (mock) document.
  // In a real app, the new document would be added to the database,
  // and this revalidation would fetch and display it.
  revalidatePath(`/sites/${validatedFields.data.siteId}`);

  return { success: "Document uploaded successfully!" };
}

const AnalyzeComplianceSchema = z.object({
  documentText: z.string().min(1, "Document text cannot be empty."),
  complianceStandards: z
    .string()
    .min(1, "Compliance standards cannot be empty."),
});

export async function analyzeComplianceAction(prevState: any, formData: FormData) {
  const validatedFields = AnalyzeComplianceSchema.safeParse({
    documentText: formData.get("documentText"),
    complianceStandards: formData.get("complianceStandards"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid fields.",
      errors: validatedFields.error.flatten().fieldErrors,
      analysis: null,
    };
  }

  try {
    const result = await analyzeComplianceStatus(validatedFields.data);
    return {
      message: "Analysis complete.",
      errors: null,
      analysis: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred during analysis.",
      errors: null,
      analysis: null,
    };
  }
}
