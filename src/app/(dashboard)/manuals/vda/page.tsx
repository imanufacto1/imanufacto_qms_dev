"use client";

import React from 'react';
import { Book, CheckSquare, Search, AlertTriangle, Award } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  {
    id: "vda-man-01",
    category: "Manual",
    title: "VDA Manual (German Automotive)",
    description: "Overview of VDA standards usage (VDA 6.3, 6.5, etc.).",
    content: `1. Introduction
VDA (Verband der Automobilindustrie) standards are required by German OEMs (VW, BMW, Mercedes).

2. Core Standards
- VDA 6.1: QMS Certification (similar to IATF).
- VDA 6.3: Process Audit (Manufacturing & Service).
- VDA 6.5: Product Audit.
- MLA: Maturity Level Assurance (Reifegradabsicherung).
- RGA: Robustness validation.

3. Audit Approach
VDA focuses heavily on process stability and capability throughout the lifecycle (Project phase -> Serial production).`,
    icon: Book
  },
  {
    id: "sop-vda-01",
    category: "SOP",
    title: "VDA 6.3 Process Audit",
    description: "Procedure for conducting process audits according to VDA 6.3.",
    content: `1. Audit Preparation
- Define audit scope.
- Select auditors (Certified VDA 6.3 auditors).

2. Questionnaire Elements (P2-P7)
P2: Project Management
P3: Planning Product/Process Development
P4: Realization Product/Process Development
P5: Supplier Management
P6: Process Analysis / Production
P7: Customer Care / Satisfaction

3. Evaluation
Each question scored: 0, 4, 6, 8, 10.
Overall score determines grade:
A: >= 90% (Quality Capable)
B: 80-89% (Conditionally Capable)
C: < 80% (Not Capable)

4. Reporting and Follow-up
- Audit Report with downgrading rules.
- Action plan for scores < 10.`,
    icon: CheckSquare
  },
  {
    id: "sop-vda-02",
    category: "SOP",
    title: "VDA 6.5 Product Audit",
    description: "Procedure for auditing finished products.",
    content: `1. Planning
- Define audit program (products, frequency).
- Random sampling from warehouse (ready for ship).

2. Execution
- Visual check (packaging, labeling).
- Dimensional check.
- Functional check.
- Material check (if applicable).

3. Scoring (QKZ - Quality Characteristic Number)
- Defect weighting (A=Critical, B=Major, C=Minor).
- Calculation of Quality Index.

4. Action
- Immediate quarantine if Critical defect found.
- Root cause analysis.`,
    icon: Search
  },
  {
    id: "wi-vda-01",
    category: "Work Instruction",
    title: "VDA 6.3 Scoring Guidelines",
    description: "How to assign points (10-8-6-4-0).",
    content: `10 Points: Full compliance. No risks.
8 Points: Slight non-compliance. No risk to product quality. Documentation minor gap.
6 Points: Partial compliance. Risk exists but contained.
4 Points: Major non-compliance. Direct risk to quality/process.
0 Points: No compliance. Process not implemented.

Downgrading Rules:
- If any "*-Question" (Critical) is < 8, max score is limited to B (or C).
- If P6 (Production) is < 80%, overall result cannot be A.`,
    icon: Award
  },
  {
    id: "scen-vda-01",
    category: "Scenario",
    title: "Handling a 'C' Rating Audit",
    description: "Scenario where a supplier gets a 'C' rating.",
    content: `Scenario:
OEM Auditor conducts VDA 6.3 audit and finds:
- Preventive maintenance not performed as per plan.
- Non-conforming parts found in the "OK" bin.
- No trace of root cause analysis for last month's complaint.

Result:
Score: 72% (Grade C - Not Capable).
Immediate Consequence: New Business Hold (NBH).

Recovery Plan:
1. Executive Management meeting.
2. Establish Task Force.
3. Immediate containment (100% inspection).
4. Systemic corrective actions.
5. Request Re-audit after 3 months.`,
    icon: AlertTriangle
  }
];

export default function ManualsVDAPage() {
  return (
    <PolicyViewer 
      title="VDA Manual (German Automotive)"
      description="VDA Standards Manual (6.3 Process Audit, 6.5 Product Audit)."
      documents={documents}
      enableEditing={false}
    />
  );
}
