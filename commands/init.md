---
description: Initialize project for Claude Code optimization
---

# Initialize Project

Set up project with self-driving behavior rules and appropriate configuration level.

## Flow

```
┌─────────────────────────────────────────┐
│              /init start                 │
└───────────────┬─────────────────────────┘
                │
                ▼
        ┌───────────────┐
        │ CLAUDE.md     │
        │ exists?       │
        └───────┬───────┘
                │
       ┌────────┴────────┐
       │                 │
       No               Yes
       │                 │
       ▼                 ▼
  Select mode      Check status
       │                 │
       ▼                 ▼
  Create config    Update/Skip
```

---

## Scenario A: New Project

### Mode Selection

```
Claude Code Optimizer Setup

Select development mode:

[1] Quick Mode (Recommended for most)
    - Minimal CLAUDE.md (~50 lines)
    - Basic self-driving rules
    - Start coding immediately
    - Best for: small projects, prototypes

[2] Standard Mode
    - Balanced CLAUDE.md (~100 lines)
    - Full self-driving rules
    - Task breakdown support
    - Best for: medium projects

[3] Full Mode
    - Complete CLAUDE.md (~150 lines)
    - Strict self-driving rules
    - Optional phase workflow
    - Best for: large projects, teams
```

### Quick Mode Setup

**Creates:**
```
project/
├── CLAUDE.md              # Minimal with basic rules
└── .claude/commands/
    └── checkpoint.md      # Progress saving
```

**Output:**
```
Quick Mode initialized!

Created:
  CLAUDE.md (50 lines)
  .claude/commands/checkpoint.md

Self-driving rules enabled:
  - Session state detection
  - Progress save reminders
  - Basic task tracking

Start coding! Use /checkpoint to save progress.

Upgrade later: /upgrade
```

### Standard Mode Setup

**Asks 3 questions:**
```
Quick Setup Questions:

1. Project type?
   [Web App] [API] [CLI] [Library] [Other]

2. Main tech stack?
   > _______________

3. Any special requirements?
   [ ] Security focus
   [ ] Performance critical
   [ ] Team collaboration
   [ ] None
```

**Creates:**
```
project/
├── CLAUDE.md              # Standard with full rules
└── .claude/
    ├── commands/
    │   ├── checkpoint.md
    │   ├── restore.md
    │   ├── plan.md
    │   └── review.md
    └── state.json         # Initial state
```

**Output:**
```
Standard Mode initialized!

Created:
  CLAUDE.md (100 lines)
  .claude/commands/ (4 commands)
  .claude/state.json

Self-driving rules enabled:
  - Session state detection & restore
  - Task complexity assessment
  - Automatic breakdown suggestions
  - Progress tracking & save reminders
  - Thinking frameworks for different tasks

Available commands:
  /checkpoint  - Save progress
  /restore     - Restore session
  /plan        - Plan a task
  /review      - Code review

Upgrade later: /upgrade
```

### Full Mode Setup

**Asks about workflow:**
```
Full Mode Configuration

Enable optional features:

[x] Phase workflow (Research → Plan → Implement → Validate)
[ ] Gate checkpoints (quality gates between phases)
[ ] Detailed state tracking

Note: All features can be toggled later
```

**Creates:**
```
project/
├── CLAUDE.md              # Complete with strict rules
├── .claude/
│   ├── commands/          # All commands
│   ├── state.json         # Full state
│   └── config.json        # Mode config
└── docs/
    └── DECISIONS.md       # Decision log
```

**Output:**
```
Full Mode initialized!

Created:
  CLAUDE.md (150 lines)
  .claude/ (complete setup)
  docs/DECISIONS.md

Self-driving rules (strict):
  - Mandatory session state check
  - Required task breakdown for L/XL tasks
  - 4-phase workflow guidance
  - Continuous progress tracking
  - Proactive context protection
  - Detailed state persistence

Phase workflow: Enabled
Gate checkpoints: Disabled (enable with /gate1, /gate2)

Recommended first step: /plan [your first task]
```

---

## Scenario B: Existing CLAUDE.md

### Check Status

```
Existing CLAUDE.md detected!

File info:
  Lines: [N]
  Mode: [Quick/Standard/Full]
  Last modified: [time]

Actions:
[1] Skip - Current config is fine
[2] Update - Sync with project changes
[3] Upgrade - Move to higher mode
[4] Assess - Check configuration quality
```

---

## Mode Comparison

| Feature | Quick | Standard | Full |
|---------|-------|----------|------|
| CLAUDE.md size | ~50 lines | ~100 lines | ~150 lines |
| Self-driving rules | Basic | Full | Strict |
| Session restore | Simple | Complete | Detailed |
| Task breakdown | Manual | Suggested | Required (L/XL) |
| Progress tracking | Basic | Standard | Continuous |
| State persistence | Optional | Enabled | Required |
| Phase workflow | No | No | Optional |
| Gate checkpoints | No | No | Optional |

---

## Template Variables

When creating CLAUDE.md, replace these placeholders:

| Variable | Source |
|----------|--------|
| `{{PROJECT_NAME}}` | Directory name or ask |
| `{{DATE}}` | Current date |
| `{{LANGUAGE}}` | Detect or ask |
| `{{FRAMEWORK}}` | Detect or ask |
| `{{DEV_COMMAND}}` | Detect from package.json etc. |

---

## Self-Driving Rules Summary

All modes include these core rules in CLAUDE.md:

### Session Start
- Check for existing checkpoint/state
- Offer to restore if found

### During Work
- Assess task complexity
- Suggest breakdown for complex tasks
- Track progress

### Context Protection
- Monitor conversation length
- Remind to save at thresholds
- Protect against context loss

### Mode Differences

| Rule | Quick | Standard | Full |
|------|-------|----------|------|
| Session check | SHOULD | MUST | MUST |
| Task assessment | PREFER | SHOULD | MUST |
| Breakdown suggestion | No | SHOULD | MUST (L/XL) |
| Progress tracking | Basic | Standard | Strict |
| State persistence | Optional | SHOULD | MUST |

---

## Key Principles

Based on best practices research:

1. **CLAUDE.md is king** - All behavior through rules, not commands
2. **Let agent decide** - Don't force rigid workflows
3. **Checklist over agents** - Use task lists, not predefined roles
4. **Context protection** - Never exceed 60% context
5. **State persistence** - Human-readable CHECKPOINT.md

## Usage

```
/init              # Start initialization
/init quick        # Quick mode directly
/init standard     # Standard mode directly
/init full         # Full mode directly
```
