import React from 'react';
import { ClipboardCheck, Briefcase, Factory, Truck, HeartPulse, Cpu } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Production of goods, heavy machinery, consumer products.",
    path: "/policies/qms/manufacturing",
    recommended: true
  },
  {
    name: "Automotive",
    icon: Briefcase,
    description: "Vehicle manufacturing, parts suppliers (Tier 1/2).",
    path: "/policies/qms/manufacturing", // Reusing manufacturing for now or placeholder
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    description: "Hospitals, clinics, medical device manufacturing.",
    path: "#"
  },
  {
    name: "Information Technology",
    icon: Cpu,
    description: "Software development, IT services, data centers.",
    path: "#"
  },
  {
    name: "Logistics & Transport",
    icon: Truck,
    description: "Warehousing, freight, shipping, public transport.",
    path: "#"
  }
];

export default function PoliciesQMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">QMS Policies & Procedures</h1>
          <p className="text-gray-500">ISO 9001:2015 - Select Industry Context</p>
        </div>
        <ClipboardCheck className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link 
            key={industry.name} 
            href={industry.path}
            className={`block group relative bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${industry.recommended ? 'border-blue-200 ring-1 ring-blue-100' : 'border-gray-200'}`}
          >
            {industry.recommended && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                Recommended
              </span>
            )}
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${industry.recommended ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {industry.name}
              </h3>
              <p className="text-sm text-gray-500">
                {industry.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
