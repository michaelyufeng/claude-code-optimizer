# Command Structure v2 (Simplified)

Based on research from best practices, this document defines the simplified command structure.

## Design Principles

1. **Let the agent decide** - Don't force rigid workflows
2. **CLAUDE.md is king** - Core behavior through rules, not commands
3. **Commands for explicit triggers only** - Not for things that should happen automatically
4. **Fewer, more useful commands** - Quality over quantity

## Command Categories

### Core Commands (Keep)

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/init` | Initialize project | Starting a new project |
| `/checkpoint` | Save progress | Manual save, or when prompted |
| `/restore` | Restore progress | Starting new session |
| `/plan` | Plan a task | Before complex work |
| `/review` | Code review | After implementation |

### Utility Commands (Keep)

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/help` | Show help | When user needs guidance |
| `/upgrade` | Upgrade mode | Moving from Quick to Standard/Full |
| `/status` | Show status | Check current state |

### Optional Commands (Keep but simplify)

| Command | Purpose | Notes |
|---------|---------|-------|
| `/assess` | Assess CLAUDE.md | Can be auto-triggered |
| `/evolve` | Update CLAUDE.md | When project changes |

### Removed Commands

| Command | Reason |
|---------|--------|
| `/agents` | Anti-pattern - let agent decide |
| `/as-agent` | Anti-pattern - rigid roles |
| `/assign` | Anti-pattern - let agent delegate |
| `/split-task` | Should be automatic via rules |
| `/context` | Move to built-in /context |
| `/steering` | Merged into CLAUDE.md |
| `/auto-review` | Move to rules |
| `/decision` | Move to state tracking |

### Phase Commands (Conditional)

Only available in Full mode with phase workflow:

| Command | Purpose |
|---------|---------|
| `/research` | Research phase |
| `/planning` | Planning phase |
| `/architecture` | Architecture phase |
| `/prototype` | Prototype phase |
| `/backend` | Backend phase |
| `/integration` | Integration phase |
| `/output` | Output phase |
| `/gate1` | Gate 1 checkpoint |
| `/gate2` | Gate 2 checkpoint |

### Production Commands (Conditional)

Only for production projects:

| Command | Purpose |
|---------|---------|
| `/diagnose` | Diagnose issues |
| `/approve` | Approval gate |
| `/fix` | Execute fix |
| `/verify` | Verify fix |

## Final Command Count

| Mode | Core | Utility | Optional | Phase | Total |
|------|------|---------|----------|-------|-------|
| Quick | 5 | 3 | 0 | 0 | 8 |
| Standard | 5 | 3 | 2 | 0 | 10 |
| Full | 5 | 3 | 2 | 9 | 19 |
| Production | 5 | 3 | 2 | 4 | 14 |

## Migration Plan

1. Keep existing command files for phase workflow
2. Remove agent-related commands
3. Update init to use new templates
4. Simplify help to reflect new structure
