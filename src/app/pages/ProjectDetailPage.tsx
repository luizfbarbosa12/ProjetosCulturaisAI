import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Save,
  Upload,
  File,
  X,
  Paperclip,
  FileText,
  ClipboardList,
  Users,
  DollarSign,
  Calendar,
  CheckSquare,
  FileOutput,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarRail,
} from "../components/ui/sidebar";
import { Separator } from "../components/ui/separator";
import { useProjects } from "../context/ProjectContext";
import { SectionEditor } from "../components/features/SectionEditor";
import { BudgetPanel } from "../components/features/BudgetPanel";
import { TeamPanel } from "../components/features/TeamPanel";
import { ChecklistPanel } from "../components/features/ChecklistPanel";
import { TimelinePanel } from "../components/features/TimelinePanel";
import { ScoreAnalysisPanel } from "../components/features/ScoreAnalysisPanel";
import { DocumentPanel } from "../components/features/DocumentPanel";
import { EvaluationCriteriaPanel } from "../components/features/EvaluationCriteriaPanel";
import { EvaluatorSimulatorPanel } from "../components/features/EvaluatorSimulatorPanel";
import type {
  Project,
  BudgetItem,
  TeamMember,
  TimelinePhase,
  EditalFile,
  EvaluationCriterion,
} from "../types/project";
import {
  calculateWeightedScore,
  calculateChecklistProgress,
  calculateTotalBudget,
  getScoreColor,
  getScoreBgColor,
} from "../utils/calculations";
import { formatCurrency } from "../utils/formatters";

type PanelId =
  | "edital-files"
  | "edital-criteria"
  | `section-${string}`
  | "team"
  | "budget"
  | "timeline"
  | "checklist"
  | "documents"
  | "score-analysis"
  | "simulator";

interface NavItem {
  id: PanelId;
  label: string;
  icon: React.ElementType;
  badge?: { value: string; className: string };
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export function ProjectDetailPage() {
  const { id } = useParams();
  const { getProject, updateProject: saveProject } = useProjects();
  const [project, setProject] = useState<Project | undefined>(() =>
    id ? structuredClone(getProject(id)) : undefined,
  );
  const [activePanel, setActivePanel] = useState<PanelId>("edital-files");

  useEffect(() => {
    if (id) {
      const p = getProject(id);
      if (p) setProject(structuredClone(p));
    }
  }, [id, getProject]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Projeto não encontrado</h2>
          <Link to="/">
            <Button variant="link">Voltar para projetos</Button>
          </Link>
        </div>
      </div>
    );
  }

  const update = (updater: (prev: Project) => Project) => {
    setProject((prev) => (prev ? updater(prev) : prev));
  };

  const handleSave = () => {
    if (project) {
      saveProject({ ...project, updatedAt: new Date().toISOString().split("T")[0] });
      toast.success("Projeto salvo com sucesso!");
    }
  };

  const overallScore = calculateWeightedScore(project.sections);
  const checklistProgress = calculateChecklistProgress(project.checklist);
  const totalBudget = calculateTotalBudget(project.budgetItems);
  const budgetPercentage = (totalBudget / project.maxBudget) * 100;

  const handleUpdateSectionText = (sectionId: string, text: string) => {
    update((p) => ({
      ...p,
      sections: p.sections.map((s) => (s.id === sectionId ? { ...s, text } : s)),
    }));
  };

  const handleToggleChecklistItem = (itemId: string) => {
    update((p) => ({
      ...p,
      checklist: p.checklist.map((i) => (i.id === itemId ? { ...i, completed: !i.completed } : i)),
    }));
  };

  const handleAddBudgetItem = (item: BudgetItem) => {
    update((p) => ({ ...p, budgetItems: [...p.budgetItems, item] }));
  };

  const handleRemoveBudgetItem = (itemId: string) => {
    update((p) => ({ ...p, budgetItems: p.budgetItems.filter((i) => i.id !== itemId) }));
  };

  const handleAddTeamMember = (member: TeamMember) => {
    update((p) => ({ ...p, team: [...p.team, member] }));
  };

  const handleToggleTeamDocument = (memberId: string, docId: string) => {
    update((p) => ({
      ...p,
      team: p.team.map((m) =>
        m.id === memberId
          ? {
              ...m,
              documents: m.documents.map((d) =>
                d.id === docId ? { ...d, submitted: !d.submitted } : d,
              ),
            }
          : m,
      ),
    }));
  };

  const handleAddTimelinePhase = (phase: TimelinePhase) => {
    update((p) => ({ ...p, timeline: [...p.timeline, phase] }));
  };

  const handleGenerateDocument = (docId: string) => {
    update((p) => ({
      ...p,
      documents: p.documents.map((d) => (d.id === docId ? { ...d, generated: true } : d)),
    }));
  };

  const handleAddEditalFiles = (files: EditalFile[]) => {
    update((p) => ({ ...p, editalFiles: [...(p.editalFiles ?? []), ...files] }));
  };

  const handleRemoveEditalFile = (fileId: string) => {
    update((p) => ({
      ...p,
      editalFiles: (p.editalFiles ?? []).filter((f) => f.id !== fileId),
    }));
  };

