import React from 'react';
import { Book, Lock, Shield, Server, FileWarning, Eye, RefreshCw } from 'lucide-react';

const clauses = [
  {
    number: "4",
    title: "Context of the Organization",
    icon: Server,
    requirements: [
      "Understand the organization and its context.",
      "Understand needs and expectations of interested parties.",
      "Determine the scope of the Information Security Management System (ISMS).",
      "Establish, implement, maintain, and continually improve the ISMS."
    ]
  },
  {
    number: "5",
    title: "Leadership",
    icon: Shield,
    requirements: [
      "Leadership and commitment to information security.",
      "Information Security Policy.",
      "Organizational roles, responsibilities, and authorities."
    ]
  },
  {
    number: "6",
    title: "Planning",
    icon: FileWarning,
    requirements: [
      "Actions to address risks and opportunities.",
      "Information security risk assessment.",
      "Information security risk treatment.",
      "Information security objectives and planning to achieve them."
    ]
  },
  {
    number: "7",
    title: "Support",
    icon: Lock,
    requirements: [
      "Resources, competence, and awareness.",
      "Communication.",
      "Documented information (creation, update, and control)."
    ]
  },
  {
    number: "8",
    title: "Operation",
    icon: Server,
    requirements: [
      "Operational planning and control.",
      "Information security risk assessment (execution).",
      "Information security risk treatment (implementation)."
    ]
  },
  {
    number: "9",
    title: "Performance Evaluation",
    icon: Eye,
    requirements: [
      "Monitoring, measurement, analysis, and evaluation.",
      "Internal audit.",
      "Management review."
    ]
  },
  {
    number: "10",
    title: "Improvement",
    icon: RefreshCw,
    requirements: [
      "Nonconformity and corrective action.",
      "Continual improvement."
    ]
  }
];

export default function ManualsISMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">ISMS Manual</h1>
          <p className="text-gray-500">ISO 27001:2022 - Information Security Management Systems</p>
        </div>
        <Book className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clauses.map((clause) => (
          <div key={clause.number} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-purple-50/50 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                {clause.number}
              </div>
              <h3 className="font-semibold text-gray-900">{clause.title}</h3>
              <clause.icon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {clause.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
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
