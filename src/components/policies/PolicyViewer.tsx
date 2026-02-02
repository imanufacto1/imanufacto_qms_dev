"use client";

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, FileText, Filter, LayoutGrid, List, Plus, Pencil, X, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PolicyCategory = "Manual" | "Policy" | "Plan" | "SOP" | "Work Instruction" | "Scenario";

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

export default function PolicyViewer({ title, description, documents: initialDocuments }: PolicyViewerProps) {
  // Initialize state with props
  const [documents, setDocuments] = useState<PolicyDocument[]>(initialDocuments);
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDocs, setExpandedDocs] = useState<Set<string>>(new Set());
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<Partial<PolicyDocument>>({
    category: "Manual",
    title: "",
    description: "",
    content: ""
  });

  // Update state when props change (optional, but good if parent re-fetches)
  useEffect(() => {
    setDocuments(initialDocuments);
  }, [initialDocuments]);

  const categories: (PolicyCategory | "All")[] = ["All", "Manual", "Policy", "Plan", "SOP", "Work Instruction", "Scenario"];
  const docCategories: PolicyCategory[] = ["Manual", "Policy", "Plan", "SOP", "Work Instruction", "Scenario"];

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

  const handleAddClick = () => {
    setCurrentDoc({
      category: activeCategory === "All" ? "Policy" : activeCategory,
      title: "",
      description: "",
      content: ""
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (doc: PolicyDocument) => {
    setCurrentDoc({ ...doc });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Are you sure you want to delete this document?")) {
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentDoc.title || !currentDoc.content || !currentDoc.category) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isEditing && currentDoc.id) {
      // Update existing
      setDocuments(prev => prev.map(d => d.id === currentDoc.id ? currentDoc as PolicyDocument : d));
    } else {
      // Add new
      const newDoc: PolicyDocument = {
        ...currentDoc as PolicyDocument,
        id: Math.random().toString(36).substr(2, 9),
        icon: FileText // Default icon
      };
      setDocuments(prev => [newDoc, ...prev]);
    }
    setIsModalOpen(false);
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
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
        <div className="flex gap-2">
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
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            Add New
          </button>
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
            const Icon = doc.icon || FileText;
            const isExpanded = expandedDocs.has(doc.id);

            return (
              <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md">
                <div 
                  className="p-6 border-b border-gray-100 flex items-start gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(doc.id)}
                >
                  <div className={cn("p-2 rounded-lg flex-shrink-0", getCategoryColor(doc.category).split(' ')[0])}>
                    <Icon className={cn("h-6 w-6", getCategoryColor(doc.category).split(' ')[1])} />
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditClick(doc); }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="Edit Document"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                     <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(doc.id); }}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete Document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="p-6 bg-gray-50/50 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="prose prose-sm max-w-none text-gray-600">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{doc.content}</pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditing ? "Edit Document" : "Add New Document"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentDoc.category}
                    onChange={(e) => setCurrentDoc({...currentDoc, category: e.target.value as PolicyCategory})}
                  >
                    {docCategories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Quality Policy"
                    value={currentDoc.title}
                    onChange={(e) => setCurrentDoc({...currentDoc, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <input 
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Short summary of the document"
                  value={currentDoc.description}
                  onChange={(e) => setCurrentDoc({...currentDoc, description: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Content</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px] font-mono text-sm"
                  placeholder="Full document content..."
                  value={currentDoc.content}
                  onChange={(e) => setCurrentDoc({...currentDoc, content: e.target.value})}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Save className="h-4 w-4" />
                Save Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
