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
import { getMissingDocuments } from "@/lib/data";

export function MissingDocsCard() {
  const missingDocs = getMissingDocuments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Missing Documents</CardTitle>
        <CardDescription>
          Required documents that have not been uploaded or are expired.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Site</TableHead>
              <TableHead>Required Document</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missingDocs.length > 0 ? (
              missingDocs.map((doc, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{doc.siteName}</TableCell>
                  <TableCell>{doc.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  No missing documents. All sites are compliant.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
