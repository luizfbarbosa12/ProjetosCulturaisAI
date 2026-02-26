# Pattern: Checklist UI

## Description
A UI pattern for displaying and managing a checklist of required items for a project, with checkboxes and progress tracking.

## When to Use
Use when users need to track completion of multiple requirements or steps for a project.

## Pattern
- List of checklist items with checkboxes
- Progress bar showing completion percentage
- Option to mark items as complete/incomplete

## Example
```tsx
<ul>
  {project.checklist.map(item => (
    <li key={item.id}>
      <Checkbox checked={item.completed} />
      {item.title}
    </li>
  ))}
</ul>
<Progress value={calculateProgress(project)} />
```

## Files Using This Pattern
- [src/app/pages/ProjectDetailPage.tsx] - Used for checklist management

## Related
- [Decision: Tech Stack](../../decisions/001-tech-stack.md)
- [Feature: Project Checklist](../../intent/feature-checklist.md)

## Status
- **Created**: 2026-02-26
- **Status**: Active
