# Feature: Gestão de Equipe

## What
Cadastro e gestão de colaboradores (PF/PJ) do projeto: função, carga horária, currículo artístico, portfólio, histórico de projetos. Cada funcionário possui checklist próprio de documentos exigidos pelo edital (carta de anuência, orçamento individual, documentação). Banco interno de currículos reutilizáveis entre projetos. Integração com a planilha orçamentária (cachê, encargos, tetos).

## Why
Editais exigem equipe documentada e orçamentada. Centralizar perfis e checklists por profissional reduz erros e retrabalho e garante que cada colaborador cumpra as obrigatoriedades do edital.

## Regras de Negócio (resumo)
- Perfis: currículo artístico, portfólio, histórico de projetos; reutilizáveis em outros projetos.
- Cada funcionário: checklist de documentos necessários (conforme edital): carta de anuência, orçamento individual, documentação específica.
- Funcionários aparecem na planilha orçamentária com valor a receber e respeitam tetos de gastos.

Ver [Domain Rules](domain-rules.md) § 5 e § 6.

## Acceptance Criteria
- [ ] Usuário pode cadastrar colaboradores (PF/PJ) com função, carga horária, cachê, encargos e dados de currículo/portfólio.
- [ ] Cada colaborador tem checklist de documentos obrigatórios definido conforme o edital (anuência, orçamento individual, etc.).
- [ ] Currículos podem ser reutilizados em outros projetos (banco interno).
- [ ] Colaboradores cadastrados aparecem na planilha orçamentária com valores e validação de tetos.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Budget Management](feature-budget-management.md)
- [Feature: Checklist](feature-checklist.md)
- [Feature: Document Generator](feature-document-generator.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned
