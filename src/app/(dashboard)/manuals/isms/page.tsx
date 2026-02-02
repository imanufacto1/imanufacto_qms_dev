"use client";

import React from 'react';
import { Book, Lock, Shield, Eye, Server, AlertTriangle } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  {
    id: "isms-man-01",
    category: "Manual",
    title: "Information Security Management Manual (ISO 27001)",
    description: "Manual defining the ISMS scope, policies, and controls.",
    content: `1. Scope
Applies to all information assets, systems, and personnel.

2. Context
- Interested parties: Clients, Partners, Employees.
- Interfaces: Cloud providers, Remote access.

3. Leadership
Information Security Policy: "Protecting Confidentiality, Integrity, and Availability."

4. Planning
- Risk Assessment (Asset-based or Scenario-based).
- Statement of Applicability (SoA) - selecting controls from Annex A.

5. Support
- Awareness training (Phishing, Social Engineering).
- Resource management.

6. Operation
- Operational planning and control.
- Risk treatment implementation.

7. Performance Evaluation
- Monitoring and measurement.
- Internal Audit.
- Management Review.

8. Improvement
- Nonconformity and corrective action.`,
    icon: Book
  },
  {
    id: "sop-isms-01",
    category: "SOP",
    title: "Access Control Policy",
    description: "Rules for granting and managing access to systems.",
    content: `1. Principle of Least Privilege: Users get only the access needed for their job.
2. User Registration: Formal process for adding/removing users (HR notification).
3. Password Management: Strong passwords required (Length, Complexity, Rotation).
4. MFA: Multi-Factor Authentication required for remote/admin access.
5. Review: Quarterly review of access rights.`,
    icon: Lock
  },
  {
    id: "sop-isms-02",
    category: "SOP",
    title: "Incident Management Procedure",
    description: "Handling information security incidents.",
    content: `1. Detection: Monitoring tools, User reports.
2. Classification: Low, Medium, High, Critical.
3. Containment: Isolate affected systems (disconnect network).
4. Eradication: Remove malware, patch vulnerability.
5. Recovery: Restore from clean backup.
6. Post-Incident Review: Lessons learned.`,
    icon: Shield
  },
  {
    id: "wi-isms-01",
    category: "Work Instruction",
    title: "Clear Desk and Clear Screen Policy",
    description: "Guidelines for physical security of information.",
    content: `1. Lock screen (Win+L) whenever leaving the desk.
2. No sensitive documents left on printers or desks.
3. Lock away confidential files in drawers at end of day.
4. Whiteboards must be erased after meetings.
5. Shred sensitive documents - do not use regular trash.`,
    icon: Eye
  },
  {
    id: "wi-isms-02",
    category: "Work Instruction",
    title: "Data Backup Procedure",
    description: "Routine for backing up critical data.",
    content: `1. Frequency: Daily incremental, Weekly full.
2. Location: Off-site or Cloud (encrypted).
3. Encryption: All backups must be encrypted.
4. Testing: Restore test performed monthly to verify integrity.
5. Retention: Keep daily for 30 days, monthly for 1 year.`,
    icon: Server
  },
  {
    id: "scen-isms-01",
    category: "Scenario",
    title: "Phishing Attack Simulation",
    description: "Scenario for testing employee awareness.",
    content: `Scenario:
An email is sent to Finance employees appearing to be from the CEO, asking for an urgent wire transfer.

Indicators:
- External email address (ceo@company-email.com vs ceo@company.com).
- Urgency/Pressure ("Do this now").
- Unusual request.

Correct Action:
1. Do not reply or click links.
2. Report using the "Report Phishing" button in Outlook.
3. Verify with the CEO via a different channel (call/text) if unsure.

Outcome:
If user clicks, they are redirected to a training page.`,
    icon: AlertTriangle
  }
];

export default function ManualsISMSPage() {
  return (
    <PolicyViewer 
      title="ISMS Manual (ISO 27001)"
      description="Information Security Management System Manual."
      documents={documents}
      enableEditing={false}
    />
  );
}
