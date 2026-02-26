import { useState } from "react";
import { Link } from "react-router";
import { Plus, FileText, Calendar, Tag, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { mockProjects } from "../data/mockData";
import { Project } from "../types/project";

export function ProjectsPage() {
  const [projects] = useState<Project[]>(mockProjects);

  const calculateOverallScore = (project: Project) => {
    if (project.sections.length === 0) return 0;
    
    const totalWeight = project.sections.reduce((sum, section) => sum + section.weight, 0);
    const weightedSum = project.sections.reduce((sum, section) => sum + (section.score * section.weight), 0);
    
    return Math.round(weightedSum / totalWeight);
  };

  const calculateProgress = (project: Project) => {
    if (project.checklist.length === 0) return 0;
    return Math.round((project.checklist.filter(item => item.completed).length / project.checklist.length) * 100);
  };

  const getTotalBudget = (project: Project) => {
    return project.budgetItems.reduce((sum, item) => sum + item.amount, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Projetos</h1>
              <p className="mt-1 text-sm text-gray-500">
                Gerencie seus projetos culturais com inteligência artificial
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Novo Projeto
            </Button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const overallScore = calculateOverallScore(project);
            const progress = calculateProgress(project);
            const totalBudget = getTotalBudget(project);
            const budgetPercentage = (totalBudget / project.maxBudget) * 100;

            return (
              <Link key={project.id} to={`/project/${project.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {project.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{project.edital}</p>
                      </div>
                      <FileText className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Category */}
                    <div className="flex items-center gap-2 text-sm">
                      <Tag className="h-4 w-4 text-gray-400" />
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>

                    {/* Overall Score */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Score Geral</span>
                        <span className={`font-semibold ${getScoreColor(overallScore)}`}>
                          {overallScore}/100
                        </span>
                      </div>
                      <Progress value={overallScore} className="h-2" />
                    </div>

                    {/* Budget */}
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span>Orçamento</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-semibold">
                          R$ {totalBudget.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-sm text-gray-500">
                          / R$ {project.maxBudget.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      {budgetPercentage > 80 && (
                        <div className="mt-1 text-xs text-orange-600 font-medium">
                          ⚠️ {budgetPercentage.toFixed(0)}% do limite
                        </div>
                      )}
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Checklist</span>
                        <span className="text-gray-500">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t">
                      <Calendar className="h-3 w-3" />
                      <span>Atualizado em {new Date(project.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum projeto criado
            </h3>
            <p className="text-gray-500 mb-6">
              Comece criando seu primeiro projeto cultural
            </p>
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Criar Projeto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
