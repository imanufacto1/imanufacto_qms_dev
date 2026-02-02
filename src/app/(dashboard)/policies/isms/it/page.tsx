"use client";

import React from 'react';
import { Shield, Key, Eye, Lock, FileCode, Server, Wifi, Smartphone, HardDrive, UserMinus, Globe } from 'lucide-react';
import PolicyViewer, { PolicyDocument } from '@/components/policies/PolicyViewer';

const documents: PolicyDocument[] = [
  // --- POLICIES ---
  {
    id: "isms-pol-01",
    category: "Policy",
    title: "Information Security Policy",
    description: "Protection of confidentiality, integrity, and availability of information.",
    content: `1. Objective
To protect the organization's information assets from all threats, whether internal or external, deliberate or accidental.

2. Scope
Applies to all employees, contractors, and third parties accessing the network.

3. Principles (CIA Triad)
- Confidentiality: Info is accessible only to authorized users.
- Integrity: Info is accurate and complete.
- Availability: Info is accessible when needed.

4. Roles
- CISO: Responsible for ISMS strategy.
- Employees: Responsible for complying with policies.`,
    icon: Shield
  },
  {
    id: "isms-pol-02",
    category: "Policy",
    title: "Acceptable Use Policy (AUP)",
    description: "Rules for using company IT resources.",
    content: `1. General Use
- Systems are for business use. Occasional personal use is permitted if it doesn't interfere with work.

2. Prohibited Activities
- Accessing illegal/offensive content.
- Installing unauthorized software (Shadow IT).
- Sharing passwords.
- Connecting unauthorized devices to the network.

3. Email & Internet
- Do not open suspicious attachments.
- No massive file downloads (torrenting) on company VPN.`,
    icon: Globe
  },
  {
    id: "isms-pol-03",
    category: "Policy",
    title: "BYOD Policy",
    description: "Bring Your Own Device security requirements.",
    content: `1. Approval
- Devices must be registered with IT.
- MDM (Mobile Device Management) agent must be installed.

2. Security Requirements
- Device must have a 6-digit PIN or Biometric lock.
- Storage must be encrypted.
- OS must be up-to-date (no jailbreaking/rooting).

3. Lost/Stolen
- Report immediately.
- Remote wipe of company data will be initiated.`,
    icon: Smartphone
  },

  // --- PLANS ---
  {
    id: "isms-plan-01",
    category: "Plan",
    title: "Disaster Recovery Plan (DRP)",
    description: "Strategy for recovering data and infrastructure after a disaster.",
    content: `1. Scope
Critical systems: ERP, Email Server, Customer Database.

2. Recovery Objectives
- RTO (Recovery Time Objective): 4 hours.
- RPO (Recovery Point Objective): 1 hour.

3. Strategy
- Primary Site: HQ Server Room.
- DR Site: Cloud (AWS Region B).
- Backups: Hourly snapshots to S3 (Immutable).

4. Activation
- Declared by CTO when outage > 2 hours.
- DR Team assembles on "Emergency Bridge Call".`,
    icon: Server
  },

  // --- SOPs ---
  {
    id: "isms-sop-01",
    category: "SOP",
    title: "Access Control (Onboarding/Offboarding)",
    description: "Procedures for granting and revoking system access.",
    content: `1. New Hire (Onboarding)
- HR sends ticket to IT 3 days prior.
- IT creates AD account based on "Role Matrix".
- Manager approves specific folder access.
- User signs AUP before receiving credentials.

2. Termination (Offboarding)
- HR notifies IT immediately (or scheduled date).
- IT disables AD account at 5:00 PM on last day (or immediately for hostile exit).
- Revoke VPN, Cloud access, Building pass.
- Remote wipe mobile device.

3. Review
- Quarterly Access Review by Data Owners.`,
    icon: Key
  },
  {
    id: "isms-sop-02",
    category: "SOP",
    title: "Incident Management",
    description: "Handling security incidents from detection to closure.",
    content: `1. Triage
- Priority 1: Critical (Data Breach, Ransomware).
- Priority 2: High (Virus outbreak).
- Priority 3: Low (Phishing attempt).

2. Response Steps (PICERL)
- Preparation: Tools ready.
- Identification: Detect & Verify.
- Containment: Isolate system (disconnect LAN).
- Eradication: Remove malware/vulnerability.
- Recovery: Restore from backup.
- Lessons Learned: Post-incident report.`,
    icon: Eye
  },
  {
    id: "isms-sop-03",
    category: "SOP",
    title: "Change Management",
    description: "Controlling changes to IT infrastructure.",
    content: `1. Request
- Submit RFC (Request for Change) in ticketing system.
- Include: Rollback plan, Risk assessment.

2. Approval
- CAB (Change Advisory Board) meets weekly.
- Emergency changes require CTO approval.

3. Implementation
- Schedule during maintenance window (Sunday 2 AM).
- Test in Staging first.

4. Review
- Post-implementation verification.`,
    icon: FileCode
  },

  // --- WORK INSTRUCTIONS ---
  {
    id: "isms-wi-01",
    category: "Work Instruction",
    title: "Phishing Email Handling",
    description: "Steps for IT Service Desk to analyze suspicious emails.",
    content: `1. Receive Report
- User forwards email to "spam@company.com".

2. Analyze
- Check sender domain (look for typos).
- Check headers (SPF/DKIM pass?).
- Hover over links (do not click) -> use URL sandbox to test.
- Check attachments in sandbox.

3. Action
- If Malicious:
  - Block sender domain on Gateway.
  - Search Exchange for other recipients and "Purge".
  - Reply to user: "Confirmed Malicious - Good Catch".
- If Safe:
  - Reply to user: "False Positive".`,
    icon: UserMinus
  },
  {
    id: "isms-wi-02",
    category: "Work Instruction",
    title: "Backup Restoration Test",
    description: "Monthly verification of backup integrity.",
    content: `1. Select File
- Randomly pick a file from last week (e.g., "Finance_Report.xlsx").

2. Restore
- Open Backup Console.
- Navigate to Restore Point.
- Restore to "Test_Restore" folder (Do not overwrite original).

3. Verify
- Open file. Check content is readable.
- Compare hash with original (if possible).

4. Log
- Record result in "Backup Log".`,
    icon: HardDrive
  },

  // --- SCENARIOS ---
  {
    id: "isms-scn-01",
    category: "Scenario",
    title: "Scenario: Ransomware Attack",
    description: "Response to a crypto-locker infection on a user laptop.",
    content: `Situation:
User calls Helpdesk: "My files all have .ENCRYPTED extension and I see a ransom note."

Step 1: Containment (Immediate)
- Instruct user: "Unplug network cable and turn off WiFi immediately."
- IT disables user's AD account and VPN access.
- Isolate the network segment (VLAN) to prevent lateral movement.

Step 2: Analysis
- Laptop retrieved by Security Team.
- Analysis shows "LockBit" variant entered via phishing PDF.
- Check File Server logs: Did user write to shared drives?
  - Result: Yes, "Finance Share" shows encrypted files.

Step 3: Recovery
- Re-image Laptop (Do not pay ransom).
- Restore "Finance Share" from last night's immutable backup.
- Time lost: 4 hours of data.

Step 4: Notification
- Notify Legal and CISO (Potential Data Breach?).
- Logs show data was encrypted but not exfiltrated (no outbound traffic spike).

Step 5: Follow-up
- Force password reset for user.
- Enroll user in mandatory "Phishing Awareness Training".`,
    icon: Lock
  },
  {
    id: "isms-scn-02",
    category: "Scenario",
    title: "Scenario: Lost Laptop",
    description: "Handling a report of a stolen company device.",
    content: `Situation:
Sales Manager reports laptop stolen from car at 8 PM.

Step 1: Report
- User calls IT Emergency Line.

Step 2: Remote Action
- IT logs into MDM (Mobile Device Management) console.
- Status: Device is "Offline".
- Action: Send "Remote Wipe" command (will execute when device connects to internet).
- Action: Reset AD Password and revoke VPN certificate.

Step 3: Risk Assessment
- Was laptop encrypted? Yes (BitLocker active).
- Password strong? Yes (MFA required).
- Data risk: Low (Encrypted).

Step 4: Replacement
- Issue spare laptop to user next morning.
- Restore data from OneDrive cloud sync.

Step 5: Police Report
- User provides Police Report number for asset write-off.`,
    icon: Smartphone
  }
];

export default function ISMSITPage() {
  return (
    <PolicyViewer 
      title="IT ISMS (ISO 27001:2022)"
      description="Information Security Management System policies and procedures."
      documents={documents}
    />
  );
}
