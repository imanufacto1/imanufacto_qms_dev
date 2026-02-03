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
  Award,
  FileCheck,
  AlertTriangle,
  Target,
  Users2,
  BookOpen,
  Zap,
  Siren,
  Flame,
  ShieldAlert,
  Database,
  Server,
  LucideIcon
} from "lucide-react";

export interface MenuItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  items?: MenuItem[]; // For sub-items (level 3)
}

export interface MenuGroup {
  name: string;
  defaultOpen?: boolean;
  items: MenuItem[];
}

export const navigation: MenuGroup[] = [
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
      { name: "Plants", href: "/plants", icon: Factory },
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
      { name: "QMS", href: "/policies/qms", icon: ClipboardCheck },
      { name: "HSE", href: "/policies/hse", icon: HardHat },
      { name: "FSMS", href: "/policies/fsms", icon: Utensils },
      { name: "ISMS", href: "/policies/isms", icon: Lock },
      { name: "IATF", href: "/policies/iatf", icon: Car },
      { name: "VDA", href: "/policies/vda", icon: Award },
    ]
  },
  {
    name: "Masters",
    defaultOpen: false,
    items: [
      { name: "QMS", href: "/masters/qms", icon: ClipboardCheck },
      { name: "HSE", href: "/masters/hse", icon: HardHat },
      { name: "FSMS", href: "/masters/fsms", icon: Utensils },
      { name: "ISMS", href: "/masters/isms", icon: Lock },
      { name: "IATF", href: "/masters/iatf", icon: Car },
      { name: "VDA", href: "/masters/vda", icon: Award },
    ]
  },
  {
    name: "Reports",
    defaultOpen: false,
    items: [
      { 
        name: "QMS", 
        href: "/reports/qms", 
        icon: ClipboardCheck,
        items: [
          { name: "Objective", href: "/reports/view/OBJECTIVE", icon: Target },
          { name: "Non Conformance", href: "/reports/view/NON_CONFORMANCE", icon: AlertTriangle },
          { name: "Documents", href: "/reports/view/DOCUMENTS", icon: Files },
          { name: "Supplier", href: "/reports/view/SUPPLIER", icon: Users2 },
          { name: "Risk And Opportunity", href: "/reports/view/RISK_AND_OPPORTUNITY", icon: Activity },
          { name: "KPI Report", href: "/reports/view/KPI_REPORT", icon: BarChart },
          { name: "Training", href: "/reports/view/TRAINING", icon: BookOpen },
        ]
      },
      { 
        name: "HSE", 
        href: "/reports/hse", 
        icon: HardHat,
        items: [
          { name: "New emergency plans generated/ prepared", href: "/reports/view/NEW_EMERGENCY_PLANS_GENERATED__PREPARED", icon: FileText },
          { name: "Emergency drills conducted in current month", href: "/reports/view/EMERGENCY_DRILLS_CONDUCTED_IN_CURRENT_MONTH", icon: Zap },
          { name: "Hazard and Risk by Status", href: "/reports/view/HAZARD_AND_RISK_BY_STATUS", icon: AlertTriangle },
          { name: "Hazard and Risk Identified by month", href: "/reports/view/HAZARD_AND_RISK_IDENTIFIED_BY_MONTH", icon: Clock },
          { name: "Hazard and Risk High/Medium", href: "/reports/view/HAZARD_AND_RISK_HIGH_MEDIUM", icon: Activity },
          { name: "Accident Incidents by status", href: "/reports/view/ACCIDENT_INCIDENTS_BY_STATUS", icon: Siren },
          { name: "Accident Incidents by Department", href: "/reports/view/ACCIDENT_INCIDENTS_BY_DEPARTMENT", icon: Grid },
          { name: "Accident Incidents by month", href: "/reports/view/ACCIDENT_INCIDENTS_BY_MONTH", icon: Clock },
          { name: "Accident Incidents in Current month", href: "/reports/view/ACCIDENT_INCIDENTS_IN_CURRENT_MONTH", icon: Flame },
        ]
      },
      { 
        name: "FSMS", 
        href: "/reports/fsms", 
        icon: Utensils,
        items: [
          { name: "CCP Monitoring Report", href: "/reports/view/CCP_MONITORING_REPORT", icon: Activity },
          { name: "Hygiene Inspection Report", href: "/reports/view/HYGIENE_INSPECTION_REPORT", icon: ClipboardCheck },
        ]
      },
      { 
        name: "ISMS", 
        href: "/reports/isms", 
        icon: Lock,
        items: [
          { name: "Information Security Risk", href: "/reports/view/INFORMATION_SECURITY_RISK", icon: ShieldAlert },
          { name: "ISMS Asset", href: "/reports/view/ISMS_ASSET", icon: Database },
          { name: "ISMS Incident", href: "/reports/view/ISMS_INCIDENT", icon: Siren },
          { name: "Statement of Applicability", href: "/reports/view/STATEMENT_OF_APPLICABILITY", icon: FileCheck },
          { name: "Business Continuity Program", href: "/reports/view/BUSINESS_CONTINUITY_PROGRAM", icon: Server },
        ]
      },
      { 
        name: "IATF", 
        href: "/reports/iatf", 
        icon: Car,
        items: [
          { name: "Process FMEA Report", href: "/reports/view/PROCESS_FMEA_REPORT", icon: AlertTriangle },
          { name: "Control Plan Status", href: "/reports/view/CONTROL_PLAN_STATUS", icon: FileCheck },
        ]
      },
      { 
        name: "VDA", 
        href: "/reports/vda", 
        icon: Award,
        items: [
          { name: "VDA 6.3 Process Audit", href: "/reports/view/VDA_6_3_PROCESS_AUDIT", icon: ClipboardCheck },
        ]
      },
    ]
  },
  {
    name: "Manuals",
    defaultOpen: false,
    items: [
      { name: "QMS", href: "/manuals/qms", icon: ClipboardCheck },
      { name: "HSE", href: "/manuals/hse", icon: HardHat },
      { name: "FSMS", href: "/manuals/fsms", icon: Utensils },
      { name: "ISMS", href: "/manuals/isms", icon: Lock },
      { name: "IATF", href: "/manuals/iatf", icon: Car },
      { name: "VDA", href: "/manuals/vda", icon: Award },
    ]
  },
  {
    name: "Policies",
    defaultOpen: false,
    items: [
      { name: "QMS", href: "/policies/qms", icon: ClipboardCheck },
      { name: "HSE", href: "/policies/hse", icon: HardHat },
      { name: "FSMS", href: "/policies/fsms", icon: Utensils },
      { name: "ISMS", href: "/policies/isms", icon: Lock },
      { name: "IATF", href: "/policies/iatf", icon: Car },
      { name: "VDA", href: "/policies/vda", icon: Award },
    ]
  },
  {
    name: "Modules", // Example other group
    defaultOpen: false,
    items: [
       { name: "Documents", href: "/documents", icon: Files },
    ]
  }
];
