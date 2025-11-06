import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Program } from "@/types/course";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  program: Program;
}

export function CourseCard({ program }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300",
        "hover:shadow-hover hover:-translate-y-1",
        "border-2 hover:border-current animate-fade-in"
      )}
      style={{ color: `hsl(var(--${program.color}))` }}
      onClick={() => navigate(`/program/${program.id}`)}
    >
      <CardHeader className="space-y-4">
        {program.logo && (
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-muted">
            <img
              src={`/src/assets/${program.logo}`}
              alt={program.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardTitle className="text-center text-foreground group-hover:text-current transition-colors">
          {program.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          {program.totalYears} anos · {program.totalYears * 2} semestres
        </p>
      </CardContent>
    </Card>
  );
}
