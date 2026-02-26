# Pattern: Project List Card

## Description
A UI pattern for displaying a summary card for each project in a grid or list, showing key information and providing navigation to the project detail page.

## When to Use
Use when you need to present multiple projects in an organized, scannable way, allowing users to quickly access details or actions for each project.

## Pattern
- Render a card for each project with name, category, progress, and key stats
- Include navigation (e.g., link or button) to project detail
- Use badges, icons, and progress bars for visual clarity

## Example
```tsx
<Card>
  <CardHeader>
    <CardTitle>{project.name}</CardTitle>
  </CardHeader>
  <CardContent>
    <Badge>{project.category}</Badge>
    <Progress value={calculateProgress(project)} />
    <div className={getScoreColor(calculateOverallScore(project))}>
      {calculateOverallScore(project)}%
    </div>
    <Button as={Link} to={`/project/${project.id}`}>Ver Detalhes</Button>
  </CardContent>
</Card>
```

## Files Using This Pattern
- [src/app/pages/ProjectsPage.tsx] - Used to render the project grid/list

## Related
- [Decision: Tech Stack](../../decisions/001-tech-stack.md)
- [Feature: Project Listing and Navigation](../../intent/feature-project-listing.md)

## Status
- **Created**: 2026-02-26
- **Status**: Active
