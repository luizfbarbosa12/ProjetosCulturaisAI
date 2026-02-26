import { useState } from "react";
import { Plus, User, Building2, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Project, TeamMember, PersonType } from "../../types/project";
import { calculateTeamMemberTotalCost } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

interface TeamPanelProps {
  project: Project;
  onAddMember: (member: TeamMember) => void;
  onToggleDocument: (memberId: string, docId: string) => void;
}

const EMPTY_MEMBER: Omit<TeamMember, "id"> = {
  name: "",
  type: "PF",
  role: "",
  workloadHours: 0,
  fee: 0,
  taxes: { inss: 0, iss: 0, irrf: 0, other: 0 },
  documents: [],
  profile: { artisticCV: "", portfolio: "", previousProjects: [] },
};

export function TeamPanel({ project, onAddMember, onToggleDocument }: TeamPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_MEMBER);

  const handleAdd = () => {
    if (!form.name || !form.role) return;
    const member: TeamMember = {
      ...form,
      id: `t-${Date.now()}`,
      fee: Number(form.fee),
      workloadHours: Number(form.workloadHours),
      taxes: {
        inss: Number(form.taxes.inss),
        iss: Number(form.taxes.iss),
        irrf: Number(form.taxes.irrf),
        other: Number(form.taxes.other),
      },
      documents: [
        {
          id: `td-${Date.now()}-1`,
          title: form.type === "PF" ? "RG/CPF" : "CNPJ",
          required: true,
          submitted: false,
        },
        {
          id: `td-${Date.now()}-2`,
          title: "Currículo artístico",
          required: true,
          submitted: false,
        },
        { id: `td-${Date.now()}-3`, title: "Carta de anuência", required: true, submitted: false },
      ],
    };
    onAddMember(member);
    setForm(EMPTY_MEMBER);
    setDialogOpen(false);
  };

  const updateFormField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateTax = (field: keyof typeof form.taxes, value: string) => {
    setForm((prev) => ({ ...prev, taxes: { ...prev.taxes, [field]: value } }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Equipe do Projeto</h3>
          <p className="text-sm text-muted-foreground">
            {project.team.length} membro{project.team.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Membro da Equipe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => updateFormField("name", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label>Tipo</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) => updateFormField("type", v as PersonType)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PF">Pessoa Física</SelectItem>
                      <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Função</Label>
                  <Input
                    value={form.role}
                    onChange={(e) => updateFormField("role", e.target.value)}
                    placeholder="Ex.: Diretora Artística"
                  />
                </div>
                <div>
                  <Label>Carga horária (h)</Label>
                  <Input
                    type="number"
                    value={form.workloadHours || ""}
                    onChange={(e) => updateFormField("workloadHours", Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label>Cachê (R$)</Label>
                <Input
                  type="number"
                  value={form.fee || ""}
                  onChange={(e) => updateFormField("fee", Number(e.target.value))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label className="mb-2 block">Encargos e impostos (R$)</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">INSS</Label>
                    <Input
                      type="number"
                      value={form.taxes.inss || ""}
                      onChange={(e) => updateTax("inss", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">ISS</Label>
                    <Input
                      type="number"
                      value={form.taxes.iss || ""}
                      onChange={(e) => updateTax("iss", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">IRRF</Label>
                    <Input
                      type="number"
                      value={form.taxes.irrf || ""}
                      onChange={(e) => updateTax("irrf", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Outros</Label>
                    <Input
                      type="number"
                      value={form.taxes.other || ""}
                      onChange={(e) => updateTax("other", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleAdd} className="w-full">
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {project.team.map((member) => {
          const isExpanded = expandedMember === member.id;
          const totalCost = calculateTeamMemberTotalCost(member);
          const docsCompleted = member.documents.filter((d) => d.submitted).length;
          const docsTotal = member.documents.length;

          return (
            <Card key={member.id}>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpandedMember(isExpanded ? null : member.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {member.type === "PF" ? (
                      <User className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">{member.type}</Badge>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(totalCost)}</p>
                      <p className="text-xs text-muted-foreground">
                        Docs: {docsCompleted}/{docsTotal}
                      </p>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cachê</p>
                      <p className="font-medium">{formatCurrency(member.fee)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Carga horária</p>
                      <p className="font-medium">{member.workloadHours}h</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">INSS + ISS</p>
                      <p className="font-medium">
                        {formatCurrency(member.taxes.inss + member.taxes.iss)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">IRRF + Outros</p>
                      <p className="font-medium">
                        {formatCurrency(member.taxes.irrf + member.taxes.other)}
                      </p>
                    </div>
                  </div>

                  {member.profile.artisticCV && (
                    <div>
                      <p className="text-sm font-medium mb-1">Currículo artístico</p>
                      <p className="text-sm text-muted-foreground">{member.profile.artisticCV}</p>
                    </div>
                  )}

                  {member.profile.previousProjects.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Projetos anteriores</p>
                      <div className="flex flex-wrap gap-2">
                        {member.profile.previousProjects.map((proj, i) => (
                          <Badge key={i} variant="outline">
                            {proj}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium mb-2">
                      Documentos obrigatórios ({docsCompleted}/{docsTotal})
                    </p>
                    <div className="space-y-2">
                      {member.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"
                        >
                          <Checkbox
                            checked={doc.submitted}
                            onCheckedChange={() => onToggleDocument(member.id, doc.id)}
                          />
                          <span
                            className={`text-sm flex-1 ${doc.submitted ? "line-through text-muted-foreground" : ""}`}
                          >
                            {doc.title}
                          </span>
                          {doc.submitted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {(member.profile.gender || member.profile.race || member.profile.territory) && (
                    <div className="flex gap-2 flex-wrap">
                      {member.profile.gender && (
                        <Badge variant="outline">{member.profile.gender}</Badge>
                      )}
                      {member.profile.race && (
                        <Badge variant="outline">{member.profile.race}</Badge>
                      )}
                      {member.profile.territory && (
                        <Badge variant="outline">{member.profile.territory}</Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}

        {project.team.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <User className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhum membro na equipe.</p>
              <p className="text-sm text-muted-foreground">
                Adicione membros para construir a equipe do projeto.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
