import { FileText, CheckCircle2, Download } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Project, DocumentType } from "../../types/project";
import { toast } from "sonner";

interface DocumentPanelProps {
  project: Project;
  onGenerate: (docId: string) => void;
}

const TYPE_LABELS: Record<DocumentType, string> = {
  declaration: "Declaração",
  cv: "Currículo",
  anuencia: "Carta de Anuência",
  accessibility_plan: "Acessibilidade",
  communication_plan: "Comunicação",
  other: "Outro",
};

export function DocumentPanel({ project, onGenerate }: DocumentPanelProps) {
  const generatedCount = project.documents.filter((d) => d.generated).length;
  const getMemberName = (memberId?: string) => {
    if (!memberId) return null;
    return project.team.find((m) => m.id === memberId)?.name;
  };

  const handleGenerate = (docId: string) => {
    onGenerate(docId);
    toast.success("Documento gerado com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Gerador de Documentos</h3>
        <p className="text-sm text-muted-foreground">
          {generatedCount} de {project.documents.length} documentos gerados
        </p>
      </div>

      <div className="space-y-3">
        {project.documents.map((doc) => {
          const memberName = getMemberName(doc.teamMemberId);
          return (
            <Card key={doc.id}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{doc.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {TYPE_LABELS[doc.type]}
                        </Badge>
                        {memberName && <span>• {memberName}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {doc.generated ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" onClick={() => handleGenerate(doc.id)}>
                        Gerar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {project.documents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum documento configurado para este projeto.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
