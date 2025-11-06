import { Activity } from "@/types/course";

const STORAGE_PREFIX = "ficsae_calculator_";

export interface StoredCourseData {
  activities: Activity[];
  lastUpdated: string;
}

export function saveCourseData(
  programId: string,
  semester: number,
  courseId: string,
  activities: Activity[]
): void {
  const key = `${STORAGE_PREFIX}${programId}_${semester}_${courseId}`;
  const data: StoredCourseData = {
    activities,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadCourseData(
  programId: string,
  semester: number,
  courseId: string
): Activity[] | null {
  const key = `${STORAGE_PREFIX}${programId}_${semester}_${courseId}`;
  const stored = localStorage.getItem(key);
  
  if (!stored) return null;
  
  try {
    const data: StoredCourseData = JSON.parse(stored);
    return data.activities;
  } catch {
    return null;
  }
}

export function clearCourseData(
  programId: string,
  semester: number,
  courseId: string
): void {
  const key = `${STORAGE_PREFIX}${programId}_${semester}_${courseId}`;
  localStorage.removeItem(key);
}
