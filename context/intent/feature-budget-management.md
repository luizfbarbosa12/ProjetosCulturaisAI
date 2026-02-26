# Feature: Budget Management (Planilha Orçamentária Conectada)

## What
Planilha orçamentária conectada ao edital e à equipe: cadastro de itens e de equipe (PF/PJ) com função, carga horária, cachê, encargos e impostos (INSS, ISS, etc.). Cálculo automático de totais, percentuais por categoria e custos administrativos. Validação contra tetos e limites do edital. Cada profissional da equipe aparece na planilha com valores e alertas de teto.

## Why
Garantir conformidade com o edital, evitar estouro de tetos e manter orçamento coerente com a equipe e com as rubricas exigidas.

## Regras de Negócio (resumo)
- Equipe (PF/PJ): função, carga horária, cachê, encargos, impostos.
- Automático: soma total, percentuais por categoria, alertas de teto máximo, validação contra limites do edital, cálculo de custos administrativos.
- Planilha vinculada aos colaboradores e ao modelo de orçamento do edital.

Ver [Domain Rules](domain-rules.md) § 5 e § 6.

## Acceptance Criteria
- [ ] Users can add, edit, and remove budget items and link them to team members (PF/PJ).
- [ ] Cadastro de equipe inclui: função, carga horária, cachê, encargos, impostos (INSS, ISS, etc.).
- [ ] Sistema calcula automaticamente: total, percentuais por categoria, custos administrativos.
- [ ] Alertas de teto máximo e validação contra limites do edital.
- [ ] Budget is linked to project sections, team, and edital requirements.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Team Management](feature-team-management.md)
- [Feature: Edital Upload and Parser](feature-edital-upload-parser.md)
- [Decision: Tech Stack](../decisions/001-tech-stack.md)
- [Pattern: Budget Table](../knowledge/patterns/budget-table.md)

## Status
- **Created**: 2026-02-26 (Phase: Intent)
- **Updated**: 2026-02-26 (planilha conectada, equipe, tetos)
- **Status**: Active (parcialmente implementado; regras completas documentadas)
