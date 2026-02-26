import { useState } from "react";
import { Plus, AlertTriangle, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import type { Project, TimelinePhase } from "../../types/project";
import { detectTimelineOverlaps } from "../../utils/calculations";
import { formatCurrency, formatDate } from "../../utils/formatters";

interface TimelinePanelProps {
  project: Project;
  onAddPhase: (phase: TimelinePhase) => void;
}

export function TimelinePanel({ project, onAddPhase }: TimelinePanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", startDate: "", endDate: "", activities: "" });

  const overlaps = detectTimelineOverlaps(project.timeline);
  const totalAllocation = project.timeline.reduce((sum, p) => sum + p.budgetAllocation, 0);

  const getMemberNames = (ids: string[]) =>
    ids
      .map((id) => project.team.find((m) => m.id === id)?.name)
      .filter(Boolean)
      .join(", ");

  const handleAdd = () => {
    if (!form.name || !form.startDate || !form.endDate) return;
    onAddPhase({
      id: `p-${Date.now()}`,
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      activities: form.activities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      teamMemberIds: [],
      budgetAllocation: 0,
    });
    setForm({ name: "", startDate: "", endDate: "", activities: "" });
    setDialogOpen(false);
  };

  const allDates = project.timeline.flatMap((p) => [
    new Date(p.startDate).getTime(),
    new Date(p.endDate).getTime(),
  ]);
  const minDate = allDates.length > 0 ? Math.min(...allDates) : 0;
  const maxDate = allDates.length > 0 ? Math.max(...allDates) : 1;
  const totalRange = maxDate - minDate || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Cronograma do Projeto</h3>
          <p className="text-sm text-muted-foreground">
            {project.timeline.length} fase{project.timeline.length !== 1 ? "s" : ""} •{" "}
            {formatCurrency(totalAllocation)} alocados
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Fase
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Fase</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label>Nome da fase</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ex.: Pré-produção"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data início</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Data fim</Label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label>Atividades (separadas por vírgula)</Label>
                <Input
                  value={form.activities}
                  onChange={(e) => setForm((p) => ({ ...p, activities: e.target.value }))}
                  placeholder="Atividade 1, Atividade 2"
                />
              </div>
              <Button onClick={handleAdd} className="w-full">
                Adicionar Fase
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {overlaps.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-900">Sobreposições detectadas</p>
                {overlaps.map((o, i) => (
                  <p key={i} className="text-sm text-orange-700">
                    {o.message}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {project.timeline.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Visão Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.timeline.map((phase) => {
                const start = new Date(phase.startDate).getTime();
                const end = new Date(phase.endDate).getTime();
                const left = ((start - minDate) / totalRange) * 100;
                const width = ((end - start) / totalRange) * 100;
                return (
                  <div key={phase.id}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{phase.name}</span>
                      <span className="text-muted-foreground">
                        {formatDate(phase.startDate)} — {formatDate(phase.endDate)}
                      </span>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-primary/70 rounded-full"
                        style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {project.timeline.map((phase) => {
          const memberNames = getMemberNames(phase.teamMemberIds);
          return (
            <Card key={phase.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{phase.name}</CardTitle>
                  <Badge variant="outline">{formatCurrency(phase.budgetAllocation)}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(phase.startDate)} — {formatDate(phase.endDate)}
                  </span>
                  {memberNames && (
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {memberNames}
                    </span>
                  )}
                </div>
              </CardHeader>
              {phase.activities.length > 0 && (
                <CardContent>
                  <ul className="space-y-1">
                    {phase.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground mt-0.5">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          );
        })}

        {project.timeline.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhuma fase definida.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
