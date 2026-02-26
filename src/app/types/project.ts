export type SectionStatus = "incomplete" | "medium" | "strong";
export type AlertSeverity = "warning" | "error" | "info";
export type PersonType = "PF" | "PJ";
export type DocumentType =
  | "declaration"
  | "cv"
  | "anuencia"
  | "accessibility_plan"
  | "communication_plan"
  | "other";

export interface EditalFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  weight: number;
  maxScore: number;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  edital: string;
  category: string;
  maxBudget: number;
  editalFiles: EditalFile[];
  evaluationCriteria: EvaluationCriterion[];
  sections: ProjectSection[];
  budgetItems: BudgetItem[];
  checklist: ChecklistItem[];
  team: TeamMember[];
  timeline: TimelinePhase[];
  scoreAxes: ScoreAxis[];
  coherenceAlerts: CoherenceAlert[];
  documents: GenerableDocument[];
  approvalProbability: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  description: string;
  text: string;
  score: number;
  suggestions: string[];
  status: SectionStatus;
  weight: number;
}

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  teamMemberId?: string;
  phaseId?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  category: "project" | "team_member";
  teamMemberId?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  type: PersonType;
  role: string;
  workloadHours: number;
  fee: number;
  taxes: TaxBreakdown;
  documents: TeamMemberDocument[];
  profile: TeamMemberProfile;
}

export interface TaxBreakdown {
  inss: number;
  iss: number;
  irrf: number;
  other: number;
}

export interface TeamMemberDocument {
  id: string;
  title: string;
  required: boolean;
  submitted: boolean;
}

export interface TeamMemberProfile {
  artisticCV: string;
  portfolio: string;
  previousProjects: string[];
  gender?: string;
  race?: string;
  territory?: string;
  hasAccessibilityNeeds?: boolean;
}

export interface TimelinePhase {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  activities: string[];
  teamMemberIds: string[];
  budgetAllocation: number;
}

export interface ScoreAxis {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  description: string;
  suggestions: string[];
}

export interface CoherenceAlert {
  id: string;
  severity: AlertSeverity;
  message: string;
  relatedSections: string[];
  suggestion: string;
}

export interface GenerableDocument {
  id: string;
  title: string;
  type: DocumentType;
  description: string;
  generated: boolean;
  teamMemberId?: string;
}

export const STANDARD_SECTIONS = [
  "Identificação",
  "Justificativa",
  "Objetivos",
  "Metas",
  "Público-alvo",
  "Cronograma",
  "Orçamento",
  "Contrapartidas",
  "Acessibilidade",
  "Impacto social",
  "Plano de comunicação",
] as const;

export const SCORE_AXIS_NAMES = [
  "Coerência narrativa",
  "Aderência ao edital",
  "Clareza técnica",
  "Viabilidade orçamentária",
  "Impacto social",
  "Acessibilidade",
  "Capacidade de execução",
] as const;
