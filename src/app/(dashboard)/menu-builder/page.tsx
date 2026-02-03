"use client";

import React from "react";
import { navigation, MenuItem, MenuGroup } from "@/config/menu";
import { ChevronRight, ChevronDown, Folder, File, GripVertical } from "lucide-react";

export default function MenuBuilderPage() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.items && item.items.length > 0;
    const isExpanded = expanded[item.name];

    return (
      <div key={item.name} className="ml-6 border-l border-gray-200 pl-4 py-2">
        <div className="flex items-center gap-2 group">
          <GripVertical className="h-4 w-4 text-gray-300 cursor-move opacity-0 group-hover:opacity-100" />
          {hasChildren ? (
            <button onClick={() => toggle(item.name)} className="p-0.5 hover:bg-gray-100 rounded">
              {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-500" /> : <ChevronRight className="h-4 w-4 text-gray-500" />}
            </button>
          ) : (
             <div className="w-5" /> 
          )}
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-md shadow-sm min-w-[300px]">
            {item.icon ? <item.icon className="h-4 w-4 text-blue-500" /> : <File className="h-4 w-4 text-gray-400" />}
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
            <span className="text-xs text-gray-400 ml-auto font-mono">{item.href}</span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.items?.map(sub => renderItem(sub, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderGroup = (group: MenuGroup) => {
    const isExpanded = expanded[group.name] ?? true; // Default groups open

    return (
      <div key={group.name} className="mb-6">
        <div className="flex items-center gap-2 mb-2">
           <button onClick={() => toggle(group.name)} className="p-0.5 hover:bg-gray-100 rounded">
              {isExpanded ? <ChevronDown className="h-5 w-5 text-gray-600" /> : <ChevronRight className="h-5 w-5 text-gray-600" />}
           </button>
           <Folder className="h-5 w-5 text-yellow-500" />
           <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
        </div>
        
        {isExpanded && (
          <div className="pl-2">
            {group.items.map(item => renderItem(item))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Menu Builder</h1>
        <p className="mt-1 text-sm text-gray-500">
          Visualize and manage application navigation structure. 
          (Read-only view of current configuration)
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        {navigation.map(group => renderGroup(group))}
      </div>
    </div>
  );
}
