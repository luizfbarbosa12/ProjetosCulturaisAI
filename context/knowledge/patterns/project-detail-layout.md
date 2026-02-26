# Pattern: Project Detail Layout

## Description
A UI layout pattern for displaying all relevant information about a single project, including sections, scores, budget, and checklist, in a clear and organized way.

## When to Use
Use for detail pages where users need to review, analyze, and manage all aspects of a project.

## Pattern
- Header with project name and navigation
- Tabs or sections for details, budget, checklist
- Use cards, badges, and progress bars for visual structure

## Example
```tsx
<div className="min-h-screen bg-gray-50">
  <div className="bg-white border-b">
    <h1>{project.name}</h1>
  </div>
  <Tabs>
    <TabsList>
      <TabsTrigger value="details">Detalhes</TabsTrigger>
      <TabsTrigger value="budget">Orçamento</TabsTrigger>
      <TabsTrigger value="checklist">Checklist</TabsTrigger>
    </TabsList>
    <TabsContent value="details">...</TabsContent>
    <TabsContent value="budget">...</TabsContent>
    <TabsContent value="checklist">...</TabsContent>
  </Tabs>
</div>
```

## Files Using This Pattern
- [src/app/pages/ProjectDetailPage.tsx] - Used for the project detail view

## Related
- [Decision: Tech Stack](../../decisions/001-tech-stack.md)
- [Feature: Project Detail and Scoring](../../intent/feature-project-detail.md)

## Status
- **Created**: 2026-02-26
- **Status**: Active
