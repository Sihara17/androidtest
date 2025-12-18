import { User, Organization, Site, Document, RequiredDocument, DocumentStatus } from "./types";
import { subDays, addDays, format } from "date-fns";

export const mockUser: User = {
  id: "user-1",
  name: "Admin User",
  email: "admin@docusite.com",
  avatarUrl: "https://picsum.photos/seed/user1/200/200",
  role: "Admin",
};

export const mockOrganizations: Organization[] = [
  { id: "org-1", name: "Innovate Corp" },
  { id: "org-2", name: "Future Solutions" },
];

export const mockSites: Site[] = [
  {
    id: "site-1",
    name: "Innovate HQ",
    organizationId: "org-1",
    address: "123 Innovation Drive, Tech City",
  },
  {
    id: "site-2",
    name: "Innovate West Wing",
    organizationId: "org-1",
    address: "456 Advancement Ave, Tech City",
  },
  {
    id: "site-3",
    name: "Future Solutions Hub",
    organizationId: "org-2",
    address: "789 Progress Plaza, Metroburg",
  },
];

const today = new Date();

export const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Q1 2024 Fire Safety Inspection.pdf",
    siteId: "site-1",
    category: "Safety Certificate",
    uploadDate: format(subDays(today, 50), "yyyy-MM-dd"),
    expiryDate: format(addDays(today, 25), "yyyy-MM-dd"),
    uploadedBy: "Alice Johnson",
    status: "Expiring Soon",
    url: "#",
  },
  {
    id: "doc-2",
    name: "Annual Lift Maintenance Report.docx",
    siteId: "site-1",
    category: "Service Report",
    uploadDate: format(subDays(today, 100), "yyyy-MM-dd"),
    expiryDate: format(addDays(today, 265), "yyyy-MM-dd"),
    uploadedBy: "Alice Johnson",
    status: "Compliant",
    url: "#",
  },
  {
    id: "doc-3",
    name: "General Liability Insurance 2023.pdf",
    siteId: "site-1",
    category: "Insurance",
    uploadDate: format(subDays(today, 400), "yyyy-MM-dd"),
    expiryDate: format(subDays(today, 35), "yyyy-MM-dd"),
    uploadedBy: "System Admin",
    status: "Expired",
    url: "#",
  },
  {
    id: "doc-4",
    name: "HVAC Service Agreement.pdf",
    siteId: "site-2",
    category: "Service Report",
    uploadDate: format(subDays(today, 20), "yyyy-MM-dd"),
    expiryDate: format(addDays(today, 88), "yyyy-MM-dd"),
    uploadedBy: "Bob Williams",
    status: "Expiring Soon",
    url: "#",
  },
  {
    id: "doc-5",
    name: "Electrical Safety Certificate.pdf",
    siteId: "site-2",
    category: "Safety Certificate",
    uploadDate: format(subDays(today, 180), "yyyy-MM-dd"),
    expiryDate: format(addDays(today, 185), "yyyy-MM-dd"),
    uploadedBy: "Bob Williams",
    status: "Compliant",
    url: "#",
  },
  {
    id: "doc-6",
    name: "FS Hub Fire Drill Log.pdf",
    siteId: "site-3",
    category: "Compliance Audit",
    uploadDate: format(subDays(today, 15), "yyyy-MM-dd"),
    expiryDate: format(addDays(today, 350), "yyyy-MM-dd"),
    uploadedBy: "Charlie Brown",
    status: "Compliant",
    url: "#",
  },
  {
    id: "doc-7",
    name: "Water Quality Report Q2.pdf",
    siteId: "site-3",
    category: "Service Report",
    uploadDate: format(subDays(today, 5), "yyyy-MM-dd"),
    expiryDate: format(addDays(today, 58), "yyyy-MM-dd"),
    uploadedBy: "Charlie Brown",
    status: "Expiring Soon",
    url: "#",
  },
];

export const mockRequiredDocs: RequiredDocument[] = [
    { siteId: 'site-1', category: 'Compliance Audit', description: 'Annual accessibility audit' },
    { siteId: 'site-2', category: 'Insurance', description: 'Property and casualty insurance' },
    { siteId: 'site-3', category: 'Safety Certificate', description: 'Asbestos clearance certificate' },
];


export function getDocumentsForSite(siteId: string): Document[] {
    return mockDocuments.filter(doc => doc.siteId === siteId);
}

export function getSiteById(siteId: string): Site | undefined {
    return mockSites.find(site => site.id === siteId);
}

export function getExpiringDocuments(days: 30 | 60 | 90): Document[] {
    const now = new Date();
    const futureDate = addDays(now, days);
    return mockDocuments.filter(doc => {
        const expiry = new Date(doc.expiryDate);
        return expiry > now && expiry <= futureDate;
    });
}

export function getMissingDocuments(): (RequiredDocument & { siteName: string })[] {
    return mockRequiredDocs
        .filter(reqDoc => {
            const hasDoc = mockDocuments.some(
                doc => doc.siteId === reqDoc.siteId && doc.category === reqDoc.category && doc.status !== 'Expired'
            );
            return !hasDoc;
        })
        .map(reqDoc => {
            const site = getSiteById(reqDoc.siteId);
            return {
                ...reqDoc,
                siteName: site?.name || "Unknown Site"
            }
        });
}
