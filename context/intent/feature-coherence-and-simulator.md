# Feature: Assistente de Coerência Global e Simulador de Avaliação

## What
**Assistente de Coerência Global**: a IA analisa o projeto como um todo e detecta conflitos entre seções (ex.: declara acessibilidade mas não tem orçamento para acessibilidade; prioriza periferia mas equipe do centro; público infantil com linguagem técnica). Sugere correções ou justificativas.  
**Simulador de Avaliação**: modo "avaliador" em que a IA assume o papel de parecerista e produz um parecer crítico realista sobre o projeto, como se estivesse avaliando para o edital.

## Why
Inconsistências entre texto e orçamento/equipe são motivos comuns de reprovação. O simulador dá ao usuário uma visão próxima do que um avaliador real poderia apontar, aumentando a chance de ajustes antes da submissão.

## Regras de Negócio (resumo)
- Coerência: detectar e alertar conflitos entre seções (exemplos no Domain Rules).
- Simulador: parecer crítico realista no papel de parecerista do edital.

Ver [Domain Rules](domain-rules.md) § 8 e § 9.

## Acceptance Criteria
- [ ] IA analisa coerência global e lista conflitos detectados (com sugestões de correção ou justificativa).
- [ ] Exemplos cobertos: acessibilidade sem orçamento, prioridade territorial vs equipe, público-alvo vs linguagem.
- [ ] Modo "avaliador": usuário pode solicitar um parecer crítico realista (simulando parecerista do edital).
- [ ] Parecer exibido de forma clara e acionável.

## Related
- [Project Intent](project-intent.md)
- [Domain Rules](domain-rules.md)
- [Feature: Project Sections](feature-project-sections.md)
- [Feature: Scoring System](feature-scoring-system.md)

## Status
- **Created**: 2026-02-26
- **Status**: Planned
