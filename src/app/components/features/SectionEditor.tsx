import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import type { ProjectSection } from "../../types/project";
import { getScoreColor, getScoreBgColor, getSectionStatusLabel } from "../../utils/calculations";

interface SectionEditorProps {
  section: ProjectSection;
  onTextChange: (text: string) => void;
}

export function SectionEditor({ section, onTextChange }: SectionEditorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl">{section.title}</CardTitle>
            {section.description && (
              <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
            )}
            <div className="mt-2 flex items-center gap-3">
              <Badge variant="outline" className={getScoreBgColor(section.score)}>
                {getSectionStatusLabel(section.status)}
              </Badge>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Score:</span>
                <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>
                  {section.score}/100
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Peso: {section.weight}x</div>
            </div>
          </div>
        </div>
        <Progress value={section.score} className="mt-3 h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
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
