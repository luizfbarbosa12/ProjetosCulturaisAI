import { useState } from "react";
import { Plus, AlertTriangle, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import type { Project, BudgetItem } from "../../types/project";
import {
  calculateTotalBudget,
  calculateBudgetByCategory,
  calculateTeamTotalCost,
  calculateTeamMemberTotalCost,
} from "../../utils/calculations";
import { formatCurrency, formatPercentage } from "../../utils/formatters";

interface BudgetPanelProps {
  project: Project;
  onAddItem: (item: BudgetItem) => void;
  onRemoveItem: (itemId: string) => void;
}

export function BudgetPanel({ project, onAddItem, onRemoveItem }: BudgetPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ category: "", description: "", amount: "" });

  const totalBudget = calculateTotalBudget(project.budgetItems);
  const budgetByCategory = calculateBudgetByCategory(project.budgetItems);
  const budgetPercentage = (totalBudget / project.maxBudget) * 100;
  const teamTotalCost = calculateTeamTotalCost(project.team);

  const handleAdd = () => {
    if (!newItem.category || !newItem.description || !newItem.amount) return;
    onAddItem({
      id: `b-${Date.now()}`,
      category: newItem.category,
      description: newItem.description,
      amount: Number(newItem.amount),
    });
    setNewItem({ category: "", description: "", amount: "" });
    setDialogOpen(false);
  };

  const getTeamMemberName = (memberId?: string) => {
    if (!memberId) return null;
    return project.team.find((m) => m.id === memberId)?.name;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Itens de Orçamento</CardTitle>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Novo Item de Orçamento</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div>
                        <Label>Categoria</Label>
                        <Input
                          value={newItem.category}
                          onChange={(e) => setNewItem((p) => ({ ...p, category: e.target.value }))}
                          placeholder="Ex.: Recursos Humanos"
                        />
                      </div>
                      <div>
                        <Label>Descrição</Label>
                        <Input
                          value={newItem.description}
                          onChange={(e) =>
                            setNewItem((p) => ({ ...p, description: e.target.value }))
                          }
                          placeholder="Descrição do item"
                        />
                      </div>
                      <div>
                        <Label>Valor (R$)</Label>
                        <Input
                          type="number"
                          value={newItem.amount}
                          onChange={(e) => setNewItem((p) => ({ ...p, amount: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                      <Button onClick={handleAdd} className="w-full">
                        Adicionar Item
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.budgetItems.map((item) => {
                  const memberName = getTeamMemberName(item.teamMemberId);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{item.category}</span>
                          {memberName && (
                            <>
                              <span>•</span>
                              <span className="text-blue-600">{memberName}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-lg font-semibold">{formatCurrency(item.amount)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">{formatCurrency(totalBudget)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Limite do edital</span>
                  <span>{formatCurrency(project.maxBudget)}</span>
                </div>
                <Progress
                  value={Math.min(budgetPercentage, 100)}
                  className={`h-2 ${budgetPercentage > 100 ? "[&>div]:bg-red-500" : budgetPercentage > 80 ? "[&>div]:bg-orange-500" : ""}`}
                />
                {budgetPercentage > 80 && (
                  <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span>{formatPercentage(budgetPercentage)} do limite máximo</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(budgetByCategory).map(([category, amount]) => {
                  const percentage = totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{category}</span>
                        <span className="font-medium">{formatPercentage(percentage)}</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{formatCurrency(amount)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {project.team.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Custos de Equipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-muted-foreground">{member.role}</p>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(calculateTeamMemberTotalCost(member))}
                      </span>
                    </div>
                  ))}
                  <div className="pt-3 border-t flex items-center justify-between font-semibold text-sm">
                    <span>Total equipe (com encargos)</span>
                    <span>{formatCurrency(teamTotalCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
