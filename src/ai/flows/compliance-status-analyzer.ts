'use server';

/**
 * @fileOverview A compliance status analyzer AI agent.
 *
 * - analyzeComplianceStatus - A function that handles the compliance status analysis process.
 * - AnalyzeComplianceStatusInput - The input type for the analyzeComplianceStatus function.
 * - AnalyzeComplianceStatusOutput - The return type for the analyzeComplianceStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeComplianceStatusInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be analyzed.'),
  complianceStandards: z.string().describe('The compliance standards for the site.'),
});
export type AnalyzeComplianceStatusInput = z.infer<typeof AnalyzeComplianceStatusInputSchema>;

const AnalyzeComplianceStatusOutputSchema = z.object({
  isCompliant: z.boolean().describe('Whether the document is compliant with the standards.'),
  explanation: z
    .string()
    .describe('An explanation of why the document is compliant or non-compliant.'),
  missingInformation: z
    .array(z.string())
    .describe('A list of missing information in the document, if any.'),
});
export type AnalyzeComplianceStatusOutput = z.infer<typeof AnalyzeComplianceStatusOutputSchema>;

export async function analyzeComplianceStatus(
  input: AnalyzeComplianceStatusInput
): Promise<AnalyzeComplianceStatusOutput> {
  return analyzeComplianceStatusFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeComplianceStatusPrompt',
  input: {schema: AnalyzeComplianceStatusInputSchema},
  output: {schema: AnalyzeComplianceStatusOutputSchema},
  prompt: `You are a compliance expert. You will analyze a document against specified compliance standards and determine if it is compliant.

Compliance Standards: {{{complianceStandards}}}

Document Text: {{{documentText}}}

You must:
1. Determine if the document is compliant with the standards.
2. Explain why the document is compliant or non-compliant.
3. List any missing information in the document, if any.

Output:
{
  "isCompliant": true or false,
  "explanation": "Explanation of compliance or non-compliance",
  "missingInformation": ["List of missing information"]
}
`,
});

const analyzeComplianceStatusFlow = ai.defineFlow(
  {
    name: 'analyzeComplianceStatusFlow',
    inputSchema: AnalyzeComplianceStatusInputSchema,
    outputSchema: AnalyzeComplianceStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
