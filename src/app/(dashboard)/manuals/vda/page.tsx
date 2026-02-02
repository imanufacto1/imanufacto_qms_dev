import React from 'react';
import { Book, Award, Target, Briefcase, PackageCheck, Truck, BarChart } from 'lucide-react';

const clauses = [
  {
    number: "P2",
    title: "Project Management",
    icon: Briefcase,
    requirements: [
      "Is the project organization established?",
      "Are all resources available for project implementation?",
      "Is project planning available and is it being monitored?",
      "Are the advanced product quality planning activities implemented?"
    ]
  },
  {
    number: "P3",
    title: "Planning Product & Process Development",
    icon: Target,
    requirements: [
      "Are the specific product and process requirements available?",
      "Is the feasibility of the product and process confirmed?",
      "Is there a plan for the product and process development?"
    ]
  },
  {
    number: "P4",
    title: "Realization of Product & Process Development",
    icon: PackageCheck,
    requirements: [
      "Are the product and process development activities implemented?",
      "Are personnel resources available and qualified?",
      "Is the material availability ensured?"
    ]
  },
  {
    number: "P5",
    title: "Supplier Management",
    icon: Truck,
    requirements: [
      "Are only approved and quality-capable suppliers used?",
      "Is the quality of the purchased parts ensured?",
      "Are the incoming goods inspected and stored appropriately?"
    ]
  },
  {
    number: "P6",
    title: "Process Analysis / Production",
    icon: Award,
    requirements: [
      "P6.1: What goes into the process? (Process input)",
      "P6.2: Work content / Process flow (Process management)",
      "P6.3: Process support / Personnel (Human resources)",
      "P6.4: Material resources (Machinery, equipment)",
      "P6.5: Effectiveness, efficiency, waste avoidance",
      "P6.6: What comes out of the process? (Process result)"
    ]
  },
  {
    number: "P7",
    title: "Customer Support / Customer Satisfaction",
    icon: BarChart,
    requirements: [
      "Are customer requirements regarding QM system, product and process met?",
      "Is customer service guaranteed?",
      "Is customer satisfaction measured and are results used for improvement?"
    ]
  }
];

export default function ManualsVDAPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">VDA Manual</h1>
          <p className="text-gray-500">VDA 6.3 - Process Audit</p>
        </div>
        <Book className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clauses.map((clause) => (
          <div key={clause.number} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-100 bg-indigo-50/50 flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                {clause.number}
              </div>
              <h3 className="font-semibold text-gray-900">{clause.title}</h3>
              <clause.icon className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {clause.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
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
