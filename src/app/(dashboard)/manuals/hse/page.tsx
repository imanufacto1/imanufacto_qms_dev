import React from 'react';
import { Book, Leaf, ShieldAlert, Activity, LifeBuoy, Users, AlertTriangle } from 'lucide-react';

const clauses = [
  {
    number: "4",
    title: "Context of the Organization",
    icon: Activity,
    requirements: [
      "Understand internal/external issues affecting OH&S and Environmental performance.",
      "Identify workers and other interested parties needs and expectations.",
      "Determine the scope of the HSE management system."
    ]
  },
  {
    number: "5",
    title: "Leadership and Worker Participation",
    icon: Users,
    requirements: [
      "Leadership commitment to HSE policies and objectives.",
      "Establish Environmental and OH&S policies.",
      "Assign roles, responsibilities, and authorities.",
      "Consultation and participation of workers (ISO 45001 focus)."
    ]
  },
  {
    number: "6",
    title: "Planning",
    icon: AlertTriangle,
    requirements: [
      "Hazard identification and assessment of risks and opportunities.",
      "Determine legal and other requirements.",
      "Environmental aspects and impacts assessment.",
      "Set HSE objectives and planning to achieve them."
    ]
  },
  {
    number: "7",
    title: "Support",
    icon: LifeBuoy,
    requirements: [
      "Resources, competence, and awareness.",
      "Communication (internal and external).",
      "Control of documented information.",
      "Create a culture that supports the HSE system."
    ]
  },
  {
    number: "8",
    title: "Operation",
    icon: ShieldAlert,
    requirements: [
      "Operational planning and control.",
      "Emergency preparedness and response.",
      "Eliminating hazards and reducing OH&S risks.",
      "Management of change.",
      "Procurement and contractor management."
    ]
  },
  {
    number: "9",
    title: "Performance Evaluation",
    icon: Activity,
    requirements: [
      "Monitoring, measurement, analysis, and performance evaluation.",
      "Evaluation of compliance with legal requirements.",
      "Internal audit program.",
      "Management review."
    ]
  },
  {
    number: "10",
    title: "Improvement",
    icon: Leaf,
    requirements: [
      "Incident, nonconformity, and corrective action.",
      "Continual improvement of the HSE management system.",
      "Enhance environmental and OH&S performance."
    ]
  }
];

export default function ManualsHSEPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">HSE Manual</h1>
          <p className="text-gray-500">ISO 14001:2015 (Environment) & ISO 45001:2018 (Occupational Health & Safety)</p>
        </div>
        <Book className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clauses.map((clause) => (
          <div key={clause.number} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-green-50/50 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 font-bold text-sm">
                {clause.number}
              </div>
              <h3 className="font-semibold text-gray-900">{clause.title}</h3>
              <clause.icon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {clause.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
