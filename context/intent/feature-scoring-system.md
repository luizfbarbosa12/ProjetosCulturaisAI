# Feature: Sistema de Score Inteligente

## What
Avaliação do projeto em múltiplos eixos (coerência narrativa, aderência ao edital, clareza técnica, viabilidade orçamentária, impacto social, acessibilidade, capacidade de execução), com possibilidade de consolidar em uma "probabilidade estimada de aprovação" (heurística).

## Why
Ajudar o usuário a entender em quais dimensões o projeto está forte ou fraco e a ter uma noção da chance de aprovação, orientando esforços de melhoria.

## Regras de Negócio (resumo)
- Eixos: coerência narrativa, aderência ao edital, clareza técnica, viabilidade orçamentária, impacto social, acessibilidade, capacidade de execução.
- Pode ser apresentado como "probabilidade estimada de aprovação", mesmo que heurístico.

Ver [Domain Rules](domain-rules.md) § 4.

## Acceptance Criteria
- [ ] Projeto é avaliado em cada um dos eixos definidos (score por eixo).
- [ ] Usuário visualiza scores por eixo e pode acessar justificativas/sugestões.
- [ ] Opcional: exibição de uma "probabilidade estimada de aprovação" consolidada (claramente indicada como estimativa/heurística).

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Project Detail](feature-project-detail.md)
- [Feature: Project Sections](feature-project-sections.md)
- [Feature: Simulator and Coherence](feature-coherence-and-simulator.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned (parcialmente coberto por scoring atual no Project Detail)
