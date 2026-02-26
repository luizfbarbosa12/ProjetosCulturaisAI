import { useState } from "react";
import { useParams, Link } from "react-router";
import { 
  ArrowLeft, 
  Save, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  Circle,
  Sparkles
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { mockProjects } from "../data/mockData";
import { Project, ProjectSection, SectionStatus } from "../types/project";

export function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | undefined>(
    mockProjects.find(p => p.id === id)
  );

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

  const calculateOverallScore = () => {
    if (project.sections.length === 0) return 0;
    
    const totalWeight = project.sections.reduce((sum, section) => sum + section.weight, 0);
    const weightedSum = project.sections.reduce((sum, section) => sum + (section.score * section.weight), 0);
    
    return Math.round(weightedSum / totalWeight);
  };

  const getTotalBudget = () => {
    return project.budgetItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const getBudgetByCategory = () => {
    const categoryTotals: Record<string, number> = {};
    project.budgetItems.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });
    return categoryTotals;
  };

  const getChecklistProgress = () => {
    if (project.checklist.length === 0) return 0;
    return Math.round((project.checklist.filter(item => item.completed).length / project.checklist.length) * 100);
  };

  const toggleChecklistItem = (itemId: string) => {
    setProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        checklist: prev.checklist.map(item =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      };
    });
  };

  const updateSectionText = (sectionId: string, text: string) => {
    setProject(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId ? { ...section, text } : section
        )
      };
    });
  };

  const getStatusBadge = (status: SectionStatus) => {
    const config = {
      incomplete: { label: "Incompleto", className: "bg-red-100 text-red-800 border-red-200" },
      medium: { label: "Médio", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      strong: { label: "Forte", className: "bg-green-100 text-green-800 border-green-200" }
    };
    
    const { label, className } = config[status];
    return <Badge variant="outline" className={className}>{label}</Badge>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const overallScore = calculateOverallScore();
  const totalBudget = getTotalBudget();
  const budgetPercentage = (totalBudget / project.maxBudget) * 100;
  const budgetByCategory = getBudgetByCategory();
  const checklistProgress = getChecklistProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <span>{project.edital}</span>
                <span>•</span>
                <Badge variant="secondary">{project.category}</Badge>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Salvar
            </Button>
          </div>

          {/* Score Overview */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Score Geral</p>
                    <p className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                      {overallScore}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
                <Progress value={overallScore} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Orçamento</p>
                    <p className="text-2xl font-bold">
                      R$ {totalBudget.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-500">
                      de R$ {project.maxBudget.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  {budgetPercentage > 80 && (
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                  )}
                </div>
                <Progress 
                  value={budgetPercentage} 
                  className={`mt-3 h-2 ${budgetPercentage > 80 ? '[&>div]:bg-orange-500' : ''}`}
                />
                {budgetPercentage > 80 && (
                  <p className="mt-2 text-xs text-orange-600 font-medium">
                    ⚠️ {budgetPercentage.toFixed(1)}% do limite máximo
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Checklist</p>
                    <p className="text-3xl font-bold">{checklistProgress}%</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-gray-400" />
                </div>
                <Progress value={checklistProgress} className="mt-3 h-2" />
                <p className="mt-2 text-xs text-gray-500">
                  {project.checklist.filter(i => i.completed).length} de {project.checklist.length} itens completos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="sections" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sections">Seções do Projeto</TabsTrigger>
            <TabsTrigger value="budget">Orçamento</TabsTrigger>
            <TabsTrigger value="checklist">Checklist</TabsTrigger>
          </TabsList>

          {/* Sections Tab */}
          <TabsContent value="sections" className="space-y-6">
            {project.sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                onTextChange={(text) => updateSectionText(section.id, text)}
                getStatusBadge={getStatusBadge}
                getScoreColor={getScoreColor}
              />
            ))}
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Itens de Orçamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.budgetItems.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.description}</p>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                          <p className="text-lg font-semibold">
                            R$ {item.amount.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold">
                          R$ {totalBudget.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(budgetByCategory).map(([category, amount]) => {
                        const percentage = (amount / totalBudget) * 100;
                        return (
                          <div key={category}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-gray-600">{category}</span>
                              <span className="font-medium">{percentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              R$ {amount.toLocaleString('pt-BR')}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Checklist de Documentação</CardTitle>
                  <div className="text-sm text-gray-600">
                    {project.checklist.filter(i => i.completed).length} / {project.checklist.length}
                  </div>
                </div>
                <Progress value={checklistProgress} className="mt-4 h-3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                      />
                      <label
                        htmlFor={item.id}
                        className={`flex-1 cursor-pointer ${
                          item.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}
                      >
                        {item.title}
                      </label>
                      {item.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface SectionCardProps {
  section: ProjectSection;
  onTextChange: (text: string) => void;
  getStatusBadge: (status: SectionStatus) => JSX.Element;
  getScoreColor: (score: number) => string;
}

function SectionCard({ section, onTextChange, getStatusBadge, getScoreColor }: SectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{section.title}</CardTitle>
            <div className="mt-2 flex items-center gap-3">
              {getStatusBadge(section.status)}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Score:</span>
                <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                  {section.score}/100
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Peso: {section.weight}x
              </div>
            </div>
          </div>
        </div>
        <Progress value={section.score} className="mt-3 h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Texto da Seção
          </label>
          <Textarea
            value={section.text}
            onChange={(e) => onTextChange(e.target.value)}
            rows={6}
            className="resize-none"
            placeholder="Escreva o conteúdo desta seção..."
          />
        </div>

        {section.suggestions.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Sugestões da IA</h4>
            </div>
            <ul className="space-y-2">
              {section.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
