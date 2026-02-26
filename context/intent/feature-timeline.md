# Feature: Cronograma (Linha do Tempo Inteligente)

## What
Cronograma do projeto conectado ao orçamento e à equipe: fases com custos e distribuição de equipe por fase. Alertas de sobreposição de atividades ou prazos inconsistentes. Distribuição automática sugerida da equipe por fase.

## Why
Cronograma desalinhado com orçamento ou equipe gera dúvidas na banca. Uma linha do tempo inteligente reduz inconsistências e facilita o preenchimento conforme o edital.

## Regras de Negócio (resumo)
- Cronograma conectado ao orçamento (custos por fase).
- Alertas de sobreposição e prazos inconsistentes.
- Distribuição automática da equipe por fase (quem atua em qual período).

Ver [Domain Rules](domain-rules.md) § 10.

## Acceptance Criteria
- [ ] Usuário pode definir fases/atividades e prazos no cronograma.
- [ ] Cronograma vinculado a custos (orçamento por fase) e à equipe (quem atua em qual fase).
- [ ] Sistema alerta sobre sobreposição de atividades ou inconsistências de prazo.
- [ ] Opcional: sugestão de distribuição automática da equipe por fase.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Project Sections](feature-project-sections.md)
- [Feature: Budget Management](feature-budget-management.md)
- [Feature: Team Management](feature-team-management.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned
