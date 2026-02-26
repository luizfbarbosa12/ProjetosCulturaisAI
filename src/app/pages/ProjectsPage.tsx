import { useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import {
  Plus,
  FileText,
  Calendar,
  Tag,
  DollarSign,
  Users,
  TrendingUp,
  Upload,
  X,
  File,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useProjects } from "../context/ProjectContext";
import type { Project, EditalFile } from "../types/project";
import {
  calculateWeightedScore,
  calculateChecklistProgress,
  calculateTotalBudget,
  getScoreColor,
} from "../utils/calculations";
import { formatCurrency, formatDate } from "../utils/formatters";
import { STANDARD_SECTIONS } from "../types/project";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ProjectsPage() {
  const { projects, addProject } = useProjects();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    edital: "",
    category: "",
    maxBudget: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<EditalFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const now = new Date().toISOString().split("T")[0];
    const newFiles: EditalFile[] = Array.from(fileList).map((file) => ({
      id: `ef-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: now,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const canCreate =
    form.name && form.edital && form.category && form.maxBudget && uploadedFiles.length > 0;

  const handleCreateProject = () => {
    if (!canCreate) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: form.name,
      edital: form.edital,
      category: form.category,
      maxBudget: Number(form.maxBudget),
      editalFiles: uploadedFiles,
      evaluationCriteria: [],
      sections: STANDARD_SECTIONS.map((title, i) => ({
        id: `s${i + 1}`,
        title,
        description: "",
        text: "",
        score: 0,
        suggestions: [],
        status: "incomplete" as const,
        weight: 2,
      })),
      budgetItems: [],
      checklist: [
        {
          id: "c1",
          title: "Documentação do proponente",
          completed: false,
          category: "project" as const,
        },
        {
          id: "c2",
          title: "Plano de trabalho completo",
          completed: false,
          category: "project" as const,
        },
        { id: "c3", title: "Orçamento detalhado", completed: false, category: "project" as const },
        {
          id: "c4",
          title: "Cronograma de execução",
          completed: false,
          category: "project" as const,
        },
        { id: "c5", title: "Plano de divulgação", completed: false, category: "project" as const },
        {
          id: "c6",
          title: "Plano de acessibilidade",
          completed: false,
          category: "project" as const,
        },
      ],
      team: [],
      timeline: [],
      scoreAxes: [],
      coherenceAlerts: [],
      documents: [],
      approvalProbability: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    addProject(newProject);
    setForm({ name: "", edital: "", category: "", maxBudget: "" });
    setUploadedFiles([]);
    setDialogOpen(false);
    navigate(`/project/${newProject.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
              <p className="mt-1 text-sm text-gray-500">
                Gerencie seus projetos culturais com inteligência artificial
              </p>
            </div>
            <Dialog
              open={dialogOpen}
              onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) {
                  setUploadedFiles([]);
                  setForm({ name: "", edital: "", category: "", maxBudget: "" });
                }
              }}
            >
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Novo Projeto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Novo Projeto Cultural</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Nome do projeto</Label>
                    <Input
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Ex.: Festival de Teatro Comunitário"
                    />
                  </div>
                  <div>
                    <Label>Edital</Label>
                    <Input
                      value={form.edital}
                      onChange={(e) => setForm((p) => ({ ...p, edital: e.target.value }))}
                      placeholder="Ex.: Lei Rouanet - Artes Cênicas"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Categoria</Label>
                      <Input
                        value={form.category}
                        onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                        placeholder="Ex.: Teatro"
                      />
                    </div>
                    <div>
                      <Label>Orçamento máximo (R$)</Label>
                      <Input
                        type="number"
                        value={form.maxBudget}
                        onChange={(e) => setForm((p) => ({ ...p, maxBudget: e.target.value }))}
                        placeholder="500000"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>
                      Arquivos do edital <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Faça upload do edital, anexos e demais documentos necessários (PDF, DOC,
                      imagens).
                    </p>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        Arraste os arquivos aqui ou clique para selecionar
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
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

                    {uploadedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {uploadedFiles.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                          >
                            <File className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {uploadedFiles.length === 0 && (
                      <p className="text-xs text-red-500 mt-2">
                        O upload de pelo menos um arquivo do edital é obrigatório.
                      </p>
                    )}
                  </div>

                  <Button onClick={handleCreateProject} className="w-full" disabled={!canCreate}>
                    Criar Projeto
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto criado</h3>
            <p className="text-gray-500 mb-6">Comece criando seu primeiro projeto cultural</p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Criar Projeto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const overallScore = calculateWeightedScore(project.sections);
  const progress = calculateChecklistProgress(project.checklist);
  const totalBudget = calculateTotalBudget(project.budgetItems);
  const budgetPercentage = project.maxBudget > 0 ? (totalBudget / project.maxBudget) * 100 : 0;

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
              <p className="text-sm text-gray-500 mt-1">{project.edital}</p>
            </div>
            <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-gray-400" />
            <Badge variant="secondary">{project.category}</Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Score</span>
                <span className={`font-semibold ${getScoreColor(overallScore)}`}>
                  {overallScore}/100
                </span>
              </div>
              <Progress value={overallScore} className="h-2" />
            </div>
            {project.approvalProbability > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className={`font-semibold ${getScoreColor(project.approvalProbability)}`}>
                  {project.approvalProbability}%
                </span>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <DollarSign className="h-4 w-4" />
              <span>Orçamento</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold">{formatCurrency(totalBudget)}</span>
              <span className="text-sm text-gray-500">/ {formatCurrency(project.maxBudget)}</span>
            </div>
            {budgetPercentage > 80 && (
              <p className="mt-1 text-xs text-orange-600 font-medium">
                {budgetPercentage.toFixed(0)}% do limite
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="h-4 w-4" />
              <span>{project.team.length}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600">Checklist</span>
                <span className="text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t">
            <Calendar className="h-3 w-3" />
            <span>Atualizado em {formatDate(project.updatedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
