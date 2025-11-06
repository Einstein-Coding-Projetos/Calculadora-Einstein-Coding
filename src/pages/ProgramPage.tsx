import { useParams, useNavigate } from "react-router-dom";
import { PROGRAMS } from "@/types/course";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProgramPage() {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();

  const program = PROGRAMS.find((p) => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
          <Button onClick={() => navigate("/")}>Voltar</Button>
        </div>
      </div>
    );
  }

  const totalSemesters = program.totalYears * 2;
  const semesters = Array.from({ length: totalSemesters }, (_, i) => i + 1);

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
            onClick={() => navigate("/")}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center gap-4">
            {program.logo && (
              <img
                src={`/src/assets/${program.logo}`}
                alt={program.name}
                className="h-20 w-20 rounded-full object-cover bg-white"
              />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{program.name}</h1>
              <p className="text-sm md:text-base opacity-90 mt-1">
                {program.totalYears} anos · {totalSemesters} semestres
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Selecione o Semestre
          </h2>
          <p className="text-muted-foreground">
            Escolha o semestre para calcular suas notas
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {semesters.map((semester, index) => (
            <Card
              key={semester}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                "hover:shadow-hover hover:-translate-y-1",
                "border-2 hover:border-current animate-scale-in"
              )}
              style={{ 
                color: `hsl(var(--${program.color}))`,
                animationDelay: `${index * 50}ms` 
              }}
              onClick={() => navigate(`/program/${programId}/semester/${semester}`)}
            >
              <CardHeader>
                <CardTitle className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-current" />
                  <span className="text-lg">{semester}º Semestre</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-xs text-muted-foreground">
                  Ano {Math.ceil(semester / 2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
