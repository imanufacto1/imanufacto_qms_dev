import React from 'react';
import { Book, Utensils, AlertOctagon, CheckSquare, ClipboardList, ShieldCheck, Factory } from 'lucide-react';

const clauses = [
  {
    number: "4",
    title: "Context of the Organization",
    icon: Factory,
    requirements: [
      "Determine external/internal issues affecting food safety.",
      "Understand needs of interested parties.",
      "Determine scope of FSMS.",
      "Establish FSMS processes."
    ]
  },
  {
    number: "5",
    title: "Leadership",
    icon: ShieldCheck,
    requirements: [
      "Demonstrate leadership and commitment to food safety.",
      "Establish Food Safety Policy.",
      "Assign roles and responsibilities (including Food Safety Team Leader)."
    ]
  },
  {
    number: "6",
    title: "Planning",
    icon: ClipboardList,
    requirements: [
      "Address risks and opportunities.",
      "Set FSMS objectives.",
      "Plan changes to the FSMS."
    ]
  },
  {
    number: "7",
    title: "Support",
    icon: Utensils,
    requirements: [
      "Provide resources (infrastructure, work environment).",
      "Control externally developed FSMS elements.",
      "Ensure competence and awareness.",
      "Communication (internal and external relevant to food safety).",
      "Documented information control."
    ]
  },
  {
    number: "8",
    title: "Operation",
    icon: AlertOctagon,
    requirements: [
      "Operational planning and control.",
      "Prerequisite Programs (PRPs).",
      "Traceability system.",
      "Emergency preparedness and response.",
      "Hazard control (HACCP plan).",
      "Control of monitoring and measuring.",
      "Control of product and process nonconformities."
    ]
  },
  {
    number: "9",
    title: "Performance Evaluation",
    icon: CheckSquare,
    requirements: [
      "Monitoring, measurement, analysis and evaluation.",
      "Internal audit.",
      "Management review."
    ]
  },
  {
    number: "10",
    title: "Improvement",
    icon: Book,
    requirements: [
      "Nonconformity and corrective action.",
      "Continual improvement.",
      "Update of the FSMS."
    ]
  }
];

export default function ManualsFSMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">FSMS Manual</h1>
          <p className="text-gray-500">ISO 22000:2018 - Food Safety Management Systems</p>
        </div>
        <Book className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clauses.map((clause) => (
          <div key={clause.number} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-orange-50/50 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                {clause.number}
              </div>
              <h3 className="font-semibold text-gray-900">{clause.title}</h3>
              <clause.icon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {clause.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
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
