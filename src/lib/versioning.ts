export interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
  semver: string;
  bumpType: 'major' | 'minor' | 'patch' | null;
}

export function calculateNewVersion(
  newData: Record<string, unknown>,
  existingData: Record<string, unknown>
): VersionInfo {
  const majorKeys = ['reportName', 'reportCode', 'reportType', 'status', 'schedulerStatus'];
  const minorKeys = ['pageSetup', 'dataSettings'];
  const patchKeys = ['templateContent', 'headerContent', 'footerContent', 'localScripts', 'serverScript', 'excelTemplate'];

  let bump: 'major' | 'minor' | 'patch' | null = null;

  for (const k of majorKeys) {
    if (k in newData && JSON.stringify(newData[k]) !== JSON.stringify(existingData[k])) {
      bump = 'major';
      break;
    }
  }

  if (!bump) {
    for (const k of minorKeys) {
      if (k in newData && JSON.stringify(newData[k]) !== JSON.stringify(existingData[k])) {
        bump = 'minor';
        break;
      }
    }
  }

  if (!bump) {
    for (const k of patchKeys) {
      if (k in newData && JSON.stringify(newData[k]) !== JSON.stringify(existingData[k])) {
        bump = 'patch';
        break;
      }
    }
  }

  const versionMajorExisting = (existingData['versionMajor'] as number) ?? 0;
  const versionMinorExisting = (existingData['versionMinor'] as number) ?? 0;
  const versionPatchExisting = (existingData['versionPatch'] as number) ?? 0;

  let versionMajor = versionMajorExisting;
  let versionMinor = versionMinorExisting;
  let versionPatch = versionPatchExisting;

  if (bump === 'major') {
    versionMajor += 1;
    versionMinor = 0;
    versionPatch = 0;
  } else if (bump === 'minor') {
    versionMinor += 1;
    versionPatch = 0;
  } else if (bump === 'patch') {
    versionPatch += 1;
  }

  const versionSemver = `${versionMajor}.${versionMinor}.${versionPatch}`;

  return {
    major: versionMajor,
    minor: versionMinor,
    patch: versionPatch,
    semver: versionSemver,
    bumpType: bump
  };
}
