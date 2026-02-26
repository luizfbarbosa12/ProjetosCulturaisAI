import { CheckCircle2, Circle, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import type { Project } from "../../types/project";
import { calculateChecklistProgress } from "../../utils/calculations";

interface ChecklistPanelProps {
  project: Project;
  onToggleItem: (itemId: string) => void;
}

export function ChecklistPanel({ project, onToggleItem }: ChecklistPanelProps) {
  const projectItems = project.checklist.filter((i) => i.category === "project");
  const teamItems = project.checklist.filter((i) => i.category === "team_member");
  const totalProgress = calculateChecklistProgress(project.checklist);

  const teamItemsByMember = new Map<string, typeof teamItems>();
  teamItems.forEach((item) => {
    const memberId = item.teamMemberId ?? "unknown";
    const existing = teamItemsByMember.get(memberId) ?? [];
    existing.push(item);
    teamItemsByMember.set(memberId, existing);
  });

  const getMemberName = (memberId: string) =>
    project.team.find((m) => m.id === memberId)?.name ?? memberId;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Progresso Geral</CardTitle>
            <span className="text-2xl font-bold">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="mt-2 h-3" />
          <p className="text-sm text-muted-foreground mt-1">
            {project.checklist.filter((i) => i.completed).length} de {project.checklist.length}{" "}
            itens completos
          </p>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documentação do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projectItems.map((item) => (
              <ChecklistRow key={item.id} item={item} onToggle={() => onToggleItem(item.id)} />
            ))}
          </div>
        </CardContent>
      </Card>

      {teamItemsByMember.size > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Documentação por Membro da Equipe
          </h3>
          {Array.from(teamItemsByMember.entries()).map(([memberId, items]) => {
            const completed = items.filter((i) => i.completed).length;
            return (
              <Card key={memberId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{getMemberName(memberId)}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {completed}/{items.length}
                    </span>
                  </div>
                  <Progress
                    value={items.length > 0 ? (completed / items.length) * 100 : 0}
                    className="h-2"
                  />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <ChecklistRow
                        key={item.id}
                        item={item}
                        onToggle={() => onToggleItem(item.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChecklistRow({
  item,
  onToggle,
}: {
  item: { id: string; title: string; completed: boolean };
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <Checkbox id={item.id} checked={item.completed} onCheckedChange={onToggle} />
      <label
        htmlFor={item.id}
        className={`flex-1 cursor-pointer text-sm ${
          item.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {item.title}
      </label>
      {item.completed ? (
        <CheckCircle2 className="h-4 w-4 text-green-600" />
      ) : (
        <Circle className="h-4 w-4 text-gray-300" />
      )}
    </div>
  );
}
