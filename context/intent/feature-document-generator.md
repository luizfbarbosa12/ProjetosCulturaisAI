# Feature: Gerador de Documentos Automáticos

## What
Geração automática de documentos a partir dos dados do projeto e do que o edital exige: declarações, currículos resumidos, cartas de anuência, planos de acessibilidade, plano de comunicação, entre outros.

## Why
Reduz tempo e erro humano na produção de documentos padronizados exigidos pelos editais, mantendo coerência com o que foi preenchido no projeto.

## Regras de Negócio (resumo)
- Documentos gerados automaticamente: declarações, currículos resumidos, cartas de anuência, planos de acessibilidade, plano de comunicação.
- Conteúdo baseado nos dados do projeto e nas exigências do edital.

Ver [Domain Rules](domain-rules.md) § 12.

## Acceptance Criteria
- [ ] Usuário pode solicitar geração de: declarações, currículos resumidos, cartas de anuência, planos de acessibilidade, plano de comunicação (e outros conforme edital).
- [ ] Conteúdo gerado utiliza dados já preenchidos no projeto e orientações do edital.
- [ ] Documentos podem ser exportados/editados após geração.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Team Management](feature-team-management.md)
- [Feature: Edital Upload and Parser](feature-edital-upload-parser.md)
- [Feature: Project Sections](feature-project-sections.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned
