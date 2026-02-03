"use client";

import React from 'react';
import { Book, Shield, AlertTriangle, Activity, Leaf } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  {
    id: "hse-man-01",
    category: "Manual",
    title: "Integrated HSE Management System Manual",
    description: "Combined manual for ISO 14001 (Environment) and ISO 45001 (Health & Safety).",
    content: `1. Scope
This manual defines the Health, Safety, and Environmental (HSE) management system for all facility operations.

2. Context
We consider environmental impacts (air, water, waste) and OHS risks (machinery, ergonomics, chemicals).
Interested parties: Employees, Regulators (EPA/OSHA), Community, Customers.

3. Leadership
Management is committed to preventing injury, ill health, and pollution.
HSE Policy: "Zero Harm, Sustainable Future."

4. Planning
- Hazard Identification and Risk Assessment (HIRA)
- Environmental Aspect and Impact Assessment
- Compliance Obligations (Legal Register)

5. Support
- Competence: HSE training (Fire safety, First aid, Chemical handling).
- Communication: Safety committees, Toolbox talks.

6. Operation
- Operational Controls: LOTO, Permit to Work, Waste handling.
- Emergency Preparedness and Response: Fire drills, Spill response.

7. Performance Evaluation
- Monitoring: Noise levels, Air quality, Incident rates (LTIR).
- Internal Audits and Compliance Evaluations.

8. Improvement
- Incident investigation.
- Corrective actions for near misses and unsafe conditions.`,
    icon: Book
  },
  {
    id: "sop-hse-01",
    category: "SOP",
    title: "Hazard Identification & Risk Assessment (HIRA)",
    description: "Procedure for identifying hazards and assessing risks.",
    content: `1. Purpose
To proactively identify hazards and implement controls.

2. Process
2.1 Identify Activity: Break down the job into steps.
2.2 Identify Hazards: Mechanical, Electrical, Chemical, Ergonomic, Biological.
2.3 Assess Risk: Risk = Probability x Severity.
2.4 Determine Controls: Hierarchy of Controls (Elimination > Substitution > Engineering > Admin > PPE).
2.5 Review: Review HIRA annually or after changes.`,
    icon: Shield
  },
  {
    id: "sop-hse-02",
    category: "SOP",
    title: "Incident Reporting and Investigation",
    description: "Procedure for reporting accidents, near misses, and environmental incidents.",
    content: `1. Immediate Action
- Ensure safety of personnel.
- Contain environmental release.
- Provide first aid/medical attention.

2. Reporting
- Report to supervisor immediately.
- Submit Incident Report Form within 24 hours.

3. Investigation
- Gather facts (photos, witness statements).
- Determine Root Cause (RCA).
- Assign Corrective Actions.

4. Sharing Learning
- Create Safety Alert.
- Discuss in Toolbox Talk.`,
    icon: AlertTriangle
  },
  {
    id: "wi-hse-01",
    category: "Work Instruction",
    title: "Personal Protective Equipment (PPE) Matrix",
    description: "Guide on required PPE for specific areas/tasks.",
    content: `Area: Production Floor
- Safety Shoes: Mandatory (Steel toe)
- Safety Glasses: Mandatory (Side shields)
- Ear Plugs: Mandatory if >85dB

Task: Chemical Handling
- Chemical Resistant Gloves (Nitrile/Neoprene)
- Face Shield
- Apron

Task: Welding
- Welding Helmet
- Leather Gloves
- Fire Resistant Clothing`,
    icon: Activity
  },
  {
    id: "wi-hse-02",
    category: "Work Instruction",
    title: "Waste Segregation Guide",
    description: "Color-coding for waste disposal.",
    content: `Green Bin: Recyclable (Paper, Cardboard, Plastic bottles)
Blue Bin: Metal Scrap
Red Bin: Hazardous Waste (Oily rags, Chemical containers) - MUST be labeled.
Black Bin: General Waste (Non-recyclable, Food wrappers)
Yellow Bin: E-Waste (Batteries, Cables)`,
    icon: Leaf
  },
  {
    id: "scen-hse-01",
    category: "Scenario",
    title: "Chemical Spill Response",
    description: "Scenario demonstrating proper spill response.",
    content: `Scenario:
A forklift punctures a drum of solvent in the warehouse. Liquid is spreading.

Response Actions:
1. Alert: Operator shouts "Spill!" and clears the area.
2. Identify: Check label (Flammable Solvent).
3. Protect: Wear PPE (Respirator, Gloves) before approaching.
4. Contain: Use spill kit socks to surround the spill. Stop it from entering drains.
5. Absorb: Apply absorbent pads/granules.
6. Clean: Scoop into hazardous waste bags.
7. Report: Notify HSE Manager.`,
    icon: AlertTriangle
  }
];

export default function ManualsHSEPage() {
  return (
    <PolicyViewer 
      title="HSE Manual (ISO 14001 & 45001)"
      description="Integrated Health, Safety, and Environment Management System Manual."
      documents={documents}
      enableEditing={false}
    />
  );
}
