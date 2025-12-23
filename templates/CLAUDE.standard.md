# {{PROJECT_NAME}}

> Mode: Standard | {{DATE}} | v1.0.0

## Overview

{{PROJECT_DESCRIPTION}}

**Type**: {{PROJECT_TYPE}} | **Scale**: {{PROJECT_SCALE}}

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | {{LANGUAGE}} |
| Framework | {{FRAMEWORK}} |
| Database | {{DATABASE}} |

## Structure

```
{{PROJECT_NAME}}/
├── src/           # Source code
├── tests/         # Tests
└── docs/          # Documentation
```

## Commands

```bash
{{DEV_COMMAND}}       # Development
{{TEST_COMMAND}}      # Run tests
{{BUILD_COMMAND}}     # Build
```

## Coding Standards

- Style: {{CODE_STYLE}}
- Files: {{FILE_NAMING}} | Variables: {{VAR_NAMING}}
- Git: `feat:`, `fix:`, `docs:`, `refactor:`

## Current Tasks

- [ ] {{CURRENT_TASK}}
- [ ] {{TODO_1}}

## Constraints

**MUST**: {{MUST_RULE_1}}
**SHOULD**: {{SHOULD_RULE_1}}

---

## Self-Driving Rules (Standard Mode)

### Session Start (MUST)
Check `.claude/state.json` and `CHECKPOINT.md`. If unfinished work exists:
```
Previous session: [task] | Progress: [X%] | Last: [time]
[Resume] [Details] [Fresh Start]
```

### Task Assessment (MUST)
Evaluate complexity for new tasks:
- **S** (single file, <50 lines): Execute directly
- **M** (2-5 files, 50-200 lines): Suggest checklist
- **L** (5+ files, 200+ lines): Recommend breakdown
- **XL** (15+ files): Require breakdown

### Workflow Guidance (SHOULD)
4-phase approach: Research → Plan → Implement → Validate

### Thinking Frameworks (SHOULD)
| Task | Focus |
|------|-------|
| Requirements | Ask "why", clarify, find edge cases |
| Architecture | Trade-offs, scalability |
| Implementation | Tests first, minimal changes |
| Review | Security, performance |

### Progress Tracking (MUST)
After subtask completion: Report progress, update checklist

### Context Protection (MUST)
- 15+ turns: Suggest save
- 10+ files: Recommend checkpoint
- Before task switch: Require save

### State Format
`CHECKPOINT.md`: Human-readable progress
`.claude/state.json`: Machine state (optional)

---
<!-- Standard Mode | /project-optimizer:upgrade for Full Mode -->
