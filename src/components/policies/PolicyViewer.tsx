"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, FileText, Filter, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PolicyCategory = "Policy" | "Plan" | "SOP" | "Work Instruction" | "Scenario";

export interface PolicyDocument {
  id: string;
  category: PolicyCategory;
  title: string;
  description: string;
  content: string;
  icon?: React.ElementType;
}

interface PolicyViewerProps {
  title: string;
  description: string;
  documents: PolicyDocument[];
}

export default function PolicyViewer({ title, description, documents }: PolicyViewerProps) {
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());

  const categories: (PolicyCategory | "All")[] = ["All", "Policy", "Plan", "SOP", "Work Instruction", "Scenario"];

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = activeCategory === "All" || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedDocs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDocs(newExpanded);
  };

  const getCategoryColor = (category: PolicyCategory) => {
    switch (category) {
      case "Policy": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Plan": return "bg-purple-100 text-purple-700 border-purple-200";
      case "SOP": return "bg-green-100 text-green-700 border-green-200";
      case "Work Instruction": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Scenario": return "bg-rose-100 text-rose-700 border-rose-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap",
              activeCategory === cat
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Filter className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p>No documents found matching your criteria.</p>
          </div>
        ) : (
          filteredDocuments.map((doc) => {
            const isExpanded = expandedDocs.has(doc.id);
            const Icon = doc.icon || FileText;
            
            return (
              <div 
                key={doc.id} 
                className={cn(
                  "bg-white rounded-lg border transition-all duration-200 overflow-hidden",
                  isExpanded ? "shadow-md ring-1 ring-gray-200" : "shadow-sm border-gray-200 hover:border-gray-300"
                )}
              >
                <div 
                  className="p-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => toggleExpand(doc.id)}
                >
                  <div className={cn("p-2 rounded-lg mt-1", getCategoryColor(doc.category).split(' ')[0])}>
                    <Icon className={cn("h-5 w-5", getCategoryColor(doc.category).split(' ')[1])} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide", getCategoryColor(doc.category))}>
                        {doc.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{doc.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{doc.description}</p>
                  </div>

                  <button 
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 bg-gray-50/30 border-t border-gray-100">
                     <div className="prose prose-sm max-w-none text-gray-700">
                        <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm font-mono text-xs md:text-sm whitespace-pre-wrap leading-relaxed">
                          {doc.content}
                        </div>
                     </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
