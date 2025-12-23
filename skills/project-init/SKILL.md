# Project Initialization Skill

## Description

Automatically initialize Claude Code optimization for any project. This skill activates when users ask to set up, initialize, or optimize their project for Claude Code usage.

## Activation Triggers

- User mentions "initialize project", "setup claude", "optimize project"
- User asks about "CLAUDE.md", "project configuration", "claude code setup"
- User wants to "start a new project", "configure development environment"
- User mentions "新项目", "初始化项目", "配置 Claude"

## Instructions

When this skill is activated, follow these steps:

### 1. Determine Project Type

Ask the user which project stage they are in:
- **new**: New project that needs full planning and setup
- **dev**: Developing project that needs to maintain existing structure
- **prod**: Production project that needs strict protection (red lines)

### 2. Create Directory Structure

```bash
mkdir -p .claude/commands
mkdir -p docs
```

### 3. Copy Appropriate Template

Based on project type, create CLAUDE.md with the appropriate template:
- `new` → Use comprehensive planning template with open permissions
- `dev` → Use structure-preserving template with moderate restrictions
- `prod` → Use strict red-line protection template

### 4. Install Slash Commands

Copy the following commands to `.claude/commands/`:
- `plan.md` - Task planning workflow
- `fix-issue.md` - GitHub issue fixing workflow
- `review.md` - Code review with multiple dimensions
- `checkpoint.md` - Progress checkpointing for long tasks

### 5. Configure Permissions

Create `.claude/settings.json` with appropriate permission levels:
- `new`: Open permissions (Edit, Write, Bash commands)
- `dev`: Moderate restrictions (no force push, no rm -rf)
- `prod`: Strict (read-only, only lint/test commands)

### 6. Setup Documentation

Create `docs/DISCOVERIES.md` for recording development lessons learned.

### 7. Configure .gitignore

Add the following entries:
```
CLAUDE.local.md
CHECKPOINT.md
```

## Output Format

After initialization, provide a summary:
```
✅ Project initialized for Claude Code!

Created:
- CLAUDE.md (project configuration)
- .claude/commands/ (slash commands)
- .claude/settings.json (permissions)
- docs/DISCOVERIES.md (lessons learned)

Available commands:
- /project-optimizer:plan [task] - Plan a task
- /project-optimizer:review [scope] - Code review
- /project-optimizer:fix-issue [number] - Fix GitHub issue
- /project-optimizer:checkpoint - Save progress

Next steps:
1. Edit CLAUDE.md to fill in project details
2. Start using the slash commands
```

## Notes

- Always ask for project type before initializing
- Use the user's preferred language (Chinese/English) based on their input
- Remind users to customize CLAUDE.md after initialization
