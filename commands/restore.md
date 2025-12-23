---
description: Restore context and state from checkpoint for session continuity
---

# Restore Checkpoint

Restore previous session's context and progress. This command is typically called automatically at session start based on CLAUDE.md rules.

## Automatic Detection

At session start, check for existing state:

1. Check `CHECKPOINT.md` in project root
2. Check `.claude/state.json` if exists
3. If found, display recovery prompt

## Recovery Prompt

```
Previous session detected!

Last activity: [time ago]
Task: [task name]
Progress: [X%] ([completed]/[total] subtasks)

Current subtask: [subtask name]
Status: [in progress / blocked / etc.]

Actions:
[1] Resume work (recommended)
[2] View full details
[3] Start fresh (keep checkpoint)
```

## Resume Flow

When user chooses to resume:

1. **Read CHECKPOINT.md**
   - Parse progress status
   - Load key decisions
   - Note modified files

2. **Load Context**
   - Read modified files mentioned
   - Understand current state
   - Load any open questions

3. **Display Summary**
   ```
   Context restored!

   Task: [task]
   Progress: [X%]

   Resuming from: [exact point]

   Key context:
   - [decision 1]
   - [decision 2]

   Ready to continue. What would you like to do?
   ```

## View Details

When user chooses "View full details":

```
Full Checkpoint Details

Task: [original task]

Completed:
- [x] [subtask 1]
- [x] [subtask 2]

In Progress:
- [ ] [subtask 3] (60%)

Pending:
- [ ] [subtask 4]
- [ ] [subtask 5]

Key Decisions:
| Decision | Reason |
|----------|--------|
| [choice] | [why]  |

Modified Files:
- `file1.ts` - [changes]
- `file2.ts` - [changes]

Open Questions:
- [question 1]

Resume from: [specific point]

[Resume] [Start Fresh]
```

## Start Fresh

When user chooses "Start fresh":

```
Starting fresh session.

Note: Previous checkpoint preserved at CHECKPOINT.md
You can restore it later with /restore

What would you like to work on?
```

## Manual Restore

User can also call `/restore` manually anytime:

```
/restore           # Restore from latest checkpoint
/restore --list    # List available checkpoints
/restore --full    # Restore with full details
```

## No Checkpoint Found

If no checkpoint exists:

```
No checkpoint found.

No previous session data available.
Ready for new work!
```
