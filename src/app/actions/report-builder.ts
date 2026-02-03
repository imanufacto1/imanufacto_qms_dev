'use server'

import { db } from '@/db';
import { reports } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { calculateNewVersion } from '@/lib/versioning';
import { getCurrentUserIdentity } from '@/app/actions/auth';

export async function getReports() {
  try {
    const result = await db.select()
      .from(reports)
      .where(eq(reports.isCurrent, true))
      .orderBy(desc(reports.createdAt));
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return { success: false, error: 'Failed to fetch reports' };
  }
}

export async function getReportById(id: string) {
  try {
    const result = await db.select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);
    
    if (result.length === 0) {
      return { success: false, error: 'Report not found' };
    }

    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Failed to fetch report:', error);
    return { success: false, error: 'Failed to fetch report' };
  }
}

export async function getReportByCode(code: string) {
  try {
    const result = await db.select()
      .from(reports)
      .where(
        eq(reports.reportCode, code)
      )
      .limit(1);
    
    // If no exact match, try case insensitive or partial if needed, 
    // but for now strict code match is best for security/correctness.
    
    if (result.length === 0) {
      return { success: false, error: 'Report not found' };
    }

    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Failed to fetch report by code:', error);
    return { success: false, error: 'Failed to fetch report' };
  }
}

interface DbError {
  code: string;
  constraint_name?: string;
}

interface ReportInput {
  reportName: string;
  reportCode: string;
  reportType?: string;
  status?: string;
  schedulerStatus?: string;
  templateContent?: string;
  headerContent?: string;
  footerContent?: string;
  pageSetup?: unknown;
  localScripts?: string;
  dataSettings?: unknown;
  serverScript?: string;
  excelTemplate?: string;
  lastModifiedBy?: string;
}

export async function createReport(data: ReportInput) {
  try {
    const modifiedBy = await getCurrentUserIdentity();
    await db.insert(reports).values({
      ...data,
      isCurrent: true,
      version: 1,
      versionMajor: 0,
      versionMinor: 0,
      versionPatch: 0,
      versionSemver: '0.0.0',
      lastModifiedAt: new Date(),
      lastModifiedBy: modifiedBy ?? 'system',
    });
    revalidatePath('/report-builder');
    return { success: true };
  } catch (error: unknown) {
    console.error('Failed to create report:', error);
    const err = error as DbError;
    if (err.code === '23505') { // Unique violation
      return { success: false, error: 'Report code must be unique.' };
    }
    return { success: false, error: 'Failed to create report' };
  }
}

export async function updateReport(id: string, data: Partial<ReportInput>) {
  try {
    const existingResult = await db.select().from(reports).where(eq(reports.id, id)).limit(1);
    if (existingResult.length === 0) {
      return { success: false, error: 'Report not found' };
    }
    const existing = existingResult[0] as Record<string, unknown>;

    const { major, minor, patch, semver } = calculateNewVersion(data as Record<string, unknown>, existing);

    const modifiedBy = await getCurrentUserIdentity();
    await db.update(reports)
      .set({
        ...data,
        lastModifiedAt: new Date(),
        lastModifiedBy: modifiedBy ?? 'system',
        versionMajor: major,
        versionMinor: minor,
        versionPatch: patch,
        versionSemver: semver,
      })
      .where(eq(reports.id, id));

    revalidatePath('/report-builder');
    revalidatePath(`/report-builder/${id}`);
    return { success: true };
  } catch (error: unknown) {
    console.error('Failed to update report:', error);
    const err = error as DbError;
    if (err.code === '23505') {
       return { success: false, error: 'Report code must be unique.' };
    }
    return { success: false, error: 'Failed to update report' };
  }
}

export async function deleteReport(id: string) {
  try {
    await db.update(reports)
      .set({
        isCurrent: false,
        validTo: new Date(),
        status: 'Inactive'
      })
      .where(eq(reports.id, id));
      
    revalidatePath('/report-builder');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete report:', error);
    return { success: false, error: 'Failed to delete report' };
  }
}