  const handleAddCriterion = (criterion: EvaluationCriterion) => {
    update((p) => ({
      ...p,
      evaluationCriteria: [...(p.evaluationCriteria ?? []), criterion],
    }));
  };

  const handleUpdateCriterion = (criterion: EvaluationCriterion) => {
    update((p) => ({
      ...p,
      evaluationCriteria: (p.evaluationCriteria ?? []).map((c) =>
        c.id === criterion.id ? criterion : c,
      ),
    }));
  };

  const handleRemoveCriterion = (criterionId: string) => {
    update((p) => ({
      ...p,
      evaluationCriteria: (p.evaluationCriteria ?? []).filter((c) => c.id !== criterionId),
    }));
  };

  const navGroups = buildNavGroups(project, overallScore);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="border-b p-3 group-data-[collapsible=icon]:p-2">
          <div className="group-data-[collapsible=icon]:hidden">
            <Link to="/">
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 -ml-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <h2 className="text-sm font-semibold truncate mt-1 px-2" title={project.name}>
              {project.name}
            </h2>
            <p className="text-xs text-muted-foreground truncate px-2">{project.edital}</p>
          </div>
          <div className="hidden group-data-[collapsible=icon]:block">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={activePanel === item.id}
                        onClick={() => setActivePanel(item.id)}
                        tooltip={item.label}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${item.badge.className}`}
                          >
                            {item.badge.value}
                          </span>
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 mb-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900 truncate">{project.name}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="truncate">{project.edital}</span>
                  <span>·</span>
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <span>·</span>
                  <span>{project.team.length} membros</span>
                </div>
              </div>
              <Button onClick={handleSave} className="flex items-center gap-2 flex-shrink-0">
                <Save className="h-4 w-4" />
                Salvar
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <SummaryCard
                label="Score Geral"
                value={overallScore.toString()}
                progress={overallScore}
                colorClass={getScoreColor(overallScore)}
              />
              <SummaryCard
                label="Aprovação"
                value={`${project.approvalProbability}%`}
                progress={project.approvalProbability}
                colorClass={getScoreColor(project.approvalProbability)}
              />
              <Card>
                <CardContent className="pt-4 pb-3">
                  <p className="text-xs text-gray-600">Orçamento</p>
                  <p className="text-lg font-bold">{formatCurrency(totalBudget)}</p>
                  <p className="text-[10px] text-gray-500">
                    de {formatCurrency(project.maxBudget)}
                  </p>
                  <Progress
                    value={Math.min(budgetPercentage, 100)}
                    className={`mt-2 h-1.5 ${budgetPercentage > 80 ? "[&>div]:bg-orange-500" : ""}`}
                  />
                </CardContent>
              </Card>
              <SummaryCard
                label="Checklist"
                value={`${checklistProgress}%`}
                progress={checklistProgress}
                subtitle={`${project.checklist.filter((i) => i.completed).length} de ${project.checklist.length}`}
              />
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <PanelContent
            activePanel={activePanel}
            project={project}
            onUpdateSectionText={handleUpdateSectionText}
            onToggleChecklistItem={handleToggleChecklistItem}
            onAddBudgetItem={handleAddBudgetItem}
            onRemoveBudgetItem={handleRemoveBudgetItem}
            onAddTeamMember={handleAddTeamMember}
            onToggleTeamDocument={handleToggleTeamDocument}
            onAddTimelinePhase={handleAddTimelinePhase}
            onGenerateDocument={handleGenerateDocument}
            onAddEditalFiles={handleAddEditalFiles}
            onRemoveEditalFile={handleRemoveEditalFile}
            onAddCriterion={handleAddCriterion}
            onUpdateCriterion={handleUpdateCriterion}
            onRemoveCriterion={handleRemoveCriterion}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

function buildNavGroups(project: Project, overallScore: number): NavGroup[] {
  const sectionItems: NavItem[] = project.sections
    .filter((s) => !["Cronograma", "Orçamento"].includes(s.title))
    .map((section) => ({
      id: `section-${section.id}` as PanelId,
      label: section.title,
      icon: FileText,
      badge:
        section.score > 0
          ? {
              value: section.score.toString(),
              className: getScoreBgColor(section.score * 10),
            }
          : undefined,
    }));

  return [
    {
      label: "Edital",
      items: [
        { id: "edital-files", label: "Arquivos", icon: Paperclip },
        { id: "edital-criteria", label: "Critérios de Avaliação", icon: ClipboardList },
      ],
    },
    {
      label: "Projeto",
      items: sectionItems,
    },
    {
      label: "Gestão",
      items: [
        { id: "team", label: "Equipe", icon: Users },
        { id: "budget", label: "Orçamento", icon: DollarSign },
        { id: "timeline", label: "Cronograma", icon: Calendar },
        { id: "checklist", label: "Checklist", icon: CheckSquare },
        { id: "documents", label: "Documentos", icon: FileOutput },
      ],
    },
    {
      label: "Avaliação",
      items: [
        {
          id: "score-analysis",
          label: "Score e Análise",
          icon: BarChart3,
          badge: {
            value: `${overallScore}`,
            className: getScoreBgColor(overallScore),
          },
        },
        { id: "simulator", label: "Simulador", icon: Sparkles },
      ],
    },
  ];
}

interface PanelContentProps {
  activePanel: PanelId;
  project: Project;
  onUpdateSectionText: (sectionId: string, text: string) => void;
  onToggleChecklistItem: (itemId: string) => void;
  onAddBudgetItem: (item: BudgetItem) => void;
  onRemoveBudgetItem: (itemId: string) => void;
  onAddTeamMember: (member: TeamMember) => void;
  onToggleTeamDocument: (memberId: string, docId: string) => void;
  onAddTimelinePhase: (phase: TimelinePhase) => void;
  onGenerateDocument: (docId: string) => void;
  onAddEditalFiles: (files: EditalFile[]) => void;
  onRemoveEditalFile: (fileId: string) => void;
  onAddCriterion: (criterion: EvaluationCriterion) => void;
  onUpdateCriterion: (criterion: EvaluationCriterion) => void;
  onRemoveCriterion: (criterionId: string) => void;
}

function PanelContent({
  activePanel,
  project,
  onUpdateSectionText,
  onToggleChecklistItem,
  onAddBudgetItem,
  onRemoveBudgetItem,
  onAddTeamMember,
  onToggleTeamDocument,
  onAddTimelinePhase,
  onGenerateDocument,
  onAddEditalFiles,
  onRemoveEditalFile,
  onAddCriterion,
  onUpdateCriterion,
  onRemoveCriterion,
}: PanelContentProps) {
  if (activePanel === "edital-files") {
    return (
      <EditalFilesPanel
        files={project.editalFiles ?? []}
        onAddFiles={onAddEditalFiles}
        onRemoveFile={onRemoveEditalFile}
      />
    );
  }

  if (activePanel === "edital-criteria") {
    return (
      <EvaluationCriteriaPanel
        criteria={project.evaluationCriteria ?? []}
        onAdd={onAddCriterion}
        onUpdate={onUpdateCriterion}
        onRemove={onRemoveCriterion}
      />
    );
  }

  if (activePanel.startsWith("section-")) {
    const sectionId = activePanel.replace("section-", "");
    const section = project.sections.find((s) => s.id === sectionId);
    if (!section) return <p className="text-muted-foreground">Seção não encontrada.</p>;
    return (
      <SectionEditor
        section={section}
        onTextChange={(text) => onUpdateSectionText(section.id, text)}
      />
    );
  }

  if (activePanel === "team") {
    return (
      <TeamPanel
        project={project}
        onAddMember={onAddTeamMember}
        onToggleDocument={onToggleTeamDocument}
      />
    );
  }

  if (activePanel === "budget") {
    return (
      <BudgetPanel
        project={project}
        onAddItem={onAddBudgetItem}
        onRemoveItem={onRemoveBudgetItem}
      />
    );
  }

  if (activePanel === "timeline") {
    return <TimelinePanel project={project} onAddPhase={onAddTimelinePhase} />;
  }

  if (activePanel === "checklist") {
    return <ChecklistPanel project={project} onToggleItem={onToggleChecklistItem} />;
  }

  if (activePanel === "documents") {
    return <DocumentPanel project={project} onGenerate={onGenerateDocument} />;
  }

  if (activePanel === "score-analysis") {
    return <ScoreAnalysisPanel project={project} />;
  }

  if (activePanel === "simulator") {
    return <EvaluatorSimulatorPanel />;
  }

  return null;
}

function SummaryCard({
  label,
  value,
  progress,
  colorClass,
  subtitle,
}: {
  label: string;
  value: string;
  progress: number;
  colorClass?: string;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-4 pb-3">
        <p className="text-xs text-gray-600">{label}</p>
        <p className={`text-lg font-bold ${colorClass ?? ""}`}>{value}</p>
        {subtitle && <p className="text-[10px] text-gray-500">{subtitle}</p>}
        <Progress value={progress} className="mt-2 h-1.5" />
      </CardContent>
    </Card>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function EditalFilesPanel({
  files,
  onAddFiles,
  onRemoveFile,
}: {
  files: EditalFile[];
  onAddFiles: (files: EditalFile[]) => void;
  onRemoveFile: (fileId: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const now = new Date().toISOString().split("T")[0];
      const newFiles: EditalFile[] = Array.from(fileList).map((file) => ({
        id: `ef-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: now,
      }));
      onAddFiles(newFiles);
    },
    [onAddFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Paperclip className="h-5 w-5" />
              Arquivos do Edital
            </CardTitle>
            <Badge variant="secondary">
              {files.length} arquivo{files.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Edital, anexos e demais documentos necessários para a IA analisar o edital.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium">Arraste arquivos aqui ou clique para selecionar</p>
            <p className="text-sm text-muted-foreground mt-1">
              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <File className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)} · Enviado em {file.uploadedAt}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-red-500"
                    onClick={() => onRemoveFile(file.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {files.length === 0 && (
            <p className="text-sm text-center text-muted-foreground py-4">
              Nenhum arquivo do edital enviado. Faça upload para que a IA possa analisar o edital.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
