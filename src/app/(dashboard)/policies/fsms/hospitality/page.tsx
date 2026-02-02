"use client";

import React from 'react';
import { Shield, FileCheck, Thermometer, UserCheck, Utensils, AlertOctagon, ClipboardList, AlertTriangle, Bug, Droplet, Clock } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  // --- POLICIES ---
  {
    id: "fsms-pol-01",
    category: "Policy",
    title: "Food Safety Policy",
    description: "Commitment to delivering safe food and maintaining hygiene.",
    content: `1. Mission
We are dedicated to preparing and serving food that is safe, wholesome, and of the highest quality.

2. Commitments
- Comply with all local food safety regulations and ISO 22000 requirements.
- Maintain a rigorous HACCP system.
- Ensure all staff are trained in food safety hygiene.
- Communicate food safety requirements to suppliers and contractors.

3. Customer Focus
We will transparently communicate allergen information to our guests.

Signed: Executive Chef / General Manager`,
    icon: Shield
  },
  {
    id: "fsms-pol-02",
    category: "Policy",
    title: "Allergen Management Policy",
    description: "Procedures to prevent cross-contamination of allergens.",
    content: `1. Identified Allergens (The Big 9)
Milk, Eggs, Fish, Shellfish, Tree Nuts, Peanuts, Wheat, Soy, Sesame.

2. Storage
- Allergens stored separately or below non-allergens in fridges.
- Labeled clearly with "ALLERGEN" stickers.

3. Preparation
- Use dedicated purple color-coded cutting boards/knives for "Free-From" meals.
- Wash hands and sanitize surfaces before preparing allergen-free orders.

4. Service
- Waitstaff must ask guests about allergies.
- Kitchen prints "ALLERGY ALERT" on order tickets.`,
    icon: AlertTriangle
  },

  // --- PLANS ---
  {
    id: "fsms-plan-01",
    category: "Plan",
    title: "HACCP Plan",
    description: "Hazard Analysis Critical Control Point plan summary.",
    content: `1. CCP 1: Receiving (Chilled/Frozen)
- Hazard: Bacterial growth.
- Limit: Chilled < 5°C, Frozen < -18°C.
- Monitoring: Check every delivery.

2. CCP 2: Cooking (Poultry/Meat)
- Hazard: Survival of pathogens (Salmonella).
- Limit: Core temp > 75°C for 15 seconds.
- Monitoring: Probe every batch.

3. CCP 3: Cooling
- Hazard: Spore germination.
- Limit: 60°C to 10°C within 2 hours.
- Monitoring: Log time and temp.

4. CCP 4: Hot Holding
- Hazard: Bacterial growth.
- Limit: Keep > 60°C.
- Monitoring: Check every 2 hours.`,
    icon: AlertOctagon
  },
  {
    id: "fsms-plan-02",
    category: "Plan",
    title: "Pest Control Plan",
    description: "Strategy to keep the facility pest-free.",
    content: `1. Contractor
- Service provided by "PestAway Inc." monthly.

2. Measures
- Electric Fly Killers (EFKs) located away from food prep areas.
- Rodent bait stations (tamper-resistant) on external perimeter only.
- Door sweeps and fly screens installed on all entries.

3. Staff Responsibility
- Report any sightings immediately in "Pest Sighting Log".
- Keep external bins closed.
- Don't leave food out overnight.`,
    icon: Bug
  },

  // --- SOPs ---
  {
    id: "fsms-sop-01",
    category: "SOP",
    title: "Personal Hygiene Standard",
    description: "Rules for personal cleanliness and dress code.",
    content: `1. Health Status
- Staff suffering from vomiting, diarrhea, or fever must NOT work.
- Return to work 48 hours after symptoms cease.
- Cuts/sores must be covered with a bright blue waterproof plaster.

2. Hand Washing
- Wash hands:
  - Before starting work.
  - After toilet use.
  - After handling raw meat/eggs.
  - After touching face/hair/phone.
  - Every 30 minutes.

3. Uniform
- Clean chef coat/apron daily.
- Hairnet/hat must cover all hair.
- No jewelry (except plain wedding band).
- No nail polish or false nails.`,
    icon: UserCheck
  },
  {
    id: "fsms-sop-02",
    category: "SOP",
    title: "Cleaning & Sanitation Schedule",
    description: "Frequency and method for cleaning all areas.",
    content: `1. Color Coding
- Red: Toilets/Floors
- Blue: General Surfaces
- Green: Food Prep Surfaces
- Yellow: Clinical/Disinfection

2. Procedure (Clean-Rinse-Sanitize)
- Pre-clean: Remove loose debris.
- Main Clean: Hot water + Detergent.
- Rinse: Clean water.
- Sanitize: Apply sanitizer (wait for contact time, e.g., 30s).
- Dry: Air dry.

3. Frequency
- Food contact surfaces: After every use / every 4 hours.
- Floors: End of shift.
- Deep clean (Behind equipment): Weekly.`,
    icon: Droplet
  },
  {
    id: "fsms-sop-03",
    category: "SOP",
    title: "Receiving & Storage (FIFO)",
    description: "Ensuring safe receipt and rotation of stock.",
    content: `1. Inspection
- Check temperature (CCP 1).
- Check 'Use By' dates.
- Check packaging integrity.

2. Labeling
- Label all items with "Date Received" and "Use By".
- Decanted items must have a secondary label.

3. Storage Hierarchy (Top to Bottom)
- Ready-to-Eat (Cooked meat, dairy, salad).
- Raw Fish.
- Raw Beef/Lamb.
- Raw Pork.
- Raw Poultry (Bottom shelf to prevent drip).

4. Rotation
- First In, First Out (FIFO).
- Move new stock to the back.`,
    icon: ClipboardList
  },

  // --- WORK INSTRUCTIONS ---
  {
    id: "fsms-wi-01",
    category: "Work Instruction",
    title: "Correct Hand Washing Technique",
    description: "20-second procedure for effective hand hygiene.",
    content: `1. Wet hands with warm water (approx 38°C).
2. Apply liquid soap.
3. Rub hands palm to palm.
4. Rub back of each hand with fingers interlaced.
5. Rub between fingers.
6. Rub backs of fingers against opposite palm.
7. Rub thumbs rotationally.
8. Rub fingertips on palms.
9. Rinse thoroughly.
10. Dry with single-use paper towel.
11. Turn off tap with paper towel.`,
    icon: Droplet
  },
  {
    id: "fsms-wi-02",
    category: "Work Instruction",
    title: "Temperature Monitoring (Fridge/Freezer)",
    description: "Daily checks to ensure cold chain integrity.",
    content: `1. Frequency
- Twice daily: 09:00 and 16:00.

2. Procedure
- Read digital display.
- Verify with internal probe thermometer (place in a water bottle simulator) once a week.
- Record temp in "Temperature Logbook".

3. Limits
- Fridge: 1°C to 5°C.
- Freezer: -18°C to -22°C.

4. Deviation
- If Fridge > 5°C: Adjust dial, recheck in 1 hour. Move food if > 8°C.
- If Freezer > -15°C: Move food to backup freezer immediately.`,
    icon: Thermometer
  },
  {
    id: "fsms-wi-03",
    category: "Work Instruction",
    title: "Vegetable Sanitizing",
    description: "Cleaning raw vegetables for salad.",
    content: `1. Preparation
- Clean and sanitize the prep sink.

2. Washing
- Rinse visible dirt under running water.

3. Sanitizing
- Fill sink with water and add Chlorine tablet (50ppm).
- Submerge vegetables for 5 minutes.

4. Rinsing
- Rinse thoroughly with cold potable water to remove chlorine taste.

5. Drying
- Spin dry in salad spinner.`,
    icon: Utensils
  },

  // --- SCENARIOS ---
  {
    id: "fsms-scn-01",
    category: "Scenario",
    title: "Scenario: Customer Allergic Reaction",
    description: "Handling a reported allergic reaction in the restaurant.",
    content: `Situation:
A guest claims they are having a reaction to the "Special Pasta". They mentioned a nut allergy.

Step 1: Immediate Action
- Call Manager immediately.
- Ask guest: "Do you have an EpiPen? Do we need to call an ambulance?"
- If severe (trouble breathing), call 911 immediately.

Step 2: Kitchen Investigation
- Stop serving the "Special Pasta".
- Chef checks recipe: Contains Pesto (Pine nuts).
- Check order ticket: Waiter noted "Nut Allergy" on ticket?
  - Scenario A: Waiter didn't write it. (Waiter Error)
  - Scenario B: Waiter wrote it, Chef missed it. (Kitchen Error)

Step 3: Finding
- Ticket said "No Nuts". Chef used Pesto garnish out of habit.

Step 4: Corrective Action
- Retrain kitchen staff on reading tickets.
- Highlight allergy notes in RED on KDS (Kitchen Display System).
- Apologize to guest (if stable), cover medical costs/compensation as per legal advice.`,
    icon: AlertTriangle
  },
  {
    id: "fsms-scn-02",
    category: "Scenario",
    title: "Scenario: Walk-in Fridge Failure",
    description: "What to do when the main fridge breaks down overnight.",
    content: `Situation:
Chef arrives at 7 AM. Walk-in fridge reads 18°C. Last check was 9 PM previous night (4°C).

Step 1: Assessment
- Food has been in Danger Zone (>8°C) for potentially 10 hours.
- Risk: High bacterial growth.

Step 2: Decision
- Critical Control Point Failure.
- Discard: All high-risk foods (Meat, Dairy, Cooked Rice, Seafood).
- Save: Whole raw vegetables (wash/cook thoroughly), Canned drinks.
- Total Loss estimated: $2,000.

Step 3: Recovery
- Call repair technician.
- Order emergency stock for evening service.
- Clean and sanitize fridge interior before restocking.

Step 4: Prevention
- Install remote temperature monitoring system with SMS alerts (IoT sensor).`,
    icon: Clock
  }
];

export default function FSMSHospitalityPage() {
  return (
    <PolicyViewer 
      title="Hospitality FSMS (ISO 22000 & HACCP)"
      description="Food Safety Management System policies and procedures for hotels and restaurants."
      documents={documents}
    />
  );
}
