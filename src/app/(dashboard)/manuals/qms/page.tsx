"use client";

import React from 'react';
import { Book, FileText, Shield, CheckCircle, AlertTriangle, List, Search } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  {
    id: "qm-001",
    category: "Manual",
    title: "Global Quality Manual (ISO 9001:2015)",
    description: "The overarching document describing the Quality Management System, its scope, and interaction of processes.",
    content: `1. Scope
The Quality Management System (QMS) applies to all manufacturing and design operations at the facility. It covers all requirements of ISO 9001:2015.

2. Context of the Organization
The organization has determined external and internal issues relevant to its purpose and strategic direction. Interested parties include customers, regulators, employees, and suppliers.

3. Leadership
Top management demonstrates leadership and commitment with respect to the QMS by taking accountability for the effectiveness of the QMS and establishing the Quality Policy.

4. Planning
The organization plans actions to address risks and opportunities and establishes quality objectives at relevant functions.

5. Support
Resources (people, infrastructure, environment) are determined and provided. Competence, awareness, and communication processes are established.

6. Operation
Operational planning and control are implemented. Requirements for products and services are determined and reviewed. Design and development processes are controlled. Externally provided processes (purchasing) are controlled. Production and service provision are controlled.

7. Performance Evaluation
Monitoring, measurement, analysis, and evaluation are conducted. Internal audits are performed at planned intervals. Management reviews are conducted annually.

8. Improvement
The organization determines and selects opportunities for improvement and implements necessary actions to meet customer requirements and enhance customer satisfaction.`,
    icon: Book
  },
  {
    id: "sop-001",
    category: "SOP",
    title: "Control of Documented Information",
    description: "Procedure for creating, approving, updating, and retaining documented information.",
    content: `1. Purpose
To ensure that documented information required by the QMS is controlled.

2. Scope
Applies to all internal and external documents.

3. Responsibilities
- Quality Manager: Approves QMS documents.
- Department Heads: Review and update documents.

4. Procedure
4.1 Creation: Draft documents using standard templates.
4.2 Review: Review for adequacy prior to issue.
4.3 Approval: Approve for release by authorized personnel.
4.4 Distribution: Ensure available at points of use.
4.5 Storage: Store to ensure preservation and legibility.
4.6 Retention: Retain for defined periods (e.g., 3 years for obsolete docs).
4.7 Disposition: Dispose of obsolete records securely.`,
    icon: FileText
  },
  {
    id: "sop-002",
    category: "SOP",
    title: "Internal Audit Procedure",
    description: "Process for planning, conducting, and reporting internal audits.",
    content: `1. Purpose
To determine if the QMS conforms to requirements and is effectively implemented.

2. Frequency
Audits are conducted at least annually for all processes.

3. Procedure
3.1 Audit Program: Quality Manager establishes an annual audit schedule based on risk and importance.
3.2 Auditor Selection: Auditors must be independent of the area being audited.
3.3 Preparation: Review previous audit reports and documentation.
3.4 Execution: Gather objective evidence through interviews, observation, and sampling.
3.5 Reporting: Document nonconformities and opportunities for improvement.
3.6 Follow-up: Verify effectiveness of corrective actions taken.`,
    icon: CheckCircle
  },
  {
    id: "sop-003",
    category: "SOP",
    title: "Nonconformity and Corrective Action",
    description: "Method ensuring nonconformities are addressed and causes eliminated.",
    content: `1. Purpose
To manage nonconformities and prevent recurrence.

2. Procedure
2.1 Identification: Identify and document the nonconformity (product or process).
2.2 Containment: Take immediate action to control and correct the problem.
2.3 Root Cause Analysis: Use 5 Whys or Fishbone diagram to find the root cause.
2.4 Corrective Action: Implement action to eliminate the cause.
2.5 Verification: Review effectiveness of the corrective action after a defined period.
2.6 Update Risks: Update risks and opportunities if necessary.`,
    icon: AlertTriangle
  },
  {
    id: "wi-001",
    category: "Work Instruction",
    title: "Document Numbering System",
    description: "Guidelines for assigning unique identifiers to documents.",
    content: `Format: DEPT-TYPE-###-REV

Definitions:
- DEPT: Department Code (e.g., QA, PROD, HR)
- TYPE: Document Type (M=Manual, P=Procedure, W=Work Instruction, F=Form)
- ###: Sequential Number (001, 002...)
- REV: Revision Letter (A, B, C...)

Example: QA-P-001-A (Quality Assurance Procedure 001, Rev A)`,
    icon: List
  },
  {
    id: "wi-002",
    category: "Work Instruction",
    title: "5 Whys Analysis Guide",
    description: "Instruction on how to perform a 5 Whys root cause analysis.",
    content: `1. Define the problem clearly.
2. Ask "Why did this happen?" and write the answer.
3. If the answer is not the root cause, ask "Why?" again.
4. Repeat until the root cause is identified (usually 5 times).
5. Verify the root cause by working backward (Therefore logic).

Example:
Problem: Machine stopped.
1. Why? Fuse blew.
2. Why? Overload.
3. Why? Bearing locked up.
4. Why? Insufficient lubrication.
5. Why? Oil pump failed. (Root Cause -> Fix Pump)`,
    icon: Search
  },
  {
    id: "scen-001",
    category: "Scenario",
    title: "Audit Finding: Obsolete Document",
    description: "Scenario describing an audit finding related to document control.",
    content: `Scenario:
During an internal audit of the production line, the auditor found an operator using Work Instruction WI-PROD-005 Rev A. The Master List shows the current revision is Rev B.

Nonconformity:
ISO 9001:2015 Clause 7.5.3. Control of documented information. Ensure valid versions are available at points of use.

Root Cause:
Production supervisor printed Rev B but forgot to remove Rev A from the workstation binder.

Corrective Action:
1. Remove Rev A immediately.
2. Train supervisors on the "Obsolete Document Removal" step in SOP-001.
3. Conduct a sweep of all binders to ensure no other obsolete docs exist.`,
    icon: AlertTriangle
  }
];

export default function ManualsQMSPage() {
  return (
    <PolicyViewer 
      title="QMS Manual (ISO 9001)"
      description="Comprehensive Quality Management System Manual and System-Level Procedures."
      documents={documents} 
    />
  );
}
