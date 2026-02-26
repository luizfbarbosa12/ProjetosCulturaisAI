# Arquitetura Frontend e Padrões de Código

Documento de referência para construção e escalabilidade do frontend da aplicação de projetos culturais. Inclui ferramentas (lint, format, pre-commit, testes), organização de pastas, princípios (SOLID, Clean Code, DRY, KISS), tipagem, arquitetura limpa e cuidado contra overengineering.

**Relacionado:** [Decision 003: Frontend Architecture and Tooling](../decisions/003-frontend-architecture-and-tooling.md)

---

## 1. Princípio central: simplicidade primeiro

- **Evitar overengineering:** não criar soluções hiper complexas para problemas simples. Resolver da forma mais simples que atenda ao requisito e seja mantível.
- **Escalar quando necessário:** introduzir camadas, abstrações ou bibliotecas só quando a complexidade real justificar (ex.: estado global quando várias telas precisam do mesmo dado; não “por precaução”).
- **YAGNI (You Aren’t Gonna Need It):** não implementar coisas “para o futuro” sem necessidade concreta.

---

## 2. Ferramentas e pipeline

### 2.1 Linting (ESLint)

- **ESLint** como linter base.
- **@typescript-eslint** para regras TypeScript (parsing e type-aware rules quando fizer sentido).
- Regras recomendadas:
  - Erro para `any` implícito; preferir tipos explícitos ou `unknown`.
  - Erro para variáveis e imports não utilizados.
  - Regras de consistência (aspas, ponto e vírgula) delegadas ao Prettier quando possível para evitar conflito.
- Configuração em `eslint.config.js` (flat config) na raiz do projeto.
- **Não** adicionar dezenas de regras de uma vez: começar com um conjunto mínimo e ir ampliando conforme o time sente necessidade.

### 2.2 Formatação (Prettier)

- **Prettier** como formatador único para estilo (indentação, aspas, quebras de linha, etc.).
- Arquivo de config: `.prettierrc` (ou `prettier.config.js`) na raiz.
- Integração: ESLint não deve disputar estilo com Prettier; usar `eslint-config-prettier` para desativar regras de estilo no ESLint.
- Opcional: `.prettierignore` para build, node_modules, arquivos gerados.

### 2.3 Pre-commit

- **Husky** para hooks de Git; **lint-staged** para rodar comandos apenas nos arquivos staged.
- No **pre-commit**:
  - `lint-staged`: lint + format nos arquivos staged (ex.: `eslint --fix`, `prettier --write`).
  - Opcional: `tsc --noEmit` para checagem de tipos (pode ser só em CI se o pre-commit ficar lento).
- Objetivo: impedir commit de código que quebra lint ou formatação; manter o repositório consistente sem burocracia excessiva.

### 2.4 Testes

- **Vitest** como runner de testes (alinhado ao Vite, rápido, compatível com Jest).
- **React Testing Library** para testes de componentes React (foco em comportamento do usuário, evitar detalhes de implementação).
- Onde testar (prioridade):
  - Utilitários e funções puras (cálculos, formatação, validações).
  - Hooks customizados com lógica relevante.
  - Componentes de UI críticos e fluxos principais (ex.: formulários, navegação).
- **Não** exigir cobertura 100% desde o dia 1: começar por regras de negócio e fluxos críticos; aumentar cobertura de forma incremental.
- Scripts em `package.json`: `test`, `test:run`, `test:coverage` conforme convenção do Vitest.

---

## 3. Organização de pastas (frontend)

Estrutura sugerida, simples e escalável, dentro de `src/`:

```
src/
├── app/                    # Ponto de entrada e configuração da aplicação
│   ├── App.tsx
│   ├── main.tsx
│   └── routes.tsx
├── pages/                  # Páginas (rotas); preferir um arquivo por rota
│   ├── ProjectsPage.tsx
│   └── ProjectDetailPage.tsx
├── components/             # Componentes reutilizáveis
│   ├── ui/                 # Primitivos e componentes de design system (Radix, etc.)
│   ├── layout/             # Header, Sidebar, PageLayout (opcional)
│   └── features/           # Componentes por feature (ex.: ProjectCard, SectionEditor) quando crescer
├── hooks/                  # Hooks customizados (ex.: useProject, useBudgetTotals)
├── services/               # Chamadas a APIs e lógica de dados (quando houver backend)
├── store/                  # Estado global (ex.: Zustand/Context) só se necessário
├── types/                  # Tipos e interfaces globais do domínio
├── utils/                  # Funções puras (formatação, cálculos, validação)
├── constants/              # Constantes da aplicação (opcional)
└── styles/                 # CSS global, Tailwind, temas
```

