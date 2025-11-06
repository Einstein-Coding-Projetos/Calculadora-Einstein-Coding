export interface Activity {
  id: string;
  name: string;
  weight: number;
  grade?: number;
}

export interface Course {
  id: string;
  name: string;
  activities: Activity[];
}

export interface Semester {
  number: number;
  courses: Course[];
}

export interface Program {
  id: string;
  name: string;
  color: string;
  logo: string;
  totalYears: number;
  semesters: Semester[];
}

export const PROGRAMS: Program[] = [
  {
    id: "biomedica",
    name: "Engenharia Biomédica",
    color: "biomedica",
    logo: "enfermagem-logo.jpg",
    totalYears: 5,
    semesters: [],
  },
  {
    id: "fisioterapia",
    name: "Fisioterapia",
    color: "fisio",
    logo: "fisio-logo.jpg",
    totalYears: 4,
    semesters: [],
  },
  {
    id: "nutricao",
    name: "Nutrição",
    color: "nutricao",
    logo: "nutricao-logo.jpg",
    totalYears: 4,
    semesters: [],
  },
  {
    id: "odontologia",
    name: "Odontologia",
    color: "odonto",
    logo: "odonto-logo.jpg",
    totalYears: 4,
    semesters: [],
  },
  {
    id: "administracao",
    name: "Administração",
    color: "adm",
    logo: "adm-logo.jpg",
    totalYears: 4,
    semesters: [],
  },
  {
    id: "psicologia",
    name: "Psicologia",
    color: "psicologia",
    logo: "psico-logo.jpg",
    totalYears: 5,
    semesters: [],
  },
  {
    id: "enfermagem",
    name: "Enfermagem",
    color: "enfermagem",
    logo: "enfermagem-logo-new.jpg",
    totalYears: 4,
    semesters: [],
  },
  {
    id: "medicina",
    name: "Medicina",
    color: "medicina",
    logo: "medicina-logo.jpg",
    totalYears: 6,
    semesters: [],
  },
];
