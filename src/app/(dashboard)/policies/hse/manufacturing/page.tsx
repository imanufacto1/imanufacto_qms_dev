import React from 'react';
import { Shield, Flame, Droplet, HardHat, AlertTriangle, FileText, ClipboardCheck, Activity, Truck, Skull, Zap } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  // --- POLICIES ---
  {
    id: "hse-pol-01",
    category: "Policy",
    title: "HSE Policy",
    description: "Commitment to health, safety, and environmental stewardship.",
    content: `1. Purpose
To ensure the health and safety of all employees, contractors, and visitors, and to minimize environmental impact.

2. Commitments
- Prevention of injury and ill health.
- Compliance with all legal and other requirements (ISO 14001, ISO 45001).
- Continual improvement of HSE management and performance.
- Consultation and participation of workers.

3. Key Principles
- "Safety First" - No job is so urgent that it cannot be done safely.
- All accidents are preventable.
- Environmental protection is everyone's responsibility.

Signed: Managing Director`,
    icon: Shield
  },
  {
    id: "hse-pol-02",
    category: "Policy",
    title: "Drug & Alcohol Policy",
    description: "Zero tolerance policy for substance abuse in the workplace.",
    content: `1. Policy
Possession, use, distribution, or being under the influence of drugs or alcohol on company premises is strictly prohibited.

2. Testing
- Pre-employment screening.
- Random testing (5% of workforce monthly).
- Post-incident testing (mandatory after any accident).
- Reasonable suspicion testing.

3. Consequences
- Positive test result = Immediate disciplinary action up to termination.
- Refusal to test = Treated as positive result.`,
    icon: Activity
  },

  // --- PLANS ---
  {
    id: "hse-plan-01",
    category: "Plan",
    title: "Emergency Response Plan",
    description: "Procedures for responding to emergencies and accidents.",
    content: `1. Emergency Coordinator
- Primary: Safety Manager (Ext 101)
- Secondary: Plant Manager (Ext 102)

2. Evacuation Procedure
- Alarm sounds (Continuous Siren).
- Stop work, shut down machinery (if safe).
- Proceed to nearest Emergency Exit.
- Assemble at designated Assembly Point (Parking Lot B).
- Roll call by Department Heads.

3. Specific Scenarios
- Fire: Call Fire Dept. Use extinguisher only if trained and fire is small.
- Medical: Call First Aider. Call Ambulance (911).
- Chemical Spill: Evacuate area. Call Hazmat Team.`,
    icon: Flame
  },
  {
    id: "hse-plan-02",
    category: "Plan",
    title: "Waste Management Plan",
    description: "Strategy for reducing, reusing, and recycling waste.",
    content: `1. Goals
- Reduce landfill waste by 20% in 2025.
- Achieve 100% compliance with hazardous waste disposal regulations.

2. Waste Segregation (Color Codes)
- Blue: Paper/Cardboard (Recycle)
- Green: General Waste (Landfill)
- Red: Hazardous/Chemical Waste (Incineration)
- Yellow: Metal Scrap (Recycle)

3. Hazardous Waste Handling
- Stored in secondary containment.
- Labeled with GHS symbols.
- Disposed of via licensed contractor (EnviroClean Services).`,
    icon: Droplet
  },

  // --- SOPs ---
  {
    id: "hse-sop-01",
    category: "SOP",
    title: "Hazard Identification & Risk Assessment (HIRA)",
    description: "Methodology for identifying and controlling workplace hazards.",
    content: `1. Process
- Identify Activity (e.g., Welding).
- Identify Hazard (e.g., Fumes, UV light).
- Assess Risk (Probability x Severity).
- Determine Controls (Hierarchy: Elimination > Substitution > Engineering > Admin > PPE).

2. Review Frequency
- Annually.
- After any accident/incident.
- Before new equipment/process introduction.

3. Risk Matrix
- High (15-25): Stop work immediately.
- Medium (8-12): Implement controls within 24 hours.
- Low (1-6): Monitor.`,
    icon: AlertTriangle
  },
  {
    id: "hse-sop-02",
    category: "SOP",
    title: "Lockout / Tagout (LOTO)",
    description: "Procedure to control hazardous energy during maintenance.",
    content: `1. Preparation
- Identify energy sources (Electrical, Hydraulic, Pneumatic).
- Notify affected employees.

2. Shutdown
- Turn off equipment normally.
- Isolate energy sources (Open breakers, close valves).

3. Lock & Tag
- Apply personal lock and tag to isolation points.
- Tag must show: "DANGER - DO NOT OPERATE", Name, Date.

4. Verification (Zero Energy Check)
- Attempt to start equipment.
- Check pressure gauges read zero.
- Test voltage.

5. Restoration
- Remove tools/personnel.
- Remove locks/tags.
- Notify employees.`,
    icon: Zap
  },
  {
    id: "hse-sop-03",
    category: "SOP",
    title: "Incident Reporting & Investigation",
    description: "Protocol for reporting accidents, near misses, and unsafe acts.",
    content: `1. Immediate Action
- Care for injured.
- Secure the scene.

2. Reporting
- Employee must report to Supervisor immediately.
- Supervisor submits "Initial Incident Report" within 24 hours.

3. Investigation
- Team: Safety Officer, Supervisor, Employee Rep.
- Gather evidence (Photos, CCTV, Witness statements).
- Determine Root Cause (Use 5 Whys / Fishbone).

4. Corrective Action
- Implement measures to prevent recurrence.
- Share "Lessons Learned" alert.`,
    icon: ClipboardCheck
  },

  // --- WORK INSTRUCTIONS ---
  {
    id: "hse-wi-01",
    category: "Work Instruction",
    title: "PPE Usage Requirements",
    description: "Mandatory personal protective equipment for various zones.",
    content: `1. General Plant (Blue Zone)
- Safety Shoes (Steel toe).
- Safety Glasses (ANSI Z87.1).
- High-visibility vest.

2. Welding Area (Red Zone)
- Welding Helmet (Auto-darkening).
- Leather Apron & Sleeves.
- Welding Gloves.
- Fume Extractor ON.

3. Chemical Store (Yellow Zone)
- Chemical Resistant Gloves (Nitrile/Neoprene).
- Face Shield.
- Rubber Apron.
- Respirator (if handling volatile solvents).`,
    icon: HardHat
  },
  {
    id: "hse-wi-02",
    category: "Work Instruction",
    title: "Forklift Pre-Use Inspection",
    description: "Daily checks required before operating a forklift.",
    content: `1. Visual Check (Engine Off)
- Tires: Cuts, pressure, wheel nuts.
- Forks: Cracks, latch pin.
- Hoses: Leaks (hydraulic oil).
- Seatbelt: Functioning.

2. Operational Check (Engine On)
- Brakes: Service and Parking brake hold.
- Steering: Smooth, no play.
- Horn & Lights: Working.
- Lift/Tilt: Smooth operation.

3. Record
- Sign Logbook.
- If FAIL: Remove key, tag "Out of Service", report to maintenance.`,
    icon: Truck
  },
  {
    id: "hse-wi-03",
    category: "Work Instruction",
    title: "Chemical Spill Response",
    description: "Steps to take in case of a minor chemical spill.",
    content: `1. Assess
- Identify chemical (Read Label/SDS).
- If highly toxic/large volume -> Evacuate & Call Hazmat.

2. Protect
- Wear PPE: Goggles, Gloves, Boots.

3. Contain
- Use spill kit socks to encircle the spill.
- Stop flow if safe (close valve, upright container).

4. Clean Up
- Use absorbent pads/granules.
- Scoop into "Hazardous Waste" bag.

5. Decontaminate
- Wash area with water/detergent.`,
    icon: Skull
  },

  // --- SCENARIOS ---
  {
    id: "hse-scn-01",
    category: "Scenario",
    title: "Scenario: Chemical Splash Injury",
    description: "Response to an employee getting splashed with acid.",
    content: `Situation:
Employee John Doe is transferring Sulfuric Acid. A hose bursts, splashing acid on his arm and face.

Step 1: Emergency Action
- John yells for help.
- Co-worker assists John to the Emergency Safety Shower / Eye Wash station immediately.
- John floods affected area with water for minimum 15 minutes.
- Remove contaminated clothing while under shower.

Step 2: Medical Attention
- First Aider calls ambulance.
- SDS for Sulfuric Acid provided to paramedics.

Step 3: Scene Management
- Area barricaded.
- Spill contained using neutralizing absorbent.

Step 4: Investigation Findings
- Hose was old and cracked (Maintenance missed inspection).
- John was wearing face shield (saved eyesight) but sleeves were rolled up (arm burn).

Step 5: Corrective Actions
- Replace all chemical hoses annually.
- Retrain staff on PPE (Sleeves down).
- Add "Hose Inspection" to Monthly Safety Audit.`,
    icon: Activity
  },
  {
    id: "hse-scn-02",
    category: "Scenario",
    title: "Scenario: Near Miss (Forklift)",
    description: "Reporting and learning from a potential accident.",
    content: `Situation:
Forklift operator turns a blind corner and almost hits a pedestrian. No injury, but distance was < 1 meter.

Step 1: Reporting
- Pedestrian is shaken but fine.
- Both parties report "Near Miss" to Safety Officer.

Step 2: Investigation
- CCTV shows blind spot at corner of Warehouse Aisle 4.
- Forklift did not honk.
- Pedestrian was looking at phone.

Step 3: Root Causes
- Physical: Blind corner, no mirror.
- Behavioral: Failure to honk, distracted walking.

Step 4: Actions
- Install Convex Mirror at Aisle 4 intersection.
- Paint "Stop & Look" floor markings.
- Toolbox Talk: "Mobile Phones Prohibited in Warehouse Walkways".
- Driver refresher training on horn use at intersections.

Step 5: Outcome
- Near Miss reported as "Good Catch".
- Safety metric "Near Miss Reporting" increases (Positive indicator).`,
    icon: AlertTriangle
  }
];

export default function HSEManufacturingPage() {
  return (
    <PolicyViewer 
      title="Manufacturing HSE (ISO 14001 & 45001)"
      description="Integrated Health, Safety, and Environment management system documentation."
      documents={documents}
    />
  );
}
