# Claude Code Optimizer

> Self-driving enhancement for Claude Code - intelligent behavior rules, not rigid workflows

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)

## Core Philosophy

```
CLAUDE.md is king - behavior through rules, not commands
Let the agent decide - no rigid workflows
Context protection - never lose progress
```

Based on best practices from:
- [Anthropic's Claude Code Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)
- [How I Use Every Claude Code Feature](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)

## Key Innovation: Self-Driving Rules

Instead of requiring you to call commands, behavior rules are injected into CLAUDE.md. Claude automatically:

- **Detects previous sessions** and offers to restore
- **Assesses task complexity** and suggests breakdown
- **Tracks progress** continuously
- **Protects context** by prompting saves
- **Adapts thinking** based on task type

```
┌─────────────────────────────────────────────────────────────┐
│                   Self-Driving Architecture                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    CLAUDE.md                         │   │
│  │                                                      │   │
│  │  Behavior Rules (auto-executed):                     │   │
│  │  • Session start → check for previous work           │   │
│  │  • New task → assess complexity, suggest breakdown   │   │
│  │  • During work → track progress, protect context     │   │
│  │  • Task type → adapt thinking framework              │   │
│  │                                                      │   │
│  │  + Project config, tech stack, conventions           │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              State Persistence                       │   │
│  │                                                      │   │
│  │  CHECKPOINT.md  ←→  .claude/state.json               │   │
│  │  (human-readable)   (machine-readable)               │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↕                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Commands (explicit triggers)               │   │
│  │                                                      │   │
│  │  /checkpoint  /restore  /plan  /review               │   │
│  │                                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Installation

```bash
# Add marketplace
/plugin marketplace add michaelyufeng/claude-code-optimizer

# Install plugin
/plugin install project-optimizer
```

## Quick Start

```bash
# Initialize project
/project-optimizer:init

# Select mode:
[1] Quick Mode  - Start coding immediately (~50 line CLAUDE.md)
[2] Standard    - Balanced rules + commands (~100 lines)
[3] Full Mode   - Strict rules + optional phases (~150 lines)
```

## Three Modes

| Mode | Self-Driving | Task Breakdown | Commands | Best For |
|------|--------------|----------------|----------|----------|
| Quick | Basic | Manual | 2 | Small projects |
| Standard | Full | Suggested | 5 | Medium projects |
| Full | Strict | Required (L/XL) | 10+ | Large projects |

### Quick Mode

Minimal setup, maximum freedom.

```bash
/project-optimizer:init
# Select [1] Quick Mode

# Start coding!

# When needed:
/project-optimizer:checkpoint  # Save progress
```

Self-driving rules:
- Session state detection (SHOULD)
- Progress save reminders
- Basic task tracking

### Standard Mode

Balanced intelligence.

```bash
/project-optimizer:init
# Select [2] Standard Mode

# Core commands:
/project-optimizer:checkpoint  # Save progress
/project-optimizer:restore     # Restore session
/project-optimizer:plan        # Plan a task
/project-optimizer:review      # Code review
```

Self-driving rules:
- Session state detection & restore (MUST)
- Task complexity assessment (SHOULD)
- Automatic breakdown suggestions (SHOULD)
- Progress tracking & save reminders (MUST)
- Thinking frameworks for task types (SHOULD)

### Full Mode

Complete control and tracking.

```bash
/project-optimizer:init
# Select [3] Full Mode

# All Standard commands plus:
/project-optimizer:status    # Check status
/project-optimizer:assess    # Assess config
/project-optimizer:evolve    # Update config

# Optional phase commands:
/project-optimizer:gate1     # Quality gate 1
/project-optimizer:gate2     # Quality gate 2
```

Self-driving rules:
- All Standard rules as MUST
- Required breakdown for L/XL tasks
- 4-phase workflow guidance
- Proactive context protection
- Detailed state persistence

## Self-Driving Rules

### Session Start
```
Previous session detected!

Task: [task name]
Progress: 60% (3/5 subtasks)
Last: 2 hours ago

[1] Resume (recommended)
[2] View details
[3] Start fresh
```

### Task Assessment
```
Task Analysis:

Original: "Implement user authentication"
Complexity: L (Large)
- Estimated files: 8
- Estimated lines: 300
- Cross-module: Yes

Suggested breakdown:
1. [ ] Design data model (S)
2. [ ] Implement registration (M)
3. [ ] Implement login (M)
4. [ ] Add authorization (M)
5. [ ] Write tests (S)

[Confirm] [Modify] [Skip]
```

### Progress Tracking
```
Completed: [Subtask 2] - Implement registration

Progress: ████████░░ 60% (3/5)

Next: [Subtask 3] - Implement login

[Continue] [Save checkpoint]
```

### Context Protection
```
Context status: High usage

Conversation: 18 turns
Files processed: 10

Recommendation: Save checkpoint soon

[Save now] [Continue]
```

## Workflow Guidance (Full Mode)

4-phase approach (not mandatory, but guided):

```
1. RESEARCH
   - Understand requirements
   - Explore codebase
   - Identify dependencies

2. PLAN
   - Design solution
   - Create task checklist
   - Get confirmation

3. IMPLEMENT
   - Write tests first
   - Implement incrementally
   - Update checklist

4. VALIDATE
   - Run all tests
   - Self-review code
   - Update documentation
```

## Thinking Frameworks

Claude adapts approach based on task type:

| Task | Focus |
|------|-------|
| Requirements | Ask "why", clarify details, find edge cases |
| Architecture | Evaluate trade-offs, consider scalability |
| Implementation | Handle edge cases, tests first, minimal changes |
| Review | Security, performance, maintainability |

## State Persistence

### CHECKPOINT.md (human-readable)

```markdown
# Checkpoint - 2024-12-23T15:30:00

## Task
Implement user authentication

## Progress
[T1] [x] Design data model
[T2] [x] Implement registration
[T3] [ ] Implement login <- IN PROGRESS
[T4] [ ] Add authorization
[T5] [ ] Write tests

Overall: 40% complete

## Key Decisions
| Decision | Reason |
|----------|--------|
| JWT over sessions | Stateless, scalable |

## Next Steps
1. Complete login endpoint
2. Add token validation

## Resume
Continue from T3, login endpoint
```

### .claude/state.json (machine-readable)

```json
{
  "lastUpdated": "2024-12-23T15:30:00Z",
  "task": {
    "name": "Implement user authentication",
    "progress": 40,
    "currentSubtask": "T3"
  },
  "decisions": [...]
}
```

## Command Reference

### Core (all modes)

| Command | Description |
|---------|-------------|
| `/project-optimizer:init` | Initialize project |
| `/project-optimizer:checkpoint` | Save progress |
| `/project-optimizer:restore` | Restore session |

### Standard+

| Command | Description |
|---------|-------------|
| `/project-optimizer:plan` | Plan a task |
| `/project-optimizer:review` | Code review |

### Full

| Command | Description |
|---------|-------------|
| `/project-optimizer:status` | Check status |
| `/project-optimizer:assess` | Assess config |
| `/project-optimizer:evolve` | Update config |
| `/project-optimizer:upgrade` | Upgrade mode |

### Optional (Full)

| Command | Description |
|---------|-------------|
| `/project-optimizer:gate1` | Quality gate 1 |
| `/project-optimizer:gate2` | Quality gate 2 |

## Upgrade Path

```bash
# Start with Quick
/project-optimizer:init  # Select Quick

# Later, upgrade
/project-optimizer:upgrade  # Move to Standard or Full
```

## Key Principles

1. **CLAUDE.md is king** - All behavior through rules
2. **Let agent decide** - No rigid predefined roles
3. **Checklist over agents** - Task lists, not agent roles
4. **Context protection** - Never exceed 60% context
5. **Human-readable state** - CHECKPOINT.md for recovery

## Design Decisions

Based on research, we deliberately:

- **Removed** predefined Agent roles (anti-pattern)
- **Removed** mandatory phase workflows (too rigid)
- **Added** self-driving behavior rules in CLAUDE.md
- **Added** automatic task complexity assessment
- **Added** proactive context protection

## License

MIT
