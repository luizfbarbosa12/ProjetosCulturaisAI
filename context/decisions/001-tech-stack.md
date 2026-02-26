# Decision: Tech Stack

## Context
The project is a modern web application for managing cultural projects, requiring a robust UI, state management, and support for rapid development and prototyping.

## Decision
- Use React for UI development
- Use Vite as the build tool and dev server
- Use TypeScript for type safety
- Use Radix UI and MUI for UI components
- Use Tailwind CSS for styling
- Use pnpm for package management

## Rationale
React provides a flexible and widely adopted framework for building complex UIs. Vite offers fast development and build times. TypeScript improves code quality and maintainability. Radix UI and MUI offer accessible, composable UI primitives. Tailwind CSS enables rapid, utility-first styling. pnpm is efficient for managing dependencies.

## Alternatives Considered
- Next.js or CRA for app scaffolding (not used, likely for simplicity or SPA focus)
- npm or yarn for package management (pnpm chosen for speed/efficiency)
- Other UI libraries (e.g., Chakra UI, Ant Design)

Alternatives not documented in existing codebase.

## Outcomes
Outcomes to be documented as project evolves.

## Related
- [Project Intent](../intent/project-intent.md)
- [Feature: Project Listing and Navigation](../intent/feature-project-listing.md)
- [Feature: Project Detail and Scoring](../intent/feature-project-detail.md)
- [Feature: Budget Management](../intent/feature-budget-management.md)
- [Feature: Project Checklist](../intent/feature-checklist.md)

## Status
- **Created**: 2026-02-26 (Phase: Intent)
- **Status**: Accepted
- **Note**: Documented from existing implementation
