---
description: Initialize project for Claude Code optimization
---

# Initialize Project

Initialize this project for Claude Code with optimized configuration.

## Project Type: $ARGUMENTS

If no type specified, ask the user to choose:
- **new** - New project (open permissions, full planning)
- **dev** - Developing project (moderate restrictions)
- **prod** - Production project (strict red lines)

## Steps

### 1. Create Directory Structure

```bash
mkdir -p .claude/commands
mkdir -p docs
```

### 2. Create CLAUDE.md

Based on project type, create appropriate CLAUDE.md:

#### For NEW projects:
- Include full project overview section
- Open permissions for exploration
- Comprehensive workflow guidelines
- Task tracking section

#### For DEV projects:
- Preserve existing structure
- Moderate restrictions
- Mark critical files with warnings
- Require confirmation for major changes

#### For PROD projects:
- Strict red lines for core logic
- Read-only by default
- Only allow bug fixes with approval
- Require minimal changes

### 3. Install Slash Commands

Copy these commands to `.claude/commands/`:
- plan.md - Task planning
- fix-issue.md - Issue fixing workflow
- review.md - Code review
- checkpoint.md - Progress saving

### 4. Create Settings

Create `.claude/settings.json` with appropriate permissions.

### 5. Create Documentation

Create `docs/DISCOVERIES.md` for recording lessons learned.

### 6. Update .gitignore

Add:
```
CLAUDE.local.md
CHECKPOINT.md
```

## Output

After completion, show:
- List of created files
- Available slash commands
- Next steps for the user
