import React from 'react';
import { Shield, Settings, Wrench, FileCheck, Target, Layers, GitPullRequest, Truck, AlertTriangle } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  // Policies
  {
    id: "iatf-pol-01",
    category: "Policy",
    title: "Automotive Quality Policy",
    description: "Commitment to zero defects, continual improvement, and CSR compliance.",
    content: `1. Purpose
To define the organization's commitment to meeting IATF 16949:2016 standards and Customer Specific Requirements (CSRs).

2. Policy Statement
We are dedicated to:
- Achieving zero defects in all products delivered to automotive customers.
- 100% on-time delivery performance.
- Continual improvement of the Quality Management System.
- Empowering personnel to stop production to correct quality problems.

3. Responsibility
Top management is accountable for the effectiveness of the QMS. All employees are responsible for product quality.`,
    icon: Shield
  },
  {
    id: "iatf-pol-02",
    category: "Policy",
    title: "Product Safety Policy",
    description: "Management of product safety related characteristics.",
    content: `1. Scope
Applies to all products and processes with safety-critical characteristics.

2. Requirements
- Identification of statutory and regulatory product safety requirements.
- Special approval of FMEAs and Control Plans by the Product Safety Representative (PSB).
- Reaction plans for non-conformities must be clearly defined.
- Traceability of safety-related products must be maintained at 100%.`,
    icon: Shield
  },

  // Plans
  {
    id: "iatf-pln-01",
    category: "Plan",
    title: "Control Plan (Dynamic)",
    description: "Methodology for controlling parts and processes at Prototype, Pre-launch, and Production phases.",
    content: `1. Phases
a) Prototype: Description of dimensional measurements, material, and performance tests during prototype build.
b) Pre-launch: Description of dimensional measurements, material, and performance tests after prototype and before full production. Higher frequency checks required.
c) Production: Comprehensive documentation of product/process characteristics, process controls, tests, and measurement systems during mass production.

2. Elements
- Key Control Characteristics (KCCs)
- Special Characteristics (SCs)
- Evaluation Measurement Technique
- Sampling Plan (Size/Frequency)
- Reaction Plan (Suspect material handling)`,
    icon: Layers
  },
  {
    id: "iatf-pln-02",
    category: "Plan",
    title: "APQP Project Plan",
    description: "Advanced Product Quality Planning timeline and milestones.",
    content: `1. Plan and Define Program
- Voice of Customer
- Business Plan / Marketing Strategy
- Product Assurance Plan

2. Product Design and Development
- DFMEA
- Design Verification
- Design Reviews

3. Process Design and Development
- Process Flow Chart
- PFMEA
- Pre-launch Control Plan

4. Product and Process Validation
- Production Trial Run
- MSA
- SPC
- PPAP Submission

5. Feedback, Assessment and Corrective Action
- Reduced Variation
- Customer Satisfaction
- Delivery and Service`,
    icon: GitPullRequest
  },

  // SOPs
  {
    id: "iatf-sop-01",
    category: "SOP",
    title: "PPAP Submission Process",
    description: "Production Part Approval Process standard operating procedure.",
    content: `1. Objective
To determine if all customer engineering design record and specification requirements are properly understood and that the manufacturing process has the potential to produce product consistently meeting these requirements.

2. Submission Levels
- Level 1: PSW only.
- Level 2: PSW with product samples and limited supporting data.
- Level 3: PSW with product samples and complete supporting data (Default).
- Level 4: PSW and other requirements as defined by customer.
- Level 5: PSW with product samples and complete supporting data reviewed at supplier's manufacturing location.

3. Required Documents (Level 3)
- Design Records
- Engineering Change Documents
- Customer Engineering Approval
- DFMEA
- Process Flow Diagram
- PFMEA
- Control Plan
- MSA Studies
- Dimensional Results
- Material/Performance Test Results
- Initial Process Studies (CpK/PpK)
- Qualified Laboratory Documentation
- Appearance Approval Report (AAR)
- Sample Production Parts
- Master Sample
- Checking Aids
- Records of Compliance with Customer-Specific Requirements
- Part Submission Warrant (PSW)`,
    icon: FileCheck
  },
  {
    id: "iatf-sop-02",
    category: "SOP",
    title: "Non-Conforming Product (Automotive)",
    description: "Handling suspect or non-conforming product including quarantine.",
    content: `1. Identification
All non-conforming product must be immediately identified with a red "REJECT" tag.

2. Segregation
Move material to the designated Locked Quarantine Area. Access is restricted to Quality Manager and designees.

3. Disposition
- Rework: Must follow approved rework instructions and be re-inspected.
- Scrap: Mutilate parts to prevent unintended use.
- Use As Is: Requires Customer Deviation/Concession signed by the customer.

4. Notification
Customer must be notified immediately if non-conforming product has been shipped.`,
    icon: AlertTriangle
  },

  // Work Instructions
  {
    id: "iatf-wi-01",
    category: "Work Instruction",
    title: "FMEA Guidelines (AIAG & VDA)",
    description: "Step-by-step instruction for conducting Failure Mode and Effects Analysis.",
    content: `1. Structure Analysis
- Visualize the scope of analysis (Block Diagram / Process Flow).

2. Function Analysis
- Describe what the item/process is supposed to do.

3. Failure Analysis
- Failure Modes: How can it fail?
- Failure Effects: What happens if it fails?
- Failure Causes: Why did it fail?

4. Risk Analysis
- Severity (S): 1-10 rating of effect.
- Occurrence (O): 1-10 rating of cause probability.
- Detection (D): 1-10 rating of detection capability.
- Action Priority (AP): High/Medium/Low based on S-O-D tables.

5. Optimization
- Define actions to reduce risk.
- Re-evaluate S, O, D after actions.`,
    icon: Target
  },
  {
    id: "iatf-wi-02",
    category: "Work Instruction",
    title: "MSA Gage R&R Study",
    description: "Performing Measurement System Analysis.",
    content: `1. Preparation
- Select 10 parts representing process variation.
- Select 3 appraisers.
- Calibrate the gage.

2. Execution (Blind Study)
- Appraiser A measures all 10 parts in random order. Record results.
- Appraiser B measures all 10 parts in random order. Record results.
- Appraiser C measures all 10 parts in random order. Record results.
- Repeat for Trial 2 and Trial 3.

3. Analysis
- Calculate %GRR (Gage R&R).
- < 10%: Acceptable.
- 10% - 30%: May be acceptable based on application.
- > 30%: Unacceptable. Corrective action required.`,
    icon: Settings
  },
  {
    id: "iatf-wi-03",
    category: "Work Instruction",
    title: "8D Problem Solving",
    description: "Methodology for root cause analysis and corrective action.",
    content: `D1: Form the Team (Cross-functional).
D2: Describe the Problem (5W2H).
D3: Containment Actions (Protect the customer).
D4: Root Cause Analysis (Fishbone, 5 Whys).
D5: Define Corrective Actions (Permanent).
D6: Implement & Validate Corrective Actions.
D7: Prevent Recurrence (Update FMEA, Control Plan, Procedures).
D8: Recognize the Team.`,
    icon: Wrench
  },

  // Scenarios
  {
    id: "iatf-scn-01",
    category: "Scenario",
    title: "Scenario: Customer Complaint (0km)",
    description: "Handling a field failure reported by an OEM customer.",
    content: `Situation:
OEM customer reports a "No Start" condition on the assembly line caused by a connector from our facility.

Response:
1. Immediate Action (0-24 hours):
   - Secure internal stock (quarantine).
   - Inform customer of clean point (lot number).
   - Initiate containment at customer site (3rd party sorting).
   - Start 8D report (D1, D2, D3).

2. Investigation (24-48 hours):
   - Receive bad part.
   - Analyze: Pin was pushed back.
   - Root Cause: Locking tab damaged during molding.

3. Resolution:
   - Tooling repair (Permanent Corrective Action).
   - Vision system added to check locking tab (Poka-yoke).
   - Update PFMEA and Control Plan.
   - Close 8D.`,
    icon: AlertTriangle
  },
  {
    id: "iatf-scn-02",
    category: "Scenario",
    title: "Scenario: Premium Freight",
    description: "Managing expedited shipping due to production delays.",
    content: `Situation:
Machine breakdown causes a 4-hour delay. Delivery to customer JIT plant is at risk.

Action:
1. Calculate required arrival time.
2. Standard truck takes 6 hours. Time available is 4 hours.
3. Decision: Authorize dedicated van (Hot Shot) or Air Charter.
4. Authorization:
   - Logistics Manager approves cost.
   - Record in "Premium Freight Log" (KPI tracking).
5. Communication:
   - Inform Customer Logistics of new ETA and vehicle details.
6. Follow-up:
   - Root cause analysis of machine breakdown to prevent recurrence.`,
    icon: Truck
  }
];

export default function IATFAutomotivePage() {
  return (
    <PolicyViewer 
      title="Automotive IATF (IATF 16949:2016)"
      description="Quality Management System requirements for automotive production and relevant service parts organizations."
      documents={documents}
    />
  );
}
