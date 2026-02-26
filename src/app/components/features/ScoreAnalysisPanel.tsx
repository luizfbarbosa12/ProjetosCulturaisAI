import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, AlertCircle, Info, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import type { Project, AlertSeverity } from "../../types/project";

interface ScoreAnalysisPanelProps {
  project: Project;
}

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { icon: typeof AlertTriangle; color: string; bg: string }
> = {
  error: { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50 border-red-200" },
  warning: { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
};

export function ScoreAnalysisPanel({ project }: ScoreAnalysisPanelProps) {
  const radarData = project.scoreAxes.map((axis) => ({
    name: axis.name.length > 15 ? axis.name.substring(0, 15) + "…" : axis.name,
    score: axis.score,
    fullMark: axis.maxScore,
  }));

  const diversityData = getDiversityAnalysis(project);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Eixos de Avaliação</CardTitle>
          </CardHeader>
          <CardContent>
            {radarData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                  <Radar
                    dataKey="score"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Probabilidade de Aprovação</CardTitle>
              <Badge
                variant="outline"
                className={
                  project.approvalProbability >= 70
                    ? "bg-green-100 text-green-800 border-green-200"
                    : project.approvalProbability >= 50
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                }
              >
                {project.approvalProbability}%
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-6">
              <Progress value={project.approvalProbability} className="h-4" />
              <p className="text-sm text-muted-foreground">
                Estimativa heurística baseada nos eixos de avaliação.
              </p>
            </div>

            <div className="space-y-3">
              {project.scoreAxes.map((axis) => (
                <div key={axis.id} className="flex items-center gap-3">
                  <div className="w-40 text-sm truncate" title={axis.name}>
                    {axis.name}
                  </div>
                  <Progress value={axis.score} className="flex-1 h-2" />
                  <span className="text-sm font-medium w-10 text-right">{axis.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {project.coherenceAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Análise de Coerência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.coherenceAlerts.map((alert) => {
                const config = SEVERITY_CONFIG[alert.severity];
                const Icon = config.icon;
                return (
                  <div key={alert.id} className={`p-4 rounded-lg border ${config.bg}`}>
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{alert.message}</p>
                        <p className="text-sm mt-1 opacity-80">{alert.suggestion}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {diversityData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Análise de Diversidade e Inclusão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {diversityData.map((item) => (
                <div key={item.label} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            {diversityData.length > 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                Dados baseados nos perfis preenchidos da equipe. Preencha os perfis para uma análise
                mais completa.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getDiversityAnalysis(project: Project) {
  if (project.team.length === 0) return null;

  const profiles = project.team.map((m) => m.profile).filter(Boolean);
  const genders = profiles.map((p) => p.gender).filter(Boolean);
  const races = profiles.map((p) => p.race).filter(Boolean);
  const territories = profiles.map((p) => p.territory).filter(Boolean);

  const uniqueGenders = new Set(genders).size;
  const uniqueRaces = new Set(races).size;
  const uniqueTerritories = new Set(territories).size;

  return [
    { label: "Membros", value: project.team.length },
    { label: "Gêneros", value: uniqueGenders || "N/I" },
    { label: "Raças/etnias", value: uniqueRaces || "N/I" },
    { label: "Territórios", value: uniqueTerritories || "N/I" },
  ];
}
