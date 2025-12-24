# {{PROJECT_NAME}}

> Mode: Quick | Created: {{DATE}}

## Project Overview

{{PROJECT_DESCRIPTION}}

## Tech Stack

- Language: {{LANGUAGE}}
- Framework: {{FRAMEWORK}}
- Other: {{OTHER_TECH}}

## Commands

```bash
{{DEV_COMMAND}}      # Development
{{TEST_COMMAND}}     # Test
{{BUILD_COMMAND}}    # Build
```

## Coding Standards

- Style: {{CODE_STYLE}}
- Naming: {{NAMING_CONVENTION}}

## Current Tasks

- [ ] {{TASK_1}}
- [ ] {{TASK_2}}

## Constraints

- {{CONSTRAINT_1}}
- {{CONSTRAINT_2}}

---

## Self-Driving Rules (Quick Mode)

### Session Start
- Check if `CHECKPOINT.md` exists
- If exists and recent, briefly mention: "Detected previous progress. Continue or start fresh?"

### During Work
- For simple tasks: execute directly
- For complex tasks (5+ files): suggest using a checklist
- After long conversations (15+ turns): remind to save progress

### Progress Saving
When saving progress, create/update `CHECKPOINT.md`:
```markdown
# Checkpoint - [timestamp]
## Task: [current task]
## Completed: [list]
## In Progress: [current work]
## Next Steps: [remaining]
## Key Files: [modified files]
```

---
<!-- Quick Mode | Run /project-optimizer:upgrade for more features -->
