# Feature: Project Detail and Scoring

## What
Displays detailed information for a selected project: sections (Identificação, Justificativa, Objetivos, Metas, Público-alvo, Cronograma, Orçamento, Contrapartidas, Acessibilidade, Impacto social, Plano de comunicação), scores por seção e por eixo, budget, checklist do projeto e por equipe. Allows users to review and analyze each aspect and receive suggestions and inconsistency alerts.

## Why
To help users understand the strengths and weaknesses of their projects, improve proposal quality, and ensure all requirements are met for the edital.

## Regras de Negócio (resumo)
- Seções padrão e por edital; score 0–10 por campo; sugestões e alertas de inconsistência. Ver [Domain Rules](domain-rules.md) § 2 e § 3.
- Integra [Project Sections](feature-project-sections.md), [Scoring System](feature-scoring-system.md), [Budget](feature-budget-management.md), [Checklist](feature-checklist.md).

## Acceptance Criteria
- [ ] Users can view all sections of a project (standard and edital-specific).
- [ ] Users can see project scores (per section and per axis) and suggestions.
- [ ] Users can review and manage budget items and team-linked budget.
- [ ] Users can track checklist completion (project and per-team-member).

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Project Sections](feature-project-sections.md)
- [Feature: Scoring System](feature-scoring-system.md)
- [Feature: Budget Management](feature-budget-management.md)
- [Feature: Checklist](feature-checklist.md)
- [Decision: Tech Stack](../decisions/001-tech-stack.md)
- [Pattern: Project Detail Layout](../knowledge/patterns/project-detail-layout.md)

## Status
- **Created**: 2026-02-26 (Phase: Intent)
- **Updated**: 2026-02-26 (seções, score, referências ao domínio)
- **Status**: Active (parcialmente implementado; escopo completo documentado)
