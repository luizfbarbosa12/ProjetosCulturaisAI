# Project Intent: IA para Projetos Culturais

## What
A web application for **cultural producers** to write and manage **cultural project proposals** for **incentive edicts (editais)** of all categories. The platform reduces the cost and bureaucracy of applying to editais by offering: upload and parsing of edital PDFs, automatic checklists and project structure, per-section scoring (0–10) with improvement suggestions, a budget spreadsheet connected to team and edital limits, team management with per-member document checklists, coherence checks, timeline and diversity analysis, and automatic document generation.

## Why
Writing applications for editais is costly, complicated, and bureaucratic. The platform aims to **democratize access to cultural funding** by giving creators tools to align proposals with each edital, meet documentation requirements, maintain internal coherence, and maximize their estimated chance of approval.

## Scope (Regras de Negócio)
Full business rules and domain structure are in [Domain Rules](domain-rules.md). Summary:
- **Edital-driven**: Each project is tied to an edital; user uploads PDFs so the system can parse categories, evaluation criteria, required docs, and budget model.
- **Project sections**: Identificação, Justificativa, Objetivos, Metas, Público-alvo, Cronograma, Orçamento, Contrapartidas, Acessibilidade, Impacto social, Plano de comunicação (and edital-specific sections).
- **Per-field**: Rich editor, score 0–10, coherence analysis, improvement suggestions, inconsistency alerts.
- **Score axes**: Coerência narrativa, aderência ao edital, clareza técnica, viabilidade orçamentária, impacto social, acessibilidade, capacidade de execução → possible "probabilidade estimada de aprovação".
- **Budget**: Team (PF/PJ), role, hours, fees, taxes/encargos; totals and category percentages; edital ceiling validation.
- **Team**: Profiles, artistic CV, portfolio, per-member document checklists (e.g. anuência, individual budget), reusable curriculum bank.
- **Extras**: Coherence assistant, evaluator simulator (parecer crítico), smart timeline, diversity/inclusion analysis, automatic document generation.

## Current State
- Project dashboard and project list implemented
- Project detail view with scoring, budget, and checklist
- Mock data for projects and sections
- UI components for forms, cards, progress, and more

## Current Features (Implemented)
- Project listing and navigation
- Project detail and scoring
- Budget management
- Checklist for project requirements
- Section-by-section project analysis

## Target Features (Documented in context)
- Edital PDF upload and parser
- Edital-based checklists and project structure
- Full project sections and per-field scoring/suggestions
- Connected budget spreadsheet and team management
- Coherence assistant and evaluator simulator
- Smart timeline and diversity analysis
- Automatic document generation

## Related
- [Domain Rules](domain-rules.md) — regras de negócio completas
- [Feature intents](.) — feature-*.md

## Status
- **Created**: 2026-02-26 (Phase: Intent)
- **Updated**: 2026-02-26 (regras de negócio e escopo completo)
- **Status**: Active
