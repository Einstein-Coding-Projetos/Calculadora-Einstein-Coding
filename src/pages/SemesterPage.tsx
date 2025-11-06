import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROGRAMS } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradeCalculator } from "@/components/GradeCalculator";
import { ArrowLeft, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SemesterPage() {
  const { programId, semester } = useParams<{ programId: string; semester: string }>();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Array<{ id: string; name: string }>>([]);
  const [newCourseName, setNewCourseName] = useState("");

  const program = PROGRAMS.find((p) => p.id === programId);

  if (!program || !semester) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Página não encontrada</h1>
          <Button onClick={() => navigate("/")}>Voltar ao Início</Button>
        </div>
      </div>
    );
  }

  const addCourse = () => {
    if (newCourseName.trim()) {
      setCourses([
        ...courses,
        {
          id: Date.now().toString(),
          name: newCourseName.trim(),
        },
      ]);
      setNewCourseName("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header 
        className="text-white shadow-lg"
        style={{ backgroundColor: `hsl(var(--${program.color}))` }}
      >
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/program/${programId}`)}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {program.name} - {semester}º Semestre
            </h1>
            <p className="text-sm md:text-base opacity-90 mt-1">
              Ano {Math.ceil(parseInt(semester) / 2)}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Add Course Card */}
          <Card className="shadow-card animate-fade-in">
            <CardHeader>
              <CardTitle>Adicionar Matéria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="course-name">Nome da Matéria</Label>
                  <Input
                    id="course-name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Ex: Anatomia, Fisiologia..."
                    onKeyPress={(e) => e.key === "Enter" && addCourse()}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={addCourse}
                    style={{ backgroundColor: `hsl(var(--${program.color}))` }}
                    className="text-white hover:opacity-90"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Course Calculators */}
          {courses.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center text-muted-foreground">
                <p>Nenhuma matéria adicionada ainda.</p>
                <p className="text-sm mt-2">Adicione uma matéria acima para começar a calcular suas notas.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {courses.map((course, index) => (
                <div 
                  key={course.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <GradeCalculator
                    programId={programId!}
                    semester={parseInt(semester)}
                    courseId={course.id}
                    courseName={course.name}
                    programColor={program.color}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
