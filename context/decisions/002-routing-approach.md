# Decision: Routing Approach

## Context
The application requires client-side routing to support navigation between project lists and detail pages.

## Decision
Use `react-router` for client-side routing.

## Rationale
`react-router` is a widely used, flexible routing library for React applications. It supports nested routes and dynamic parameters, which are needed for project detail navigation.

## Alternatives Considered
- Next.js App Router (not used, likely due to SPA focus)
- Reach Router (not used, less popular)

Alternatives not documented in existing codebase.

## Outcomes
Outcomes to be documented as project evolves.

## Related
- [Project Intent](../intent/project-intent.md)
- [Feature: Project Listing and Navigation](../intent/feature-project-listing.md)
- [Feature: Project Detail and Scoring](../intent/feature-project-detail.md)

## Status
- **Created**: 2026-02-26 (Phase: Intent)
- **Status**: Accepted
- **Note**: Documented from existing implementation
