---
description: Save progress checkpoint for long tasks or context switching
---

# Save Checkpoint

Save current progress for session continuity. Creates human-readable `CHECKPOINT.md` and optionally updates `.claude/state.json`.

## When to Use

- Long conversation (15+ turns)
- Before switching tasks
- Complex task in progress
- Context feels heavy
- User requests save

## Output Format

Create/update `CHECKPOINT.md`:

```markdown
# Checkpoint - [ISO timestamp]

## Task
$ARGUMENTS (or current task if not specified)

## Progress
```
[T1] [x] [Completed subtask 1]
[T2] [x] [Completed subtask 2]
[T3] [ ] [Current subtask] <- IN PROGRESS
[T4] [ ] [Pending subtask]
```

Overall: [X%] complete

## Current Work
- Working on: [specific current task]
- File: [current file path]
- Status: [what's done, what's next]

## Key Decisions
| Decision | Reason |
|----------|--------|
| [choice made] | [why this choice] |

## Modified Files
- `path/file1.ts` - [what changed]
- `path/file2.ts` - [what changed]

## Open Questions
- [ ] [unresolved question]

## Next Steps
1. [immediate next action]
2. [following action]

## Resume Instructions
To continue:
1. Read this file
2. Check modified files above
3. Continue from: [exact resume point]
```

## State Update (Optional)

If `.claude/` directory exists, also update `.claude/state.json`:

```json
{
  "lastUpdated": "[ISO timestamp]",
  "task": {
    "name": "[task]",
    "progress": [X],
    "currentSubtask": "[subtask]"
  },
  "modifiedFiles": ["path/file1.ts", "path/file2.ts"],
  "decisions": [{"decision": "[what]", "reason": "[why]"}]
}
```

## After Saving

Display confirmation:
```
Checkpoint saved!

File: CHECKPOINT.md
Progress: [X%]
Next: [resume point]

Safe to close session.
```
