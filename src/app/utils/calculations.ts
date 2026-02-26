import type {
  ProjectSection,
  BudgetItem,
  ChecklistItem,
  TeamMember,
  TimelinePhase,
} from "../types/project";

export function calculateWeightedScore(sections: ProjectSection[]): number {
  if (sections.length === 0) return 0;
  const totalWeight = sections.reduce((sum, s) => sum + s.weight, 0);
  const weightedSum = sections.reduce((sum, s) => sum + s.score * s.weight, 0);
  return Math.round(weightedSum / totalWeight);
}

export function calculateChecklistProgress(items: ChecklistItem[]): number {
  if (items.length === 0) return 0;
  return Math.round((items.filter((i) => i.completed).length / items.length) * 100);
}

export function calculateTotalBudget(items: BudgetItem[]): number {
  return items.reduce((sum, item) => sum + item.amount, 0);
}

export function calculateBudgetByCategory(items: BudgetItem[]): Record<string, number> {
  const totals: Record<string, number> = {};
  items.forEach((item) => {
    totals[item.category] = (totals[item.category] || 0) + item.amount;
  });
  return totals;
}

export function calculateTeamMemberTotalCost(member: TeamMember): number {
  const { fee, taxes } = member;
  return fee + taxes.inss + taxes.iss + taxes.irrf + taxes.other;
}

export function calculateTeamTotalCost(team: TeamMember[]): number {
  return team.reduce((sum, m) => sum + calculateTeamMemberTotalCost(m), 0);
}

export function detectTimelineOverlaps(
  phases: TimelinePhase[],
): { phase1: string; phase2: string; message: string }[] {
  const overlaps: { phase1: string; phase2: string; message: string }[] = [];
  for (let i = 0; i < phases.length; i++) {
    for (let j = i + 1; j < phases.length; j++) {
      const a = phases[i];
      const b = phases[j];
      if (a.startDate <= b.endDate && b.startDate <= a.endDate) {
        overlaps.push({
          phase1: a.id,
          phase2: b.id,
          message: `"${a.name}" e "${b.name}" possuem datas sobrepostas`,
        });
      }
    }
  }
  return overlaps;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
  if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  return "bg-red-100 text-red-800 border-red-200";
}

export function getSectionStatusLabel(status: "incomplete" | "medium" | "strong"): string {
  const labels = { incomplete: "Incompleto", medium: "Médio", strong: "Forte" };
  return labels[status];
}
