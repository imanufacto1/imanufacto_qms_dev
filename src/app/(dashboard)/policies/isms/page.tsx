import React from 'react';
import { Lock, Cpu, Server, Wifi, Globe } from 'lucide-react';
import Link from 'next/link';

const industries = [
  {
    name: "Information Technology",
    icon: Cpu,
    description: "Software companies, MSPs, data centers.",
    path: "/policies/isms/it",
    recommended: true
  },
  {
    name: "Finance & Banking",
    icon: Server,
    description: "Banks, insurance, fintech (PCI-DSS overlap).",
    path: "#"
  },
  {
    name: "Telecom",
    icon: Wifi,
    description: "ISPs, mobile network operators.",
    path: "#"
  },
  {
    name: "E-Commerce",
    icon: Globe,
    description: "Online retail, payment gateways.",
    path: "#"
  }
];

export default function PoliciesISMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">ISMS Policies & Procedures</h1>
          <p className="text-gray-500">ISO 27001:2022 - Select Industry Context</p>
        </div>
        <Lock className="h-8 w-8 text-gray-400" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link 
            key={industry.name} 
            href={industry.path}
            className={`block group relative bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${industry.recommended ? 'border-purple-200 ring-1 ring-purple-100' : 'border-gray-200'}`}
          >
            {industry.recommended && (
              <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                Recommended
              </span>
            )}
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${industry.recommended ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'}`}>
                <industry.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
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
