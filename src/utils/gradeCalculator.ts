import { Activity } from "@/types/course";

const PASSING_GRADE = 7.0;

export interface GradeCalculation {
  currentAverage: number;
  requiredGrade: number;
  isPassing: boolean;
  isComplete: boolean;
}

export function calculateWeightedAverage(activities: Activity[]): number {
  const completedActivities = activities.filter((a) => a.grade !== undefined);
  
  if (completedActivities.length === 0) return 0;

  const totalWeight = completedActivities.reduce((sum, a) => sum + a.weight, 0);
  const weightedSum = completedActivities.reduce(
    (sum, a) => sum + (a.grade || 0) * a.weight,
    0
  );

  return totalWeight > 0 ? weightedSum / totalWeight : 0;
}

export function calculateRequiredGrade(activities: Activity[]): GradeCalculation {
  const completedActivities = activities.filter((a) => a.grade !== undefined);
  const remainingActivities = activities.filter((a) => a.grade === undefined);

  const totalWeight = activities.reduce((sum, a) => sum + a.weight, 0);
  const completedWeight = completedActivities.reduce((sum, a) => sum + a.weight, 0);
  const remainingWeight = remainingActivities.reduce((sum, a) => sum + a.weight, 0);

  const currentWeightedSum = completedActivities.reduce(
    (sum, a) => sum + (a.grade || 0) * a.weight,
    0
  );

  const currentAverage = completedWeight > 0 ? currentWeightedSum / completedWeight : 0;

  if (remainingWeight === 0) {
    return {
      currentAverage: totalWeight > 0 ? currentWeightedSum / totalWeight : 0,
      requiredGrade: 0,
      isPassing: currentAverage >= PASSING_GRADE,
      isComplete: true,
    };
  }

  const requiredWeightedSum = PASSING_GRADE * totalWeight - currentWeightedSum;
  const requiredGrade = requiredWeightedSum / remainingWeight;

  return {
    currentAverage: completedWeight > 0 ? currentAverage : 0,
    requiredGrade: Math.max(0, requiredGrade),
    isPassing: currentAverage >= PASSING_GRADE,
    isComplete: false,
  };
}

export function formatGrade(grade: number): string {
  return grade.toFixed(2);
}
