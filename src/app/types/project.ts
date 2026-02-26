export interface Project {
  id: string;
  name: string;
  edital: string;
  category: string;
  maxBudget: number;
  sections: ProjectSection[];
  budgetItems: BudgetItem[];
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSection {
  id: string;
  title: string;
  text: string;
  score: number;
  suggestions: string[];
  status: "incomplete" | "medium" | "strong";
  weight: number;
}

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  amount: number;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export type SectionStatus = "incomplete" | "medium" | "strong";
