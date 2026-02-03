import React from 'react';
import { Car, Wrench, Truck, Battery } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    name: "Automotive Manufacturing",
    icon: Car,
    description: "OEMs, Tier 1, Tier 2 suppliers.",
    path: "/policies/iatf/automotive",
    recommended: true
  },
  {
    name: "Electric Vehicles (EV)",
    icon: Battery,
    description: "Battery production, EV components.",
    path: "#"
  },
  {
    name: "Aftermarket Parts",
    icon: Wrench,
    description: "Spare parts manufacturing and distribution.",
    path: "#"
  },
  {
    name: "Heavy Duty Vehicles",
    icon: Truck,
    description: "Trucks, buses, agricultural machinery.",
    path: "#"
  }
];

export default function PoliciesIATFPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">IATF Policies & Procedures</h1>
          <p className="text-gray-500">IATF 16949:2016 - Select Industry Context</p>
        </div>
        <Car className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link 
            key={industry.name} 
            href={industry.path}
            className={`block group relative bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${industry.recommended ? 'border-red-200 ring-1 ring-red-100' : 'border-gray-200'}`}
          >
            {industry.recommended && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                Recommended
              </span>
            )}
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${industry.recommended ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
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
