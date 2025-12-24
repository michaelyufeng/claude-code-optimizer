# {{PROJECT_NAME}}

> Mode: Full | {{DATE}} | v1.0.0

## Overview

{{PROJECT_DESCRIPTION}}

**Type**: {{PROJECT_TYPE}} | **Scale**: {{PROJECT_SCALE}} | **Team**: {{TEAM_SIZE}}

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Language | {{LANGUAGE}} | {{LANG_VERSION}} |
| Framework | {{FRAMEWORK}} | {{FRAMEWORK_VERSION}} |
| Database | {{DATABASE}} | {{DB_VERSION}} |
| Deployment | {{DEPLOYMENT}} | - |

## Architecture

```
Frontend ({{FRONTEND_TECH}}) → API → Backend ({{BACKEND_TECH}}) → Database
```

## Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── app/        # Application entry
│   ├── components/ # UI components
│   ├── lib/        # Utilities
│   ├── services/   # Business logic
│   └── types/      # Type definitions
├── tests/          # Unit & E2E tests
└── docs/           # Documentation
```

## Commands

```bash
{{DEV_COMMAND}}       # Development
{{TEST_COMMAND}}      # Run tests
{{BUILD_COMMAND}}     # Build
{{DEPLOY_COMMAND}}    # Deploy
```

## Coding Standards

- Style: {{CODE_STYLE}}
- Files: kebab-case | Components: PascalCase | Functions: camelCase
- Git: Conventional Commits, PR required

## Current Status

**Phase**: {{CURRENT_PHASE}} | **Progress**: {{PROGRESS}}%

## Task Checklist

- [ ] {{CURRENT_TASK}}
- [ ] {{TODO_1}}
- [ ] {{TODO_2}}

## Constraints

**MUST**: {{MUST_RULE_1}}, {{MUST_RULE_2}}
**SHOULD**: {{SHOULD_RULE_1}}

## Key Decisions

| Date | Decision | Reason |
|------|----------|--------|
| {{DATE}} | {{DECISION_1}} | {{REASON_1}} |

---

## Self-Driving Rules (Full Mode - Strict)

### Session Start (MUST)
Always check `.claude/state.json`, `CHECKPOINT.md`, `docs/DECISIONS.md`.
Display comprehensive recovery:
```
Project: [name] | Phase: [phase] | Progress: [X%]
Task: [current] | Subtask: [current subtask]
Key decisions: [list]
[Resume] [Full Details] [Fresh Start]
```

### Task Assessment (MUST - Strict)
**All tasks require complexity analysis**:
- **S/M**: Proceed with checklist
- **L**: Breakdown required, show plan
- **XL**: Mandatory breakdown + phased execution

### 4-Phase Workflow (MUST)
```
RESEARCH: Understand, explore, identify dependencies
PLAN: Design solution, create checklist, get confirmation
IMPLEMENT: Tests first, incremental, update checklist
VALIDATE: Run tests, self-review, document
```

### Thinking Frameworks (MUST)
| Task | Mandatory Focus |
|------|-----------------|
| Requirements | Why, edge cases, assumptions |
| Architecture | Multiple approaches, trade-offs, document decisions |
| Implementation | Tests first, edge cases, minimal changes |
| Review | Security, performance, maintainability |

### Progress Tracking (MUST - Strict)
- Start subtask: Announce
- Complete subtask: Report + progress bar + next step
- Key decision: Record with rationale

### Context Protection (MUST - Strict)
| Trigger | Action |
|---------|--------|
| 10+ turns | Show context estimate |
| 15+ turns | Suggest checkpoint |
| 20+ turns | Strongly recommend save |
| M+ subtask done | Auto-suggest save |
| Task switch | Require checkpoint |

### State Persistence (MUST)
**CHECKPOINT.md** (human-readable):
```
# Checkpoint - [timestamp]
## Task: [name]
## Progress: [T1] ✓ [T2] ✓ [T3] ← IN PROGRESS [T4] pending
## Current: [specific work]
## Decisions: [key decisions]
## Files: [modified files]
## Resume: [exact point]
```

**.claude/state.json** (machine):
```json
{"task": {"name": "", "progress": 0, "subtasks": []}, "decisions": []}
```

### Phase Commands (Optional)
Enable with: `/project-optimizer:gate1`, `/project-optimizer:gate2`

---
<!-- Full Mode | Strict rules for large projects -->
