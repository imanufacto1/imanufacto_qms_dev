"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Factory, 
  FileText, 
  Files, 
  Building2,
  Grid,
  Settings,
  Users,
  Hammer,
  ChevronDown,
  ChevronRight,
  Workflow,
  Menu,
  BarChart,
  Bell,
  Code,
  Printer,
  Clock,
  Shield,
  FileCode,
  Languages,
  Activity,
  Mail,
  CreditCard,
  Palette,
  ClipboardCheck,
  HardHat,
  Utensils,
  Lock,
  Car,
  Award
} from "lucide-react";

// Define navigation structure with groups
const navigation = [
  {
    name: "Main", // Optional grouping name, can be hidden
    defaultOpen: true,
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ]
  },
  {
    name: "Administration",
    defaultOpen: false,
    items: [
      { name: "Organization", href: "/organization", icon: Building2 },
      { name: "Department", href: "/department", icon: Grid },
      { name: "Master Builder", href: "/master-builder", icon: Hammer },
      { name: "Form Builder", href: "/form-builder", icon: FileText },
      { name: "Workflow Builder", href: "/workflow-builder", icon: Workflow },
      { name: "Workflow Master", href: "/workflow-master", icon: Workflow },
      { name: "Menu Builder", href: "/menu-builder", icon: Menu },
      { name: "Report Builder", href: "/report-builder", icon: BarChart },
      { name: "Notification Builder", href: "/notification-builder", icon: Bell },
      { name: "Dashboard Builder", href: "/dashboard-builder", icon: LayoutDashboard },
      { name: "Script Builder", href: "/script-builder", icon: Code },
      { name: "Print Builder", href: "/print-builder", icon: Printer },
      { name: "Reminder Builder", href: "/reminder-builder", icon: Clock },
      { name: "Script Scheduler", href: "/script-scheduler", icon: Clock },
      { name: "Roles", href: "/roles", icon: Shield },
      { name: "Users", href: "/users", icon: Users },
      { name: "About Templates", href: "/about-templates", icon: FileCode },
      { name: "Languages", href: "/languages", icon: Languages },
      { name: "Audit Logs", href: "/audit-logs", icon: Activity },
      { name: "Mail Logs", href: "/mail-logs", icon: Mail },
      { name: "Subscription", href: "/subscription", icon: CreditCard },
      { name: "Visual Settings", href: "/visual-settings", icon: Palette },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  },
  {
    name: "IMS",
    defaultOpen: false,
    items: [
      { name: "QMS", href: "/qms", icon: ClipboardCheck },
      { name: "HSE", href: "/hse", icon: HardHat },
      { name: "FSMS", href: "/fsms", icon: Utensils },
      { name: "ISMS", href: "/isms", icon: Lock },
      { name: "IATF", href: "/iatf", icon: Car },
      { name: "VDA", href: "/vda", icon: Award },
    ]
  },
  {
    name: "Modules", // Example other group
    defaultOpen: false,
    items: [
       { name: "Plants", href: "/plants", icon: Factory },
       { name: "Documents", href: "/documents", icon: Files },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();
  
  // State to track expanded groups
  // Initialize with all groups expanded by default
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    navigation.forEach(group => {
      // Auto-expand if the group contains the active route
      const hasActiveItem = group.items.some(item => item.href === pathname);
      initialState[group.name] = hasActiveItem || (group.defaultOpen ?? false);
    });
    return initialState;
  });

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
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
            
            {/* 
              Always show Main group items without collapse logic if preferred, 
              but here we treat "Main" as a hidden header group that is always "expanded" implicitly 
              or we can apply the same logic. 
              Let's apply logic but hide header for "Main".
            */}
            <div className={cn(
              "space-y-1 transition-all duration-200 ease-in-out",
              group.name !== "Main" && !expandedGroups[group.name] ? "hidden" : "block",
              group.name !== "Main" && "mt-1"
            )}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-r-full mr-4 transition-colors",
                      isActive
                        ? "bg-[#e8f0fe] text-[#1967d2]" // Gmail-like active state
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-4 w-4 flex-shrink-0", // Slightly smaller icons for dense list
                        isActive ? "text-[#1967d2]" : "text-gray-500 group-hover:text-gray-500"
                      )}
                      aria-hidden="true"
                    />
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
