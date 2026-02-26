# Changelog

## [2026-02-26] - Implementação completa de features e tooling

### Added (code)

- **tsconfig.json**: Configuração TypeScript com strict mode e path aliases.
- **eslint.config.js**: ESLint flat config com typescript-eslint e eslint-config-prettier.
- **.prettierrc**: Configuração de formatação (double quotes, semicolons, 100 cols).
- **Husky + lint-staged**: Pre-commit hook rodando eslint --fix e prettier --write em arquivos staged.
- **Vitest**: Test runner configurado (scripts: test, test:run).
- **src/app/types/project.ts**: Tipos completos do domínio: Project (com team, timeline, scoreAxes, coherenceAlerts, documents, approvalProbability), TeamMember, TaxBreakdown, TeamMemberDocument, TeamMemberProfile, TimelinePhase, ScoreAxis, CoherenceAlert, GenerableDocument, EditalInfo. Constantes STANDARD_SECTIONS e SCORE_AXIS_NAMES.
- **src/app/utils/calculations.ts**: Funções extraídas e novas: calculateWeightedScore, calculateChecklistProgress, calculateTotalBudget, calculateBudgetByCategory, calculateTeamMemberTotalCost, calculateTeamTotalCost, detectTimelineOverlaps, getScoreColor, getScoreBgColor, getSectionStatusLabel.
- **src/app/utils/formatters.ts**: formatCurrency, formatDate, formatPercentage.
- **src/app/context/ProjectContext.tsx**: React Context para estado compartilhado de projetos entre páginas (CRUD).
- **src/app/components/features/SectionEditor.tsx**: Editor de seção com score, badge de status, sugestões IA.
- **src/app/components/features/BudgetPanel.tsx**: Planilha orçamentária conectada: itens de orçamento vinculados à equipe, breakdown por categoria, custos de equipe (cachê + encargos), alerta de teto, CRUD de itens.
- **src/app/components/features/TeamPanel.tsx**: Gestão de equipe (PF/PJ): cadastro com função, carga horária, cachê, encargos (INSS/ISS/IRRF/outros), checklist de documentos por membro, perfil artístico, projetos anteriores, dados de diversidade.
- **src/app/components/features/ChecklistPanel.tsx**: Checklist do projeto + checklist por membro da equipe, progresso geral e por membro.
- **src/app/components/features/TimelinePanel.tsx**: Cronograma conectado: fases com datas, atividades, equipe alocada, orçamento por fase, barra visual de Gantt, alertas de sobreposição.
- **src/app/components/features/ScoreAnalysisPanel.tsx**: Eixos de score (radar chart via recharts), probabilidade de aprovação, análise de coerência (conflitos entre seções), análise de diversidade/inclusão da equipe, simulador de avaliação (parecer crítico mock).
- **src/app/components/features/DocumentPanel.tsx**: Gerador de documentos automáticos (declarações, CVs, cartas de anuência, planos de acessibilidade e comunicação), status gerado/pendente.

### Changed (code)

- **src/app/data/mockData.ts**: Dados mock expandidos com equipe (5 membros com perfis, encargos, documentos), timeline (4 fases), 7 eixos de score, alertas de coerência, documentos geráveis, 11 seções padrão (Identificação, Justificativa, Objetivos, Metas, Público-alvo, Cronograma, Orçamento, Contrapartidas, Acessibilidade, Impacto social, Plano de comunicação), checklist por edital e por membro.
- **src/app/pages/ProjectDetailPage.tsx**: Refatorado com 7 abas (Seções, Orçamento, Equipe, Cronograma, Checklist, Análise, Documentos), 4 cards resumo no header (Score, Aprovação, Orçamento, Checklist), lógica extraída para utils/feature components, salvamento com toast via Sonner.
- **src/app/pages/ProjectsPage.tsx**: Dialog funcional de "Novo Projeto" (nome, edital, categoria, orçamento máximo), card de projeto com probabilidade de aprovação e contagem de equipe, utiliza funções extraídas de utils/.
- **src/app/App.tsx**: Wrap com ProjectProvider e Toaster.
- **package.json**: Scripts adicionados (lint, lint:fix, format, format:check, test, test:run, prepare), lint-staged config.

---

## [2026-02-26] - Arquitetura frontend e padrões de código

### Added

- **knowledge/frontend-architecture-and-code-standards.md**: Documento de referência para arquitetura frontend e padrões de código: princípio de simplicidade e anti-overengineering; ferramentas (ESLint, Prettier, Husky + lint-staged, Vitest + React Testing Library); organização de pastas; design patterns e componentização; SOLID, Clean Code, DRY, KISS; tipagem TypeScript; arquitetura limpa simplificada.
- **decisions/003-frontend-architecture-and-tooling.md**: Decisão de uso de ESLint, Prettier, pre-commit (Husky + lint-staged), Vitest e RTL, estrutura de pastas e padrões conforme o documento de knowledge.

---

## [2026-02-26] - Regras de negócio e escopo completo (editais)

### Added

- **domain-rules.md**: Regras de negócio e domínio consolidadas (estrutura do projeto, seções padrão, eixos de score, planilha orçamentária conectada, gestão de equipe, parser/IA do edital, assistente de coerência, simulador de avaliação, cronograma inteligente, diversidade e inclusão, gerador de documentos).
- **feature-edital-upload-parser.md**: Upload de PDF do edital; parser (categorias, critérios, documentação obrigatória, modelo de orçamento); IA gera checklist e estrutura; trechos ambíguos e resumo executivo.
- **feature-project-sections.md**: Abas padrão do projeto; editor rico, score 0–10, coerência, sugestões e alertas.
- **feature-scoring-system.md**: Eixos de score; probabilidade estimada de aprovação.
- **feature-team-management.md**: Gestão de equipe (PF/PJ), checklist por funcionário, banco de currículos, integração com orçamento.
- **feature-coherence-and-simulator.md**: Assistente de coerência global; simulador de avaliação (parecer crítico).
- **feature-timeline.md**: Cronograma conectado ao orçamento e à equipe; alertas de sobreposição.
- **feature-diversity-inclusion.md**: Análise de representatividade e sugestões estratégicas.
- **feature-document-generator.md**: Geração automática de declarações, currículos, cartas de anuência, planos.

### Updated

- **project-intent.md**: Escopo completo (editais, PDF, parser, seções, score, orçamento, equipe, coerência, simulador, cronograma, diversidade, gerador de documentos).
- **feature-budget-management.md**: Planilha orçamentária conectada (equipe PF/PJ, encargos, tetos, validação).
- **feature-checklist.md**: Checklist por edital e por funcionário.
- **feature-project-detail.md**: Seções padrão, scores por eixo, referências ao domínio.

### Existing Features (documented)

- Project Listing and Navigation
- Project Detail and Scoring
- Budget Management
- Project Checklist

### Tech Stack (documented)

- React, Vite, TypeScript, Radix UI, MUI, Tailwind CSS, pnpm

### Patterns Identified

- Project List Card, Project Detail Layout, Budget Table, Checklist UI

---

_Context Mesh added: 2026-02-26_
_Regras de negócio e escopo completo (editais) adicionados: 2026-02-26_
