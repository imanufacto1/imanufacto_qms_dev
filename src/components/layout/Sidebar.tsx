"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Factory, 
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { navigation } from "@/config/menu";

export function Sidebar() {
  const pathname = usePathname();
  
  // State to track expanded groups
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    navigation.forEach(group => {
      // Check if any item or sub-item is active
      const hasActiveItem = group.items.some(item => 
        item.href === pathname || item.items?.some(sub => sub.href === pathname)
      );
      initialState[group.name] = hasActiveItem || (group.defaultOpen ?? false);
    });
    return initialState;
  });

  // State to track expanded items (level 2)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    navigation.forEach(group => {
      group.items.forEach(item => {
        if (item.items) {
          const hasActiveSubItem = item.items.some(sub => sub.href === pathname);
          if (hasActiveSubItem) {
            initialState[item.name] = true;
          }
        }
      });
    });
    return initialState;
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const toggleItem = (itemName: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <div className="flex h-full w-64 flex-col bg-gray-50 border-r border-gray-200">
      <div className="flex h-16 items-center px-6 border-b border-gray-200 bg-white flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f0fe] group-hover:bg-[#d2e3fc] transition-colors">
            <Factory className="h-5 w-5 text-[#1967d2]" />
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-[#1967d2] transition-colors">imanufacto</span>
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {navigation.map((group, groupIndex) => (
          <div key={group.name} className={cn("mb-2", groupIndex === 0 && "mb-4")}>
            {group.name !== "Main" && (
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-100 rounded-md transition-colors"
              >
                <span>{group.name}</span>
                {expandedGroups[group.name] ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}
            
            <div className={cn(
              "space-y-1 transition-all duration-200 ease-in-out",
              group.name !== "Main" && !expandedGroups[group.name] ? "hidden" : "block",
              group.name !== "Main" && "mt-1"
            )}>
              {group.items.map((item) => {
                const hasSubItems = item.items && item.items.length > 0;
                const isExpanded = expandedItems[item.name];
                // Active if direct match OR if sub-item matches OR if parent of active sub-item
                const isExactActive = pathname === item.href;
                const hasActiveChild = item.items?.some(sub => sub.href === pathname);
                const isActive = isExactActive || hasActiveChild;

                if (hasSubItems) {
                  return (
                    <div key={item.name}>
                      <button
                        onClick={() => toggleItem(item.name)}
                        className={cn(
                          "w-full group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-r-full mr-4 transition-colors",
                          isActive
                            ? "bg-[#e8f0fe] text-[#1967d2]"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center">
                          {item.icon && (
                            <item.icon
                              className={cn(
                                "mr-3 h-4 w-4 flex-shrink-0",
                                isActive ? "text-[#1967d2]" : "text-gray-500 group-hover:text-gray-500"
                              )}
                              aria-hidden="true"
                            />
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className={cn("h-3 w-3", isActive ? "text-[#1967d2]" : "text-gray-400")} />
                        ) : (
                          <ChevronRight className={cn("h-3 w-3", isActive ? "text-[#1967d2]" : "text-gray-400")} />
                        )}
                      </button>
                      
                      {/* Sub-items */}
                      {isExpanded && (
                        <div className="mt-1 space-y-1">
                          {item.items?.map((subItem) => {
                             const isSubActive = pathname === subItem.href;
                             return (
                               <Link
                                 key={subItem.name}
                                 href={subItem.href}
                                 className={cn(
                                   "group flex items-center pl-11 pr-3 py-2 text-sm font-medium rounded-r-full mr-4 transition-colors",
                                   isSubActive
                                     ? "text-[#1967d2] bg-blue-50"
                                     : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                 )}
                               >
                                 {subItem.icon && (
                                   <subItem.icon
                                     className={cn(
                                       "mr-3 h-3.5 w-3.5 flex-shrink-0",
                                       isSubActive ? "text-[#1967d2]" : "text-gray-400 group-hover:text-gray-500"
                                     )}
                                     aria-hidden="true"
                                   />
                                 )}
                                 <span className="truncate text-[13px]">{subItem.name}</span>
                               </Link>
                             );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-r-full mr-4 transition-colors",
                      isActive
                        ? "bg-[#e8f0fe] text-[#1967d2]"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {item.icon && (
                      <item.icon
                        className={cn(
                          "mr-3 h-4 w-4 flex-shrink-0",
                          isActive ? "text-[#1967d2]" : "text-gray-500 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