Regras práticas:

- **pages/**：um componente por rota; páginas orquestram layout e composição de componentes; evitar lógica de negócio pesada dentro da página (extrair para hooks/utils).
- **components/ui/**：componentes genéricos e sem dependência de regra de negócio (botão, card, input, tabela).
- **components/features/** (ou `components/` com subpastas por domínio): componentes que representam um conceito do negócio (ex.: `ProjectCard`, `BudgetTable`, `ChecklistBlock`). Criar quando houver reuso ou quando a página ficar grande demais.
- **hooks/**：lógica reutilizável e estado associado a UI (ex.: `useProject(id)`, `useChecklistProgress(project)`).
- **utils/**：funções puras, fáceis de testar; sem dependência de React.
- **types/**：tipos compartilhados; pode ter subpastas por domínio (ex.: `types/project.ts`, `types/budget.ts`) conforme crescer.
- **services/**：quando existir API; um módulo por “recurso” (ex.: `projectService`, `editalService`).

Não criar muitas pastas vazias “por arquitetura”: adicionar pastas quando houver arquivos que as justifiquem.

---

## 4. Design patterns e componentização

### 4.1 Composição sobre configuração

- Preferir componentes que compõem filhos (children, slots) em vez de muitos props de configuração.
- Exemplo: layout de página com slots (header, content, sidebar) em vez de um componente “mágico” com dezenas de props.

### 4.2 Container / Presentational (quando fizer sentido)

- **Presentational:** componente que só recebe props e renderiza; sem chamadas a API, sem estado de negócio; fácil de testar.
- **Container:** orquestra dados (hooks, services) e passa para o presentational.
- Usar quando um componente começar a misturar muita lógica e UI; não obrigatório em todo lugar (evitar overengineering: componente pequeno pode ser único).

### 4.3 Um componente por arquivo; nome do arquivo = nome do componente

- Arquivo: `ProjectCard.tsx` → componente exportado `ProjectCard` (ou `ProjectCard` como default).
- Componentes muito pequenos e usados só em um lugar podem ficar no mesmo arquivo do pai, se isso simplificar (KISS).

### 4.4 Extração de lógica para hooks e utils

- Cálculos como “score geral”, “progresso do checklist”, “total e percentual por categoria” devem sair das páginas e ir para:
  - **utils/** se forem funções puras (ex.: `calculateOverallScore(sections)`).
  - **hooks/** se dependem de estado/efeitos (ex.: `useProjectScore(project)` que pode no futuro vir de API).
- Isso reduz duplicação (DRY) e facilita testes.

---

## 5. Princípios SOLID (aplicados ao frontend)

- **S (Single Responsibility):** cada componente, hook ou módulo com uma responsabilidade clara. Ex.: um componente que só exibe um card de projeto; a lógica de “como calcular o score” fica em outro lugar.
- **O (Open/Closed):** extensão por composição e props (ex.: variantes de botão por `variant`) em vez de alterar o componente base a cada novo caso. Não abusar de abstrações “para o futuro”.
- **L (Liskov):** ao usar herança ou substituição de componentes, manter contrato (mesmas props essenciais, mesmo comportamento esperado). No React, isso se traduz em tipar bem as props e não quebrar expectativas de quem consome.
- **I (Interface Segregation):** interfaces (tipos) enxutas; o componente não deve receber 20 props se só usa 5. Quebrar em componentes menores ou em objetos de config quando fizer sentido.
- **D (Dependency Inversion):** depender de abstrações (ex.: “repositório de projeto”) quando houver camada de dados; na prática, usar tipos e injeção por props/contexto em vez de importar implementação concreta direto. Em frontend simples, não criar camadas desnecessárias.

Aplicar com pragmatismo: não inventar interfaces e camadas só para “cumprir” SOLID; usar quando reduzir acoplamento e facilitar testes/manutenção.

---

## 6. Tipagem (TypeScript)

- **Modo estrito:** `strict: true` no `tsconfig.json`.
- **Evitar `any`:** usar `unknown` e type guards quando o tipo for realmente dinâmico; tipar eventos e refs.
- **Interfaces para contratos:** domínio (Project, BudgetItem, ChecklistItem, etc.) em `types/`; props de componentes podem ser interfaces no próprio arquivo ou em types quando compartilhadas.
- **Tipagem de componentes:** tipar props com interface; usar `React.FC` ou não conforme preferência do time (hoje é comum não usar `React.FC` e tipar apenas as props).
- **Tipagem de eventos:** usar `React.ChangeEvent<HTMLInputElement>`, etc., em vez de tipos genéricos.
- **Reuso:** tipos derivados com `Pick`, `Omit`, `Partial` quando evitar duplicação sem criar complexidade.

---

## 7. Arquitetura limpa (simplificada)

Camadas entendidas de forma leve:

- **UI (pages + components):** só exibem e delegam ações; não contêm regras de negócio pesadas nem detalhes de persistência.
- **Domínio (types + utils de regra de negócio):** entidades e cálculos puros (ex.: “como calcular score”, “o que é um projeto válido”). Sem dependência de React ou de API.
- **Dados (services + store quando houver):** acesso a API, cache, estado global; conversão de DTO para modelos de domínio quando necessário.

Regra prática: a UI não deve “saber” se os dados vêm de mock, REST ou GraphQL; ela consome “dados de projeto” via props/hooks. A camada de dados é que sabe onde buscar. Isso permite trocar mock por API sem refatorar páginas inteiras.

Não criar camadas “vazias” (ex.: repositórios que só repassam uma chamada): cada camada deve ter responsabilidade clara.

---

## 8. Clean Code, DRY e KISS

### 8.1 Nomes significativos

- Variáveis e funções com nomes que expliquem o propósito; evitar abreviações obscuras.
- Constantes com nome em maiúsculas quando forem realmente constantes (ex.: `MAX_BUDGET_PERCENTAGE`).

### 8.2 Funções pequenas e diretas

- Funções que fazem uma coisa; preferir funções curtas; parâmetros poucos (se muitos, agrupar em objeto com tipo).
- Evitar aninhamento profundo; early return para deixar o fluxo legível.

### 8.3 DRY (Don’t Repeat Yourself)

- Código duplicado em 2+ lugares: extrair para função, hook ou componente.
- Duplicação de **conceito** (ex.: “como calcular progresso”) deve viver em um único lugar (utils ou hooks).
- Não DRY em excesso: duas funções parecidas mas com propósitos diferentes podem permanecer separadas se unificá-las deixar o código menos claro (KISS).

### 8.4 KISS (Keep It Simple, Stupid)

- Solução mais simples que funcione e seja legível.
- Preferir código explícito a “esperto”; evitar otimizações prematuras.
- Comentários para “por quê”, não para “o quê” (o código deve dizer o quê).

---

## 9. Resumo de prioridades

1. **Simplicidade:** evitar overengineering; resolver com a solução mais simples adequada.
2. **Consistência:** lint + Prettier + pre-commit para manter padrão no repositório.
3. **Testes:** começar por utils e fluxos críticos; Vitest + RTL.
4. **Organização:** pastas claras (pages, components, hooks, utils, types, services); extrair quando o arquivo ou a duplicação crescer.
5. **Tipagem:** TypeScript estrito; domínio bem tipado em `types/`.
6. **Separação de responsabilidades:** UI orquestra; lógica de negócio em utils/hooks; dados em services/store quando existir backend.
7. **DRY e KISS:** eliminar duplicação onde fizer sentido; não complicar em nome de reuso teórico.

---

## Relacionamentos

- [Decision 003: Frontend Architecture and Tooling](../decisions/003-frontend-architecture-and-tooling.md)
- [Context Mesh Framework](../.context-mesh-framework.md)
- [Tech Stack](../decisions/001-tech-stack.md)
- Patterns de UI: [Project List Card](patterns/project-list-card.md), [Project Detail Layout](patterns/project-detail-layout.md), [Budget Table](patterns/budget-table.md), [Checklist UI](patterns/checklist-ui.md)

## Status

- **Created**: 2026-02-26
- **Status**: Active
- **Note**: Referência para preparação do repositório e desenvolvimento do frontend.
