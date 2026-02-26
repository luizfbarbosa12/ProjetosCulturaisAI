# Pattern: Budget Table

## Description
A table pattern for displaying and managing budget items, including category, description, and amount, with total and category breakdowns.

## When to Use
Use when users need to review or edit budget allocations for a project.

## Pattern
- Table with columns for category, description, amount
- Row for each budget item
- Footer or summary for totals

## Example
```tsx
<table>
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Descrição</th>
      <th>Valor</th>
    </tr>
  </thead>
  <tbody>
    {project.budgetItems.map(item => (
      <tr key={item.id}>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>{item.amount}</td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan={2}>Total</td>
      <td>{getTotalBudget(project)}</td>
    </tr>
  </tfoot>
</table>
```

## Files Using This Pattern
- [src/app/pages/ProjectDetailPage.tsx] - Used for budget management

## Related
- [Decision: Tech Stack](../../decisions/001-tech-stack.md)
- [Feature: Budget Management](../../intent/feature-budget-management.md)

## Status
- **Created**: 2026-02-26
- **Status**: Active
