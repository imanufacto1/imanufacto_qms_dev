import React from 'react';
import { Leaf, HardHat, Factory, Wind, Truck } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    name: "Manufacturing",
    icon: Factory,
    description: "Heavy industry, chemical plants, assembly lines.",
    path: "/policies/hse/manufacturing",
    recommended: true
  },
  {
    name: "Construction",
    icon: HardHat,
    description: "Building sites, civil engineering, infrastructure.",
    path: "#"
  },
  {
    name: "Oil & Gas",
    icon: Wind,
    description: "Extraction, refining, pipelines.",
    path: "#"
  },
  {
    name: "Logistics",
    icon: Truck,
    description: "Transportation, warehousing, distribution.",
    path: "#"
  }
];

export default function PoliciesHSEPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">HSE Policies & Procedures</h1>
          <p className="text-gray-500">ISO 14001:2015 & ISO 45001:2018 - Select Industry Context</p>
        </div>
        <Leaf className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link 
            key={industry.name} 
            href={industry.path}
            className={`block group relative bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${industry.recommended ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-200'}`}
          >
            {industry.recommended && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                Recommended
              </span>
            )}
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${industry.recommended ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
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
