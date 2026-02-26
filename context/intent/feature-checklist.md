# Feature: Project Checklist

## What
Checklist por projeto, gerado automaticamente com base no edital (obrigatoriedades, documentação, categorias). Inclui checklist do projeto como um todo e, por colaborador, checklist de documentos necessários (carta de anuência, orçamento individual, documentação exigida pelo edital). To-do lists e progresso visível no projeto.

## Why
Cada edital exige itens e documentos diferentes. Checklists automáticos por edital e por funcionário reduzem o risco de esquecer obrigatoriedades e centralizam o acompanhamento.

## Regras de Negócio (resumo)
- Checklist do projeto: itens obrigatórios do edital (por categoria), documentação geral.
- Checklist por funcionário: documentos necessários para cadastrar o colaborador no edital (anuência, orçamento individual, etc.); cada edital define o que é obrigatório.
- Checklist pode ser gerado/atualizado pela IA a partir do parser do edital.

Ver [Domain Rules](domain-rules.md) § 1, § 6 e § 7.

## Acceptance Criteria
- [ ] Users can view and check off required items (project-level checklist).
- [ ] Checklist is generated or configurable according to the edital (categories, mandatory docs).
- [ ] Each team member has a dedicated checklist of required documents (e.g. anuência, individual budget).
- [ ] Checklist progress is visible in project detail.
- [ ] Checklist is linked to project sections and to [Edital Upload and Parser](feature-edital-upload-parser.md).

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Edital Upload and Parser](feature-edital-upload-parser.md)
- [Feature: Team Management](feature-team-management.md)
- [Decision: Tech Stack](../decisions/001-tech-stack.md)
- [Pattern: Checklist UI](../knowledge/patterns/checklist-ui.md)

## Status
- **Created**: 2026-02-26 (Phase: Intent)
- **Updated**: 2026-02-26 (checklist por edital e por funcionário)
- **Status**: Active (parcialmente implementado; regras completas documentadas)
