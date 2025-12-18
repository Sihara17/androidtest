export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: "Admin" | "Org Admin" | "Site Manager";
};

export type Organization = {
  id: string;
  name: string;
};

export type Site = {
  id: string;
  name: string;
  organizationId: string;
  address: string;
};

export type DocumentCategory =
  | "Service Report"
  | "Safety Certificate"
  | "Compliance Audit"
  | "Insurance"
  | "Other";

export type DocumentStatus = "Compliant" | "Expiring Soon" | "Expired" | "Missing";

export type Document = {
  id: string;
  name: string;
  siteId: string;
  category: DocumentCategory;
  uploadDate: string;
  expiryDate: string;
  uploadedBy: string;
  status: DocumentStatus;
  url: string;
};

export type RequiredDocument = {
    siteId: string;
    category: DocumentCategory;
    description: string;
}
