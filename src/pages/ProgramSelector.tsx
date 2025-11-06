import { PROGRAMS } from "@/types/course";
import { CourseCard } from "@/components/CourseCard";
import einsteinCodingLogo from "@/assets/einstein-coding-logo.png";
import { Instagram, Github, Mail, Linkedin } from "lucide-react";

export default function ProgramSelector() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-glow">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
        
        <div className="container mx-auto px-6 py-16 relative">
          <div className="flex flex-col gap-12">
            {/* Logo no canto superior esquerdo */}
            <div className="flex justify-start">
              <img
                src={einsteinCodingLogo}
                alt="Einstein Coding"
                className="h-16 md:h-20 object-contain drop-shadow-2xl mix-blend-normal"
              />
            </div>
            
            {/* Título centralizado */}
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg mb-4">
                Calculadora de Notas
              </h1>
              <p className="text-lg md:text-xl opacity-95 font-medium max-w-3xl mx-auto">
                FICSAE - Faculdade Israelita de Ciências da Saúde Albert Einstein
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{
          clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)'
        }}></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Selecione seu Curso
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PROGRAMS.map((program, index) => (
            <div
              key={program.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CourseCard program={program} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-20 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-muted-foreground">
              Desenvolvido por <span className="font-bold text-secondary">Einstein Coding</span>
            </p>
            
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com/einsteincoding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/einsteincoding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:contato@einsteincoding.com"
                className="text-muted-foreground hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/einsteincoding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <p className="text-xs text-muted-foreground">
              Média de aprovação: 7.0 · Sistema de média ponderada
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
