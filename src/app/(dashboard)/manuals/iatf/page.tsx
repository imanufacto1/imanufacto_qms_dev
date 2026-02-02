import React from 'react';
import { Book, Car, Settings, Wrench, ClipboardCheck, BarChart2, Zap } from 'lucide-react';

const clauses = [
  {
    number: "4",
    title: "Context of the Organization",
    icon: Settings,
    requirements: [
      "Determine scope including customer-specific requirements (CSRs).",
      "Product safety processes.",
      "Conformance of products and processes."
    ]
  },
  {
    number: "5",
    title: "Leadership",
    icon: Car,
    requirements: [
      "Corporate responsibility policies (anti-bribery, ethics).",
      "Process owners must be identified.",
      "Management review of product safety."
    ]
  },
  {
    number: "6",
    title: "Planning",
    icon: ClipboardCheck,
    requirements: [
      "Risk analysis (FMEA).",
      "Contingency plans (supply interruption, cyber-attacks).",
      "Quality objectives for internal and external performance."
    ]
  },
  {
    number: "7",
    title: "Support",
    icon: Wrench,
    requirements: [
      "Plant, facility, and equipment planning (Lean manufacturing principles).",
      "Measurement systems analysis (MSA).",
      "Calibration and verification records.",
      "Competence (on-the-job training)."
    ]
  },
  {
    number: "8",
    title: "Operation",
    icon: Zap,
    requirements: [
      "Operational planning (APQP).",
      "Customer requirements review.",
      "Design and development (DFMEA, PFMEA).",
      "Supplier quality management (PPAP).",
      "Control of production (Control Plan).",
      "Total Productive Maintenance (TPM)."
    ]
  },
  {
    number: "9",
    title: "Performance Evaluation",
    icon: BarChart2,
    requirements: [
      "Monitoring and measurement of manufacturing processes (SPC).",
      "Customer satisfaction.",
      "Internal audit (System, Manufacturing Process, Product).",
      "Management review."
    ]
  },
  {
    number: "10",
    title: "Improvement",
    icon: ClipboardCheck,
    requirements: [
      "Problem solving (8D, 5 Whys).",
      "Error-proofing.",
      "Warranty management systems.",
      "Continual improvement."
    ]
  }
];

export default function ManualsIATFPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">IATF Manual</h1>
          <p className="text-gray-500">IATF 16949:2016 - Automotive Quality Management System</p>
        </div>
        <Book className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clauses.map((clause) => (
          <div key={clause.number} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-red-50/50 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 font-bold text-sm">
                {clause.number}
              </div>
              <h3 className="font-semibold text-gray-900">{clause.title}</h3>
              <clause.icon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {clause.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
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
