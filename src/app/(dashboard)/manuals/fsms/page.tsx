"use client";

import React from 'react';
import { Book, Utensils, Shield, FileText, AlertTriangle, Thermometer } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  {
    id: "fsms-man-01",
    category: "Manual",
    title: "Food Safety Management Manual (ISO 22000)",
    description: "Manual defining the system to ensure food safety from farm to fork.",
    content: `1. Scope
Applies to all food processing, handling, and storage activities.

2. Context
- Food safety hazards: Biological, Chemical, Physical, Allergenic.
- Requirements: FDA/local regulations, Customer specs.

3. Leadership
Food Safety Policy: "Safe Food, Every Time."
Food Safety Team Leader appointed.

4. Planning
- HACCP Plan (Hazard Analysis Critical Control Point).
- PRPs (Prerequisite Programs).

5. Support
- Infrastructure: Sanitary design, Pest control, Waste disposal.
- Training: Hygiene training for all handlers.

6. Operation
- OPRPs (Operational Prerequisite Programs).
- CCPs (Critical Control Points) monitoring.
- Traceability system (Mock recall).
- Emergency preparedness (Power failure, Water contamination).

7. Performance Evaluation
- Validation of control measures.
- Internal Audit.
- Management Review.

8. Improvement
- Corrective actions.
- Updating the FSMS.`,
    icon: Book
  },
  {
    id: "sop-fsms-01",
    category: "SOP",
    title: "HACCP Plan Development",
    description: "Methodology for conducting hazard analysis and establishing CCPs.",
    content: `1. Assemble HACCP Team.
2. Describe Product and Distribution.
3. Identify Intended Use.
4. Construct Flow Diagram.
5. Verify Flow Diagram on-site.
6. Conduct Hazard Analysis (List hazards, assess risk).
7. Determine CCPs (Use Decision Tree).
8. Establish Critical Limits.
9. Establish Monitoring Procedures.
10. Establish Corrective Actions.
11. Establish Verification Procedures.
12. Establish Record Keeping.`,
    icon: Shield
  },
  {
    id: "sop-fsms-02",
    category: "SOP",
    title: "Personal Hygiene Policy",
    description: "Rules for personnel entering food handling areas.",
    content: `1. Health Status: No illness (diarrhea, vomiting, jaundice) allowed in production.
2. Clothing: Clean uniforms, hairnets covering all hair, beard snoods. No buttons/pockets above waist.
3. Jewelry: No jewelry, watches, or visible piercings. Plain wedding bands may be allowed if covered.
4. Hand Washing: Wash hands on entry, after toilet, after eating, after touching face/waste.
5. Behavior: No eating, drinking, chewing gum, or smoking in production areas.`,
    icon: Utensils
  },
  {
    id: "wi-fsms-01",
    category: "Work Instruction",
    title: "Hand Washing Procedure",
    description: "Step-by-step guide for effective hand washing.",
    content: `1. Wet hands with warm water.
2. Apply soap.
3. Lather for at least 20 seconds (palm, back of hands, between fingers, thumbs, wrists).
4. Rinse thoroughly.
5. Dry with single-use paper towel or air dryer.
6. Sanitize with alcohol gel (if required).`,
    icon: Utensils
  },
  {
    id: "wi-fsms-02",
    category: "Work Instruction",
    title: "CCP Monitoring: Pasteurization Temperature",
    description: "Instructions for monitoring the pasteurization CCP.",
    content: `Critical Limit: Minimum 72°C for 15 seconds.

Monitoring:
1. Check temperature recorder every 2 hours.
2. Verify flow diversion valve status.
3. Record values in CCP Log.

Corrective Action (if <72°C):
1. Stop production.
2. Divert product to rework/dump.
3. Notify Quality Manager.
4. Fix heating unit.
5. Retest before restarting.`,
    icon: Thermometer
  },
  {
    id: "scen-fsms-01",
    category: "Scenario",
    title: "Mock Recall Exercise",
    description: "Scenario to test traceability system.",
    content: `Scenario:
Customer reports finding a piece of blue plastic in "Batch A123" of Cookies.

Traceability Test:
1. Identify raw materials used in Batch A123 (Flour Lot #X, Sugar Lot #Y).
2. Identify packaging materials used.
3. Identify all customers who received Batch A123.
4. Verify if other batches used the same raw materials.

Goal:
Locate 100% of the affected product within 4 hours.

Outcome:
If unable to trace, the system fails. Root cause analysis required (e.g., missing production logs).`,
    icon: AlertTriangle
  }
];

export default function ManualsFSMSPage() {
  return (
    <PolicyViewer 
      title="FSMS Manual (ISO 22000)"
      description="Food Safety Management System Manual and Procedures."
      documents={documents}
      enableEditing={false}
    />
  );
}
