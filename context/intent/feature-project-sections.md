# Feature: Seções do Projeto (Abas e Campos com Score)

## What
Cada projeto possui abas/seções padronizadas (Identificação, Justificativa, Objetivos, Metas, Público-alvo, Cronograma, Orçamento, Contrapartidas, Acessibilidade, Impacto social, Plano de comunicação). Cada campo possui editor rico, score 0–10, análise de coerência interna, sugestões de melhoria e alertas de inconsistência (ex.: orçamento alto com público pequeno).

## Why
Editais exigem que o projeto seja construído em formatos específicos. Organizar por seções claras e avaliar cada trecho (score + sugestões) aumenta a qualidade e a aderência ao edital, reduzindo reprovação por falhas de preenchimento ou incoerência.

## Regras de Negócio (resumo)
- Seções padrão: Identificação, Justificativa, Objetivos, Metas, Público-alvo, Cronograma, Orçamento, Contrapartidas, Acessibilidade, Impacto social, Plano de comunicação. Estrutura pode ser estendida/customizada por edital.
- Por campo: editor rico; score 0 a 10; análise de coerência interna; sugestões de melhoria; alertas de inconsistência (ex.: custo por beneficiário alto → justificar).

Ver [Domain Rules](domain-rules.md) § 2 e § 3.

## Acceptance Criteria
- [ ] Projeto exibe todas as seções padrão (e seções adicionais quando definidas pelo edital).
- [ ] Cada seção/campo possui editor rico para redação.
- [ ] Cada campo recebe score de 0 a 10 com base em coerência e aderência ao edital.
- [ ] Sistema exibe análise de coerência interna e sugestões de melhoria para atingir nota 10.
- [ ] Sistema emite alertas de inconsistência (ex.: orçamento vs público-alvo) e sugere justificativas ou revisões.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Project Detail](feature-project-detail.md)
- [Feature: Scoring System](feature-scoring-system.md)
- [Feature: Edital Upload and Parser](feature-edital-upload-parser.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned (parcialmente coberto por Project Detail atual)
