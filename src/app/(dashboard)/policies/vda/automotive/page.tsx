import React from 'react';
import { Award, ClipboardCheck, CheckCircle, PenTool, Scale, AlertOctagon, BookOpen, Microscope } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  // Policies
  {
    id: "vda-pol-01",
    category: "Policy",
    title: "VDA Compliance Policy",
    description: "Adherence to Verband der Automobilindustrie standards.",
    content: `1. Objective
To ensure alignment with German automotive industry standards (VDA) for customers requiring VDA compliance (e.g., VW, BMW, Daimler).

2. Scope
Applies to all production lines supplying German OEM customers.

3. Commitments
- Annual self-assessment according to VDA 6.3 (Process Audit).
- Regular product audits according to VDA 6.5.
- Implementation of Maturity Level Assurance (MLA) for new projects.
- Adherence to Field Failure Analysis (FFA) standards for warranty returns.`,
    icon: Award
  },
  {
    id: "vda-pol-02",
    category: "Policy",
    title: "Product Integrity Policy (PI)",
    description: "Management of Product Safety and Conformity (PSCR).",
    content: `1. Role Appointment
A Product Safety and Conformity Representative (PSCR) must be appointed for each manufacturing location.

2. Responsibilities
- Assessing product safety risks.
- Ensuring conformity with CoP (Conformity of Production).
- Initiating recalls or market actions if safety is compromised.
- Escalating potential safety issues to top management immediately.`,
    icon: Shield
  },

  // Plans
  {
    id: "vda-pln-01",
    category: "Plan",
    title: "VDA 6.3 Process Audit Plan",
    description: "Annual schedule for auditing the entire product life cycle.",
    content: `1. Audit Cycle: Annual
2. Scope:
- P2: Project Management
- P3: Planning Product/Process Development
- P4: Realization Product/Process Development
- P5: Supplier Management
- P6: Process Analysis / Production
- P7: Customer Support / Satisfaction

3. Auditors: Must be certified VDA 6.3 auditors (valid card required).
4. Target Score: > 90% (Quality Capable - A).`,
    icon: ClipboardCheck
  },
  {
    id: "vda-pln-02",
    category: "Plan",
    title: "VDA 6.5 Product Audit Schedule",
    description: "Periodic reassessment of product quality from customer perspective.",
    content: `1. Frequency
- Safety Critical Parts: Monthly
- Functional Parts: Quarterly
- Appearance Parts: Bi-annually

2. Sample Size
- Based on production volume (e.g., 5 parts per lot).

3. Evaluation
- Dimensional check (CMM)
- Material testing (Tensile, Hardness)
- Functional testing (Torque, Electrical)
- Visual inspection (Surface defects)`,
    icon: Calendar
  },

  // SOPs
  {
    id: "vda-sop-01",
    category: "SOP",
    title: "PPA Process (VDA 2)",
    description: "Production Process and Product Approval (German equivalent of PPAP).",
    content: `1. Trigger Matrix
Determine submission level based on the "Trigger Matrix" (reason for submission vs. modification level).

2. Submission Levels
- Level 0: Documents archived at supplier.
- Level 1: Documents submitted to customer for check.
- Level 2: PPA audit performed at supplier site.

3. Required Evidence
- Technical specs
- Product validation results
- Process capability proofs
- EMPB (Initial Sample Inspection Report)
- IMDS data
- Software test reports (if applicable)`,
    icon: FileText
  },
  {
    id: "vda-sop-02",
    category: "SOP",
    title: "Field Failure Analysis (VDA FFA)",
    description: "Standardized process for analyzing warranty returns.",
    content: `1. Part Reception
- Register part in warranty database within 24h.
- Visual inspection for transport damage.

2. Standard Test
- Perform "Good/Bad" check using standard end-of-line tester.

3. Testing on Load
- Simulate vehicle conditions (temp, vibration).

4. Analysis
- Non-destructive analysis (X-ray, CT scan).
- Destructive analysis (Cross-sectioning).

5. NTF (No Trouble Found) Process
- If no fault found, trigger NTF loop with customer.`,
    icon: Microscope
  },
  {
    id: "vda-sop-03",
    category: "SOP",
    title: "Maturity Level Assurance (MLA)",
    description: "Risk management in the supply chain for new parts (Reifegradabsicherung).",
    content: `RG0: Innovation release
RG1: Project management nomination
RG2: Concept release
RG3: Design freeze
RG4: Process planning completed
RG5: Production tools available
RG6: Product/Process approval
RG7: Project closure / SOP

Requirement: Assess maturity at each gate (Green/Yellow/Red). Red status blocks the next phase.`,
    icon: Steps
  },

  // Work Instructions
  {
    id: "vda-wi-01",
    category: "Work Instruction",
    title: "Conducting a VDA 6.3 Audit",
    description: "Scoring methodology for process elements.",
    content: `1. Evaluation Questions
Each question is scored: 10, 8, 6, 4, 0.
- 10: Fully compliant.
- 8: Minor deviation, no risk.
- 6: Deviation, risk monitored.
- 4: Major deviation, risk not monitored.
- 0: Requirement not met.

2. Downgrading Rules
- If any "*-Question" (Star Question) is scored 4, overall result cannot be A.
- If any "*-Question" is scored 0, overall result is C (Not Capable).

3. Classification
- A: >= 90% (Quality Capable)
- B: 80% - 89% (Conditionally Capable)
- C: < 80% (Not Capable)`,
    icon: PenTool
  },
  {
    id: "vda-wi-02",
    category: "Work Instruction",
    title: "Calculation of QKZ",
    description: "Quality Characteristic Value (Qualitätskennzahl) for product audits.",
    content: `1. Defect Weighting
- A-Fault (Critical): 100 points
- B-Fault (Major): 50 points
- C-Fault (Minor): 10 points

2. Formula
QKZ = 100 - (Sum of defect points / Number of samples)

3. Target
QKZ should be > 98 for production release.`,
    icon: Calculator
  },

  // Scenarios
  {
    id: "vda-scn-01",
    category: "Scenario",
    title: "Scenario: Audit Downgrade",
    description: "Handling a VDA 6.3 audit result of 'C'.",
    content: `Situation:
Customer auditor gives a score of 78% (Level C) due to poor maintenance records (P6.4.1 scored 0).

Response:
1. Immediate:
   - Top Management meeting.
   - Stop shipment (potentially) or 100% inspection (Firewall).

2. Action Plan:
   - Create "Action Plan" (Massnahmenplan) within 2 days.
   - Implement autonomous maintenance.
   - Retrain maintenance staff.

3. Follow-up:
   - Re-audit by customer in 3 months.
   - Goal: Achieve Level B or A.`,
    icon: AlertOctagon
  },
  {
    id: "vda-scn-02",
    category: "Scenario",
    title: "Scenario: Field Failure Claim",
    description: "Processing a warranty claim for a corroded sensor.",
    content: `Situation:
Customer claims warranty for 500 sensors corroded after 2 years in field.

Analysis (VDA FFA):
1. Load Testing: Confirmed signal loss.
2. Analysis: Opened unit, found moisture ingress.
3. Root Cause: Seal material degraded due to chemical exposure (cleaning agent used by end user).
4. Conclusion:
   - Design spec did not specify resistance to this specific chemical.
   - Responsibility: Shared (OEM spec issue).
   - Settlement: Supplier pays 30% goodwill, OEM pays 70%.`,
    icon: Scale
  }
];

// Need to import missing icons or substitute
import { Shield, Calendar, FileText, Calculator } from 'lucide-react';

// Mock Steps icon since it might not be in lucide-react (using ListOrdered instead)
import { ListOrdered as Steps } from 'lucide-react';

export default function VDAAutomotivePage() {
  return (
    <PolicyViewer 
      title="Automotive VDA (German Association of the Automotive Industry)"
      description="Quality Management standards (VDA 6.x) for the German automotive industry."
      documents={documents}
    />
  );
}
