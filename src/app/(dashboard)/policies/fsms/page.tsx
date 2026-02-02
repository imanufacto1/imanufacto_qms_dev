import React from 'react';
import { Utensils, Coffee, Truck, Building, Wheat } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    name: "Hospitality & Catering",
    icon: Coffee,
    description: "Hotels, restaurants, cafes, institutional catering.",
    path: "/policies/fsms/hospitality",
    recommended: true
  },
  {
    name: "Food Manufacturing",
    icon: Wheat,
    description: "Processing plants, bakeries, beverage manufacturers.",
    path: "#"
  },
  {
    name: "Food Logistics",
    icon: Truck,
    description: "Cold chain transport, warehousing, distribution.",
    path: "#"
  },
  {
    name: "Retail",
    icon: Building,
    description: "Supermarkets, grocery stores, convenience stores.",
    path: "#"
  }
];

export default function PoliciesFSMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">FSMS Policies & Procedures</h1>
          <p className="text-gray-500">ISO 22000:2018 - Select Industry Context</p>
        </div>
        <Utensils className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link 
            key={industry.name} 
            href={industry.path}
            className={`block group relative bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${industry.recommended ? 'border-orange-200 ring-1 ring-orange-100' : 'border-gray-200'}`}
          >
            {industry.recommended && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                Recommended
              </span>
            )}
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${industry.recommended ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
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
