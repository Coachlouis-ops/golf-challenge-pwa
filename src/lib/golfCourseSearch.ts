export type GolfCourseCandidate = {
  placeId: string;
  name: string;
  description: string;
  secondaryText: string;
  stateProvince?: string;
  country?: string;
  types?: string[];
};

export const GOLF_COURSE_RESULT_CAP = 15;

export function normalizePlaceId(placeId: string): string {
  return placeId.replace(/^places\//, "").trim();
}

export function isGolfRelatedCourse(course: {
  name: string;
  types?: string[];
}): boolean {
  const types = course.types ?? [];
  if (types.includes("golf_course") || types.includes("country_club")) {
    return true;
  }

  const name = course.name.toLowerCase();
  return (
    name.includes("golf") ||
    name.includes("country club") ||
    (name.includes("estate") && name.includes("golf"))
  );
}

export function mergeGolfCourseResults(
  customCourses: GolfCourseCandidate[],
  googleCourses: GolfCourseCandidate[]
): GolfCourseCandidate[] {
  const seen = new Set<string>();
  const merged: GolfCourseCandidate[] = [];

  for (const course of [...customCourses, ...googleCourses]) {
    const placeId = normalizePlaceId(course.placeId);
    if (!placeId || seen.has(placeId)) continue;

    if (!placeId.startsWith("teez-") && !isGolfRelatedCourse(course)) {
      continue;
    }

    seen.add(placeId);
    merged.push({ ...course, placeId });

    if (merged.length >= GOLF_COURSE_RESULT_CAP) break;
  }

  return merged;
}
