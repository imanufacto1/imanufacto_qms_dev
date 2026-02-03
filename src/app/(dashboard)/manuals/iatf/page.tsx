"use client";

import React from 'react';
import { Book, Car, Settings, FileText, AlertTriangle } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  {
    id: "iatf-man-01",
    category: "Manual",
    title: "Automotive Quality Manual (IATF 16949)",
    description: "Supplemental manual to ISO 9001 for automotive production.",
    content: `1. Scope
Includes all automotive products and service parts.

2. Context
- Customer Specific Requirements (CSRs) are mandatory.
- Product Safety requirements.

3. Leadership
- Responsibility for product conformity.
- Corporate responsibility policy (Anti-bribery, Whistleblowing).

4. Planning
- Risk analysis includes recall, field returns, warranty.
- Contingency plans (utility interruption, labor shortage).

5. Support
- Calibration/Verification of measurement systems (MSA).
- Laboratory requirements (ISO 17025).

6. Operation
- APQP (Advanced Product Quality Planning).
- PPAP (Production Part Approval Process).
- FMEA (Failure Mode and Effects Analysis).
- Control Plan.
- Total Productive Maintenance (TPM).

7. Performance Evaluation
- Manufacturing process monitoring (Cp, Cpk).
- Internal Audit (System, Process, Product).

8. Improvement
- Problem solving (8D, 5 Why, Fishbone).
- Error proofing (Poka-yoke).`,
    icon: Book
  },
  {
    id: "sop-iatf-01",
    category: "SOP",
    title: "APQP Procedure",
    description: "Advanced Product Quality Planning process.",
    content: `Phase 1: Plan and Define Program.
Phase 2: Product Design and Development.
Phase 3: Process Design and Development.
Phase 4: Product and Process Validation.
Phase 5: Feedback, Assessment, and Corrective Action.

Key Outputs:
- Design FMEA
- Process Flow Chart
- Process FMEA
- Control Plan
- Work Instructions`,
    icon: Car
  },
  {
    id: "sop-iatf-02",
    category: "SOP",
    title: "PPAP Submission",
    description: "Production Part Approval Process requirements.",
    content: `Levels of Submission (1-5). Default is Level 3.

Required Elements (18):
1. Design Records
2. Engineering Change Documents
3. Customer Engineering Approval
4. Design FMEA
5. Process Flow Diagrams
6. Process FMEA
7. Control Plan
8. MSA Studies
9. Dimensional Results
10. Material/Performance Test Results
11. Initial Process Studies (Cpk)
12. Qualified Laboratory Documentation
13. Appearance Approval Report (AAR)
14. Sample Production Parts
15. Master Sample
16. Checking Aids
17. Customer Specific Requirements
18. PSW (Part Submission Warrant)`,
    icon: FileText
  },
  {
    id: "wi-iatf-01",
    category: "Work Instruction",
    title: "Control Plan Development",
    description: "Guide to creating a Control Plan.",
    content: `Columns:
1. Part/Process Number
2. Process Name/Operation Description
3. Machine/Device
4. Characteristics (Product/Process) - Critical/Significant
5. Specifications/Tolerance
6. Evaluation Measurement Technique
7. Sample Size & Frequency
8. Control Method (X-bar chart, Go/No-Go)
9. Reaction Plan (What to do if out of control)`,
    icon: Settings
  },
  {
    id: "scen-iatf-01",
    category: "Scenario",
    title: "Warranty Claim Analysis",
    description: "Handling a field failure warranty claim.",
    content: `Scenario:
OEM customer returns 50 parts for "Noise" warranty claim.

Process (NTF - No Trouble Found vs Confirmed):
1. Visual Inspection.
2. Functional Test on standard tester.
3. Functional Test on vehicle (if possible).
4. Teardown analysis.

Findings:
30 parts: No defect found (NTF).
20 parts: Confirmed noise due to loose internal clip.

Root Cause:
Clip installation tool was not calibrated, applying insufficient torque.

Action:
1. Calibrate tool.
2. Implement torque monitoring (Poka-yoke) connected to PLC.
3. Update PFMEA and Control Plan.`,
    icon: AlertTriangle
  }
];

export default function ManualsIATFPage() {
  return (
    <PolicyViewer 
      title="IATF Manual (Automotive)"
      description="IATF 16949 Quality Management System Manual."
      documents={documents}
      enableEditing={false}
    />
  );
}
