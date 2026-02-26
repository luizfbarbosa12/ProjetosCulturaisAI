# AGENTS.md

## Setup Commands
- Install: `pnpm i`
- Dev: `pnpm run dev`
- Test: (not defined)
- Build: `pnpm run build`

## Code Style
- TypeScript with React
- Utility-first CSS (Tailwind)
- Component-based UI (Radix UI, MUI)
- Follow patterns from `@context/knowledge/patterns/`

## Context Files to Load

Before starting any work, load relevant context:
- @context/intent/project-intent.md (always)
- @context/intent/feature-*.md (for specific feature)
- @context/decisions/*.md (relevant decisions)
- @context/knowledge/patterns/*.md (patterns to follow)

## Project Structure
root/
├── AGENTS.md
├── context/
│   ├── intent/
│   ├── decisions/
│   ├── knowledge/
│   ├── agents/
│   └── evolution/
└── [existing code]

## AI Agent Rules

### Always
- Load context before implementing
- Follow decisions from @context/decisions/
- Use patterns from @context/knowledge/patterns/
- Update context after any changes

### Never
- Ignore documented decisions
- Use anti-patterns from @context/knowledge/anti-patterns/
- Leave context stale after changes

### After Any Changes (Critical)
AI must update Context Mesh after changes:
- Update relevant feature intent if functionality changed
- Add outcomes to decision files if approach differed
   - Update changelog.md
- Create learning-*.md if significant insights

## Definition of Done (Build Phase)

Before completing any implementation:
- [ ] ADR exists before implementation
- [ ] Code follows documented patterns
- [ ] Decisions respected
- [ ] Tests passing
- [ ] Context updated to reflect changes
- [ ] Changelog updated

---

**Note**: This is a basic AGENTS.md template. For a complete template with advanced features (File Creation Rules, Execution Agents, etc.), see `examples/AGENTS.md.example`.
