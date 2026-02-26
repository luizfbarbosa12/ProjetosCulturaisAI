# Changelog

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
*Context Mesh added: 2026-02-26*
*Regras de negócio e escopo completo (editais) adicionados: 2026-02-26*
