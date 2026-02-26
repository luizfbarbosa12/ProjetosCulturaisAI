# Regras de Negócio e Domínio: Projetos Culturais para Editais

## Visão do Domínio
A aplicação apoia **produtores culturais** a redigir projetos para **editais de incentivo cultural** de todas as categorias. O processo de escrita de editais é custoso, burocrático e complexo; a plataforma oferece ferramentas para to-do lists, checklists por edital, análise por IA e planilha orçamentária conectada.

---

## 1. Ciclo do Edital no Projeto
- Ao **iniciar um novo projeto**, o usuário faz **upload dos arquivos do edital** (em especial PDF) para que a IA entenda como aquele edital funciona.
- Cada projeto está **vinculado a um edital**; obrigatoriedades, critérios de avaliação e modelo de orçamento são extraídos e aplicados a esse projeto.
- **Checklists e estrutura recomendada** são gerados automaticamente com base no edital.

---

## 2. Estrutura Padrão de um Projeto (Abas/Seções)
Cada projeto contém as seguintes áreas, alinhadas ao que editais tipicamente exigem:

| Seção | Descrição |
|-------|------------|
| **Identificação** | Dados do projeto e do proponente |
| **Justificativa** | Por que o projeto é necessário e relevante |
| **Objetivos** | O que se pretende alcançar |
| **Metas** | Metas mensuráveis e prazos |
| **Público-alvo** | Quem será beneficiado |
| **Cronograma** | Linha do tempo e fases |
| **Orçamento** | Planilha orçamentária e tetos |
| **Contrapartidas** | O que o projeto oferece em contrapartida |
| **Acessibilidade** | Medidas de acessibilidade |
| **Impacto social** | Efeitos esperados na sociedade |
| **Plano de comunicação** | Divulgação e visibilidade |

Cada seção pode ser customizada ou estendida conforme o edital (ex.: categorias e eixos específicos).

---

## 3. Comportamento por Campo/Seção
- **Editor rico** para redação do conteúdo.
- **Score de 0 a 10** por campo, conforme coerência e aderência ao edital.
- **Análise de coerência interna** do texto.
- **Sugestões de melhoria** para atingir nota 10.
- **Alertas de inconsistência** (ex.: orçamento alto com público estimado pequeno → sugerir justificativa ou revisão).

---

## 4. Eixos de Score (Sistema de Score Inteligente)
A aplicação avalia o projeto em múltiplos eixos, podendo ser consolidados em uma **probabilidade estimada de aprovação** (mesmo que heurística):

- Coerência narrativa  
- Aderência ao edital  
- Clareza técnica  
- Viabilidade orçamentária  
- Impacto social  
- Acessibilidade  
- Capacidade de execução  

---

## 5. Planilha Orçamentária Conectada
- **Cadastro de equipe** (PF e PJ): função, carga horária, cachê, encargos, impostos (INSS, ISS, etc.).
- **Cálculos automáticos**: soma total, percentuais por categoria, custos administrativos.
- **Validação**: tetos de gastos, limites do edital, alertas quando ultrapassar.
- **Vínculo** entre cada profissional na equipe e itens da planilha (cachê, encargos).

---

## 6. Gestão de Equipe
- **Perfis de colaboradores**: currículo artístico, portfólio, histórico de projetos.
- **Banco interno** de currículos reutilizáveis entre projetos.
- **Checklist por funcionário**: cada profissional tem um checklist de documentos exigidos pelo edital (carta de anuência, orçamento individual, documentação específica). Cada edital define o que é obrigatório.
- Funcionários cadastrados **aparecem na planilha orçamentária**, respeitando tetos.

---

## 7. Parser e IA a partir do Edital (PDF)
- **Upload de PDF** do edital.
- **Parser** (automático/assistido) para:
  - Identificar **categorias** do edital.
  - Extrair **critérios de avaliação**.
  - Extrair **documentação obrigatória**.
  - Extrair **modelo de orçamento** (rubricas, tetos).
- **IA gera**:
  - Checklist automático do projeto.
  - Estrutura recomendada do projeto (seções e orientações).
- **Ferramentas adicionais**:
  - Marcação automática de **trechos ambíguos** no edital.
  - **Resumo executivo** do edital.

---

## 8. Assistente de Coerência Global
A IA detecta conflitos entre seções, por exemplo:
- Projeto declara acessibilidade → mas não há orçamento para acessibilidade.
- Projeto prioriza periferia → mas equipe toda do centro.
- Público-alvo infantil → mas linguagem excessivamente técnica.

Deve sugerir correções ou justificativas.

---

## 9. Simulador de Avaliação (Modo Avaliador)
- A IA assume o papel de **parecerista** e produz um **parecer crítico realista** sobre o projeto, como se estivesse avaliando para o edital.

---

## 10. Cronograma (Linha do Tempo Inteligente)
- Cronograma **conectado ao orçamento** (fases com custos).
- **Alertas** de sobreposição de atividades ou prazos inconsistentes.
- **Distribuição automática** da equipe por fase (quem atua em qual período).

---

## 11. Análise de Diversidade e Inclusão
- Análise da **representatividade da equipe**: gênero, raça, território, acessibilidade.
- **Sugestões estratégicas** de melhoria para alinhamento a editais que valorizam diversidade.

---

## 12. Gerador de Documentos Automáticos
Geração automática de:
- Declarações  
- Currículos resumidos  
- Cartas de anuência  
- Planos de acessibilidade  
- Plano de comunicação  

Conteúdo baseado nos dados do projeto e no que o edital exige.

---

## Relacionamentos
- [Project Intent](project-intent.md)
- Features: [Edital Upload/Parser](feature-edital-upload-parser.md), [Project Sections](feature-project-sections.md), [Scoring](feature-scoring-system.md), [Budget](feature-budget-management.md), [Team](feature-team-management.md), [Checklist](feature-checklist.md), [Coherence/Simulator](feature-coherence-and-simulator.md), [Timeline](feature-timeline.md), [Diversity/Inclusion](feature-diversity-inclusion.md), [Document Generator](feature-document-generator.md), [Project Detail](feature-project-detail.md).

## Status
- **Created**: 2026-02-26
- **Status**: Active
- **Note**: Regras de negócio consolidadas para a aplicação de projetos culturais para editais.
