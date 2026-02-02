import React from 'react';
import { Book, CheckCircle, AlertCircle, FileText, Layers, Shield, Users, BarChart } from 'lucide-react';

const clauses = [
  {
    number: "4",
    title: "Context of the Organization",
    icon: Layers,
    requirements: [
      "Determine external and internal issues relevant to the organization's purpose.",
      "Identify interested parties and their requirements.",
      "Determine the scope of the Quality Management System (QMS).",
      "Establish, implement, maintain, and continually improve the QMS and its processes."
    ]
  },
  {
    number: "5",
    title: "Leadership",
    icon: Users,
    requirements: [
      "Top management must demonstrate leadership and commitment to the QMS.",
      "Establish and communicate a Quality Policy.",
      "Ensure organizational roles, responsibilities, and authorities are assigned and understood.",
      "Focus on customer satisfaction and statutory/regulatory requirements."
    ]
  },
  {
    number: "6",
    title: "Planning",
    icon: AlertCircle,
    requirements: [
      "Address risks and opportunities related to context and interested parties.",
      "Establish quality objectives and plans to achieve them.",
      "Plan changes to the QMS in a controlled manner."
    ]
  },
  {
    number: "7",
    title: "Support",
    icon: Shield,
    requirements: [
      "Provide necessary resources (people, infrastructure, environment).",
      "Ensure competence and awareness of personnel.",
      "Manage internal and external communications.",
      "Create and update documented information required by the standard."
    ]
  },
  {
    number: "8",
    title: "Operation",
    icon: FileText,
    requirements: [
      "Plan and control operational processes.",
      "Determine requirements for products and services.",
      "Design and development of products and services.",
      "Control externally provided processes, products, and services (suppliers).",
      "Production and service provision control.",
      "Release of products and services.",
      "Control of nonconforming outputs."
    ]
  },
  {
    number: "9",
    title: "Performance Evaluation",
    icon: BarChart,
    requirements: [
      "Monitor, measure, analyze, and evaluate QMS performance.",
      "Conduct internal audits at planned intervals.",
      "Top management must review the QMS to ensure suitability, adequacy, and effectiveness."
    ]
  },
  {
    number: "10",
    title: "Improvement",
    icon: CheckCircle,
    requirements: [
      "Determine and select opportunities for improvement.",
      "React to nonconformities and take corrective action.",
      "Continually improve the suitability, adequacy, and effectiveness of the QMS."
    ]
  }
];

export default function ManualsQMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">QMS Manual</h1>
          <p className="text-gray-500">ISO 9001:2015 - Quality Management Systems Requirements</p>
        </div>
        <Book className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clauses.map((clause) => (
          <div key={clause.number} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                {clause.number}
              </div>
              <h3 className="font-semibold text-gray-900">{clause.title}</h3>
              <clause.icon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {clause.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
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
