import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

const MOCK_PARECER = `PARECER TÉCNICO — SIMULAÇÃO

1. ANÁLISE GERAL
O projeto apresenta proposta relevante para o segmento de artes cênicas, com foco em democratização do acesso à cultura em territórios periféricos. A justificativa é sólida e bem fundamentada, porém carece de dados estatísticos que reforcem a necessidade da ação.

2. PONTOS FORTES
- Contrapartida social bem definida e alinhada ao propósito do edital
- Impacto social significativo com estimativa de 5.000 beneficiários diretos
- Orçamento dentro dos limites e com distribuição razoável entre rubricas

3. PONTOS DE ATENÇÃO
- A seção de acessibilidade precisa ser significativamente ampliada
- A metodologia está superficial e precisa detalhar técnicas pedagógicas
- Plano de comunicação insuficiente para o porte do projeto
- Não há rubrica específica de acessibilidade no orçamento

4. RECOMENDAÇÃO
Projeto com potencial de aprovação condicionado a ajustes nas seções de acessibilidade, metodologia e plano de comunicação. Recomenda-se revisão e resubmissão.

Nota estimada: 74/100`;

export function EvaluatorSimulatorPanel() {
  const [showParecer, setShowParecer] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Simulador de Avaliação
          </CardTitle>
          <Button variant="outline" onClick={() => setShowParecer(!showParecer)}>
            {showParecer ? "Ocultar Parecer" : "Simular Avaliação"}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          A IA simula um parecer crítico como se fosse um avaliador do edital.
        </p>
      </CardHeader>
      {showParecer && (
        <CardContent>
          <div className="bg-gray-50 border rounded-lg p-6">
            <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
              {MOCK_PARECER}
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
