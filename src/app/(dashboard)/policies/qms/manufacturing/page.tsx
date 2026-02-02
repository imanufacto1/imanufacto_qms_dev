"use client";

import React from 'react';
import { FileText, Shield, FileCheck, AlertCircle, BarChart, Users, Settings, Truck, ClipboardList, PenTool, BookOpen, AlertTriangle } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  // --- POLICIES ---
  {
    id: "qms-pol-01",
    category: "Policy",
    title: "Quality Policy",
    description: "Overall intentions and direction of the organization related to quality.",
    content: `1. Purpose
To define the organization's commitment to quality and customer satisfaction.

2. Scope
Applies to all processes and employees within the manufacturing facility.

3. Policy Statement
We are committed to:
- Delivering defect-free products on time, every time.
- Meeting or exceeding customer requirements and applicable statutory/regulatory requirements.
- Continually improving the effectiveness of our Quality Management System (QMS).
- Fostering a culture of quality where every employee is responsible for the quality of their work.

4. Quality Objectives Framework
- Customer Satisfaction Index > 95%
- On-Time Delivery > 98%
- Internal Defect Rate < 500 PPM
- Supplier Performance Score > 90%

Signed: CEO / Plant Manager`,
    icon: Shield
  },

  // --- PLANS ---
  {
    id: "qms-plan-01",
    category: "Plan",
    title: "Annual Quality Plan (2025)",
    description: "Strategic quality objectives and resource allocation for the fiscal year.",
    content: `1. Introduction
This plan outlines the quality initiatives for 2025 to align with the strategic direction.

2. Key Initiatives
- Implementation of automated optical inspection (AOI) in Assembly Line 2 (Q2).
- Transition to paperless QMS for shop floor data collection (Q3).
- Supplier development program for top 5 critical raw material suppliers (Ongoing).

3. Resources
- Budget: $150,000 for new inspection equipment.
- Training: 500 man-hours allocated for Six Sigma Green Belt training.

4. Risk Management
- Supply chain disruption: Dual sourcing strategy initiated.
- Skill gap: Cross-training program implemented.`,
    icon: BarChart
  },
  {
    id: "qms-plan-02",
    category: "Plan",
    title: "Internal Audit Programme",
    description: "Schedule of internal audits to verify QMS conformity.",
    content: `1. Audit Frequency
- All processes audited at least once annually.
- Critical processes (Production, QC) audited twice annually.

2. Schedule
- Jan: Leadership & Management Review (Clause 5, 9.3)
- Mar: HR & Competence (Clause 7.1.2, 7.2)
- May: Design & Development (Clause 8.3)
- Jul: Production & Service Provision (Clause 8.5)
- Sep: Purchasing & Supplier Control (Clause 8.4)
- Nov: Improvement & Corrective Actions (Clause 10)

3. Auditor Selection
Auditors shall not audit their own work. External auditors may be used for impartiality.`,
    icon: ClipboardList
  },

  // --- SOPs ---
  {
    id: "qms-sop-01",
    category: "SOP",
    title: "Control of Documented Information",
    description: "Procedure for approving, updating, and retaining documents.",
    content: `1. Purpose
To ensure documents are controlled, available, and suitable for use.

2. Procedure
2.1 Creation/Revision: Process owner drafts document.
2.2 Review: Quality Manager reviews for adequacy.
2.3 Approval: Department Head approves.
2.4 Distribution: Released via DMS; obsolete versions archived automatically.
2.5 Retention: Records retained for min. 3 years (or as per legal req).

3. Document Numbering
Format: DEPT-DOC-001 (e.g., PROD-SOP-005).`,
    icon: FileText
  },
  {
    id: "qms-sop-02",
    category: "SOP",
    title: "Control of Non-Conforming Outputs",
    description: "Handling products that do not meet requirements.",
    content: `1. Identification
- Operator/Inspector identifies defect.
- Item tagged with RED "Non-Conforming" tag.

2. Segregation
- Move item immediately to locked "Quarantine Area".
- Record in Non-Conformance Report (NCR) log.

3. Disposition Options
- Rework: Fix to meet original specs (requires re-inspection).
- Repair: Fix to be functional but not original specs (requires customer concession).
- Scrap: Dispose of material.
- Return to Vendor (RTV).

4. Responsibility
Quality Manager has final authority on disposition.`,
    icon: AlertCircle
  },
  {
    id: "qms-sop-03",
    category: "SOP",
    title: "Management Review",
    description: "Top management review of the QMS.",
    content: `1. Frequency
Minimum once every 12 months.

2. Inputs
- Audit results.
- Customer feedback.
- Process performance & product conformity.
- Status of corrective actions.
- Changes in internal/external issues.
- Risk assessment updates.

3. Outputs
- Decisions on resource needs.
- Opportunities for improvement.
- Changes to QMS scope/policy.

4. Records
Minutes of meeting must be retained.`,
    icon: Users
  },
  {
    id: "qms-sop-04",
    category: "SOP",
    title: "Supplier Evaluation & Selection",
    description: "Criteria for approving and monitoring suppliers.",
    content: `1. New Supplier Selection
- Initial Questionnaire.
- Sample Approval (FAI).
- On-site Audit (for critical suppliers).

2. Annual Evaluation Criteria
- Quality (40%): Reject rate.
- Delivery (30%): On-time performance.
- Price (20%): Competitiveness.
- Service (10%): Responsiveness.

3. Action
- Score < 70%: Corrective Action Request (SCAR) issued.
- Score < 50%: Supplier disqualified.`,
    icon: Truck
  },

  // --- WORK INSTRUCTIONS ---
  {
    id: "qms-wi-01",
    category: "Work Instruction",
    title: "Incoming Material Inspection",
    description: "Steps for verifying purchased raw materials.",
    content: `1. Preparation
- Get Purchase Order (PO) and Delivery Note.
- Prepare tools: Caliper, Tape Measure, Hardness Tester.

2. Sampling
- Use ANSI/ASQ Z1.4 General Inspection Level II.
- AQL 1.0 for Critical, 2.5 for Major, 4.0 for Minor defects.

3. Checks
- Verify Part Number and Quantity.
- Check packaging integrity.
- Measure key dimensions per drawing (record 5 samples).
- Visual check for rust, scratches, dents.

4. Decision
- Pass: Green sticker, move to store.
- Fail: Red tag, move to quarantine, raise NCR.`,
    icon: FileCheck
  },
  {
    id: "qms-wi-02",
    category: "Work Instruction",
    title: "CNC Machine Operation (Milling)",
    description: "Safe operation steps for CNC Milling Center.",
    content: `1. Pre-Start
- Check coolant level and oil level.
- Ensure work area is clear.
- Load correct program (verify revision).

2. Setup
- Clean fixture and table.
- Clamp workpiece securely (torque to 40Nm).
- Probe part zero (G54).

3. Operation
- Close door.
- Press Cycle Start.
- Monitor load meter and sound.
- DO NOT open door while spindle is turning.

4. Post-Process
- Blow off chips with air gun.
- Deburr part.
- Measure critical dimensions (1st piece inspection).`,
    icon: Settings
  },
  {
    id: "qms-wi-03",
    category: "Work Instruction",
    title: "Final Inspection & Packaging",
    description: "Final verification before shipping.",
    content: `1. Final Check
- Verify all previous operations are signed off in Traveler Card.
- Visual inspection under 1000 lux lighting.
- Function test (if applicable).

2. Packaging
- Place unit in anti-static bag (if electronic).
- Place in cardboard box with foam inserts.
- Add accessories manual and desiccant.

3. Labeling
- Affix serial number label to product and box.
- Affix shipping label.`,
    icon: PenTool
  },

  // --- SCENARIOS ---
  {
    id: "qms-scn-01",
    category: "Scenario",
    title: "Scenario: Customer Complaint (Field Failure)",
    description: "Walkthrough of handling a product failure reported by a customer.",
    content: `Situation:
Customer reports "Model X" unit failed after 2 weeks. Motor overheating.

Step 1: Receive Complaint
- CS logs ticket #12345.
- Requests customer to return unit (RMA issued).

Step 2: Initial Investigation
- Unit received. QC verifies serial number.
- Visual check: No external damage.
- Functional test: Confirmed overheating > 80°C.

Step 3: Root Cause Analysis (Fishbone)
- Man: Operator trained? Yes.
- Machine: Torque tool calibrated? Yes.
- Material: Motor batch #554 from Supplier A.
- Method: Assembly WI followed? Yes.
- Findings: Motor bearing lacked grease. Supplier A defect.

Step 4: Corrective Action
- Immediate: Replace unit for customer.
- Short term: Inspect all Motor Batch #554 in stock.
- Long term: Issue SCAR to Supplier A. Update Incoming Inspection WI to include "noise check" for motors.

Step 5: Closure
- Customer informed of findings.
- Complaint closed in 7 days.`,
    icon: BookOpen
  },
  {
    id: "qms-scn-02",
    category: "Scenario",
    title: "Scenario: Audit Non-Conformance (Calibration)",
    description: "Handling a finding during an external ISO 9001 audit.",
    content: `Situation:
External Auditor finds a Vernier Caliper (ID: CAL-005) on the shop floor with an expired calibration sticker (expired 2 weeks ago).

Step 1: Immediate Correction
- Caliper removed from use immediately.
- Tagged as "Out of Calibration".

Step 2: Impact Assessment
- Auditor asks: "What products were measured with this in the last 2 weeks?"
- QA checks production logs. Job #998 and #999 used CAL-005.
- 5 samples from stock of Job #998 retrieved and re-measured with valid Caliper (CAL-002).
- Result: All samples within spec. No product recall needed.

Step 3: Root Cause (5 Whys)
- Why expired? Technician forgot to send it out.
- Why forgot? Not on the monthly recall list.
- Why not on list? Excel sheet formula error skipped row 45.

Step 4: Corrective Action
- Send CAL-005 for calibration.
- Fix Excel formula.
- Transition calibration tracking to ERP system (automated alerts).

Step 5: Verification
- Auditor accepts plan. Non-conformance closed after evidence of ERP migration shown.`,
    icon: AlertTriangle
  }
];

export default function QMSManufacturingPage() {
  return (
    <PolicyViewer 
      title="Manufacturing QMS (ISO 9001:2015)"
      description="Comprehensive Quality Management System documentation for manufacturing operations."
      documents={documents}
    />
  );
}
