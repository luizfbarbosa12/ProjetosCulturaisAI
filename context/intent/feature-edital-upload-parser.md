# Feature: Upload e Parser de Edital (PDF)

## What
Permite ao usuário fazer upload de arquivos do edital (em especial PDF) ao criar ou configurar um projeto. O sistema processa o edital para identificar categorias, critérios de avaliação, documentação obrigatória e modelo de orçamento, e a IA gera checklist automático, estrutura recomendada do projeto, marcação de trechos ambíguos e resumo executivo do edital.

## Why
Para que a plataforma entenda como cada edital funciona e possa orientar o usuário de forma específica (checklists, seções, orçamento e critérios), é necessário ingerir e interpretar o texto do edital. O upload de PDF e o parser são a base para todas as funcionalidades dependentes do edital.

## Regras de Negócio (resumo)
- Cada novo projeto deve permitir upload de todos os arquivos necessários do edital.
- Parser deve identificar: categorias, critérios de avaliação, documentação obrigatória, modelo de orçamento (rubricas, tetos).
- IA gera: checklist automático do projeto, estrutura recomendada do projeto.
- Ferramentas adicionais: marcação automática de trechos ambíguos no edital, resumo executivo do edital.

Ver [Domain Rules](domain-rules.md) § 1 e § 7.

## Acceptance Criteria
- [ ] Usuário pode fazer upload de PDF (e outros formatos suportados) do edital no contexto do projeto.
- [ ] Sistema extrai ou permite configurar: categorias do edital, critérios de avaliação, documentação obrigatória, modelo de orçamento.
- [ ] IA gera checklist automático vinculado ao projeto com base no edital.
- [ ] IA sugere estrutura recomendada do projeto (seções e orientações).
- [ ] Sistema pode marcar trechos ambíguos no texto do edital e exibir resumo executivo.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Project Checklist](feature-checklist.md)
- [Feature: Project Sections](feature-project-sections.md)
- [Feature: Budget Management](feature-budget-management.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned
