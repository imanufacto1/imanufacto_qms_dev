import React from 'react';
import { Award, ShieldCheck, BadgeCheck, FileBadge, Car } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    name: "German Automotive",
    icon: Car,
    description: "Suppliers to VW, BMW, Mercedes-Benz, etc.",
    path: "/policies/vda/automotive",
    recommended: true
  },
  {
    name: "General Automotive",
    icon: BadgeCheck,
    description: "Global automotive supply chain.",
    path: "#"
  },
  {
    name: "Component Manufacturing",
    icon: FileBadge,
    description: "Specific parts production requiring process audits.",
    path: "#"
  },
  {
    name: "Service Providers",
    icon: ShieldCheck,
    description: "Logistics and service providers in auto industry.",
    path: "#"
  }
];

export default function PoliciesVDAPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">VDA Policies & Procedures</h1>
          <p className="text-gray-500">VDA 6.3 & 6.5 - Select Industry Context</p>
        </div>
        <Award className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link 
            key={industry.name} 
            href={industry.path}
            className={`block group relative bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${industry.recommended ? 'border-yellow-200 ring-1 ring-yellow-100' : 'border-gray-200'}`}
          >
            {industry.recommended && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                Recommended
              </span>
            )}
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${industry.recommended ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
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
