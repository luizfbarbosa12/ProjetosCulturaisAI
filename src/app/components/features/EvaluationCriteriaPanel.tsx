import { useState } from "react";
import { Plus, Pencil, Trash2, ClipboardList, X, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { EvaluationCriterion } from "../../types/project";

interface EvaluationCriteriaPanelProps {
  criteria: EvaluationCriterion[];
  onAdd: (criterion: EvaluationCriterion) => void;
  onUpdate: (criterion: EvaluationCriterion) => void;
  onRemove: (id: string) => void;
}

const EMPTY_FORM: Omit<EvaluationCriterion, "id"> = {
  name: "",
  weight: 1,
  maxScore: 10,
  description: "",
};

export function EvaluationCriteriaPanel({
  criteria,
  onAdd,
  onUpdate,
  onRemove,
}: EvaluationCriteriaPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<EvaluationCriterion, "id">>(EMPTY_FORM);

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      onUpdate({ ...form, id: editingId });
      setEditingId(null);
    } else {
      onAdd({
        ...form,
        id: `ec-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      });
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const startEditing = (criterion: EvaluationCriterion) => {
    setEditingId(criterion.id);
    setForm({
      name: criterion.name,
      weight: criterion.weight,
      maxScore: criterion.maxScore,
      description: criterion.description,
    });
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Critérios de Avaliação do Edital
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                {criteria.length} critério{criteria.length !== 1 ? "s" : ""}
              </Badge>
              {!showForm && (
                <Button size="sm" onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Critérios extraídos do edital que serão usados para avaliar o projeto. Adicione ou edite
            critérios conforme necessário.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {showForm && (
            <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
              <h4 className="font-medium text-sm">
                {editingId ? "Editar Critério" : "Novo Critério"}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Nome do critério</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex.: Relevância cultural e artística"
                  />
                </div>
                <div>
                  <Label>Peso</Label>
                  <Input
                    type="number"
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Nota máxima</Label>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={form.maxScore}
                    onChange={(e) => setForm({ ...form, maxScore: Number(e.target.value) })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Descrição</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Descreva o que este critério avalia..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={cancelForm}>
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSubmit} disabled={!form.name.trim()}>
                  <Check className="h-4 w-4 mr-1" />
                  {editingId ? "Salvar" : "Adicionar"}
                </Button>
              </div>
            </div>
          )}

          {criteria.length === 0 && !showForm && (
            <p className="text-sm text-center text-muted-foreground py-6">
              Nenhum critério de avaliação cadastrado. Adicione os critérios descritos no edital.
            </p>
          )}

          {criteria.length > 0 && (
            <div className="space-y-3">
              {criteria.map((criterion) => {
                const weightPercent =
                  totalWeight > 0 ? ((criterion.weight / totalWeight) * 100).toFixed(0) : "0";
                return (
                  <div
                    key={criterion.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-sm">{criterion.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            Peso {criterion.weight} ({weightPercent}%)
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            Nota máx. {criterion.maxScore}
                          </Badge>
                        </div>
                        {criterion.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {criterion.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => startEditing(criterion)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-red-500"
                          onClick={() => onRemove(criterion.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {criteria.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Soma dos pesos: <strong>{totalWeight.toFixed(1)}</strong>
                </span>
                <span className="text-muted-foreground">
                  Nota máxima possível:{" "}
                  <strong>
                    {criteria.reduce((sum, c) => sum + c.maxScore * c.weight, 0).toFixed(0)} pts
                  </strong>{" "}
                  (ponderada)
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
