# Decision: Frontend Architecture and Tooling

## Context
The application needs a consistent, scalable frontend base: linting, formatting, pre-commit checks, tests, folder structure, and code standards so the repository is ready for sustained development. The codebase currently has no ESLint, Prettier, pre-commit hooks, or tests; pages contain mixed UI and logic. We need documented choices that favor simplicity and avoid overengineering.

## Decision
- **Linting:** ESLint with TypeScript (flat config), strict on `any` and unused code; style delegated to Prettier.
- **Formatting:** Prettier as single source of truth for code style; use eslint-config-prettier to avoid conflicts.
- **Pre-commit:** Husky + lint-staged to run lint and format on staged files before commit.
- **Tests:** Vitest as test runner; React Testing Library for component tests; focus on utils, hooks, and critical flows first; no mandatory 100% coverage from day one.
- **Folder structure:** Follow the structure and rules described in [Frontend Architecture and Code Standards](../knowledge/frontend-architecture-and-code-standards.md) (e.g. `pages/`, `components/ui/`, `components/features/`, `hooks/`, `utils/`, `types/`, `services/` when needed).
- **Code standards:** SOLID, Clean Code, DRY, KISS, strict typing, and clean-architecture principles applied in a pragmatic way; simplicity first; avoid overengineering.

All detailed practices (folder layout, patterns, componentization, typing, anti-overengineering) are documented in the knowledge document above; this decision only records the tooling and structural choices.

## Rationale
- ESLint + Prettier: industry standard; keeps code consistent and catches common errors.
- Pre-commit: prevents broken or unformatted code from being committed without blocking workflow.
- Vitest: aligns with Vite, fast feedback; RTL encourages accessible, behavior-focused tests.
- Single standards document: one place for architecture and code patterns so the team and AI agents can follow the same rules.

## Alternatives Considered
- Jest instead of Vitest: Vitest chosen for Vite ecosystem and speed.
- Heavy layered architecture (many modules/domains from day one): rejected in favor of a simple structure that can grow when needed.
- Strict 100% coverage from start: rejected to avoid overhead; grow coverage incrementally.

## Outcomes
To be observed after adoption: fewer lint/format issues in PRs, faster onboarding, consistent structure.

## Related
- [Project Intent](../intent/project-intent.md)
- [Tech Stack](001-tech-stack.md)
- [Frontend Architecture and Code Standards](../knowledge/frontend-architecture-and-code-standards.md)

## Status
- **Created**: 2026-02-26
- **Status**: Accepted
