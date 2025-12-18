# **App Name**: DocuSite Compliance Hub

## Core Features:

- Secure User Authentication with Roles: Firebase Authentication with role-based access control (Admin, Org Admin, Site Manager).
- Organization, Site, and Document Data Model: Establish a structured data model to represent Organizations, Sites, and Documents including category, upload date, expiry date, uploaded by.
- Document Upload and Metadata: Enable site managers to upload compliance documents to storage (Firebase Storage), attaching relevant metadata like category and expiry date. Apply security best practices to manage secure uploads from a browser.
- Site Document Library: Implement a document library for each site, allowing users to filter by category and download documents.
- Dashboard with Compliance Overview: Create a dashboard providing an overview of expiring documents (within 30/60/90 days) and missing required documents per site.
- Audit Trail: Maintain an audit trail tracking who uploaded which document and when, for compliance and accountability.
- Compliance status analyzer: The Compliance status analyzer LLM tool uses uploaded documents and specified site compliance standards to identify potential non-compliant cases, supporting a first pass assessment to flag documentation gaps.

## Style Guidelines:

- Primary color: Deep sky blue (#00BFFF), offering a sense of trust, compliance, and efficiency. This is a strong, yet calming color.
- Background color: Light gray (#F0F8FF), providing a clean and neutral backdrop that emphasizes content, while harmonizing well with blue hues.
- Accent color: Royal blue (#4169E1), is used selectively for key interactive elements and highlights, such as buttons and calls to action. This creates emphasis, is distinct from the primary hue, and remains on-brand.
- Font pairing: 'Inter' for body text, a grotesque-style sans-serif providing a clean and readable interface, matched with 'Space Grotesk' for headlines, offering a computerized feel. 
- Code font: 'Source Code Pro' for displaying code snippets.
- Use clear and intuitive icons from a standard library (e.g., Material Design Icons) to represent document categories, status, and actions.
- Maintain a clean and well-structured layout with clear visual hierarchy. Use a grid system for consistent spacing and alignment.