import { useState, useEffect } from "react";
import { Activity } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateWeightedAverage, calculateRequiredGrade, formatGrade } from "@/utils/gradeCalculator";
import { saveCourseData, loadCourseData } from "@/utils/localStorage";
import { Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradeCalculatorProps {
  programId: string;
  semester: number;
  courseId: string;
  courseName: string;
  programColor: string;
}

export function GradeCalculator({ 
  programId, 
  semester, 
  courseId, 
  courseName,
  programColor 
}: GradeCalculatorProps) {
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", name: "Prova 1", weight: 1, grade: undefined },
  ]);

  useEffect(() => {
    const saved = loadCourseData(programId, semester, courseId);
    if (saved) {
      setActivities(saved);
    }
  }, [programId, semester, courseId]);

  useEffect(() => {
    saveCourseData(programId, semester, courseId, activities);
  }, [activities, programId, semester, courseId]);

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      name: `Atividade ${activities.length + 1}`,
      weight: 1,
      grade: undefined,
    };
    setActivities([...activities, newActivity]);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const updateActivity = (id: string, field: keyof Activity, value: string | number) => {
    setActivities(
      activities.map((a) =>
        a.id === id
          ? { ...a, [field]: field === "grade" || field === "weight" ? parseFloat(value as string) || undefined : value }
          : a
      )
    );
  };

  const calculation = calculateRequiredGrade(activities);
  const currentAverage = calculateWeightedAverage(activities);

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: `hsl(var(--${programColor}))` }}
            />
            {courseName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-2">
                <Label htmlFor={`name-${activity.id}`}>Nome da Atividade</Label>
                <Input
                  id={`name-${activity.id}`}
                  value={activity.name}
                  onChange={(e) => updateActivity(activity.id, "name", e.target.value)}
                  placeholder="Ex: Prova 1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`weight-${activity.id}`}>Peso</Label>
                <Input
                  id={`weight-${activity.id}`}
                  type="number"
                  step="0.1"
                  min="0"
                  value={activity.weight}
                  onChange={(e) => updateActivity(activity.id, "weight", e.target.value)}
                  placeholder="1.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`grade-${activity.id}`}>Nota</Label>
                <Input
                  id={`grade-${activity.id}`}
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={activity.grade ?? ""}
                  onChange={(e) => updateActivity(activity.id, "grade", e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <div className="flex items-end">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeActivity(activity.id)}
                  disabled={activities.length === 1}
                  className="w-full md:w-auto"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          <Button
            onClick={addActivity}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Atividade
          </Button>
        </CardContent>
      </Card>

      <Card 
        className={cn(
          "shadow-card border-2",
          calculation.isPassing && calculation.isComplete ? "border-green-500 bg-green-50 dark:bg-green-950/20" : 
          !calculation.isPassing && calculation.isComplete ? "border-destructive bg-destructive/5" : ""
        )}
      >
        <CardHeader>
          <CardTitle>Resultado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-background rounded-lg shadow-sm">
              <p className="text-sm text-muted-foreground mb-1">Média Atual</p>
              <p className={cn(
                "text-3xl font-bold",
                currentAverage >= 7 ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"
              )}>
                {formatGrade(currentAverage)}
              </p>
            </div>
            
            {!calculation.isComplete && (
              <div className="p-4 bg-background rounded-lg shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">
                  Nota Necessária (Média nas Restantes)
                </p>
                <p className={cn(
                  "text-3xl font-bold",
                  calculation.requiredGrade <= 10 ? "text-blue-600 dark:text-blue-400" : "text-red-600 dark:text-red-400"
                )}>
                  {formatGrade(calculation.requiredGrade)}
                </p>
                {calculation.requiredGrade > 10 && (
                  <p className="text-xs text-destructive mt-1">
                    Impossível atingir média 7.0
                  </p>
                )}
              </div>
            )}
          </div>

          {calculation.isComplete && (
            <div className={cn(
              "p-4 rounded-lg text-center font-semibold",
              calculation.isPassing 
                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
            )}>
              {calculation.isPassing ? "✓ Aprovado!" : "✗ Reprovado"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
