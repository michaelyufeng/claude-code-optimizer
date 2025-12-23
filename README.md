# Claude Code Optimizer

> Claude Code 项目优化工具包 - 一键安装，开箱即用

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)

## 一键安装

```bash
# 在 Claude Code 中执行
/plugin marketplace add zhuyufeng/claude-code-optimizer
/plugin install project-optimizer
```

或者使用 GitHub URL：
```bash
/plugin marketplace add https://github.com/zhuyufeng/claude-code-optimizer.git
/plugin install project-optimizer
```

## 功能特性

### 三种项目模式

| 模式 | 适用场景 | 权限级别 |
|------|----------|----------|
| `new` | 新项目，需要完整规划 | 🟢 开放 |
| `dev` | 开发中项目 | 🟡 中等 |
| `prod` | 生产环境，严格保护 | 🔴 严格 |

### 斜杠命令

安装后可使用以下命令：

| 命令 | 功能 |
|------|------|
| `/project-optimizer:plan [任务]` | 任务规划（先计划后编码）|
| `/project-optimizer:review [范围]` | 多维度代码审查 |
| `/project-optimizer:fix-issue [issue号]` | 修复 GitHub Issue |
| `/project-optimizer:checkpoint` | 保存进度检查点 |

### Agent Skill（自动激活）

安装后，当你提到以下内容时会自动激活：
- "初始化项目"、"配置 Claude"、"setup project"
- "创建 CLAUDE.md"、"优化项目配置"

## 手动安装（不使用插件系统）

如果你的 Claude Code 版本不支持插件，可以使用脚本安装：

```bash
# 克隆仓库
git clone https://github.com/zhuyufeng/claude-code-optimizer.git

# 进入目录
cd claude-code-optimizer

# 初始化你的项目
./init.sh new /path/to/your-project
# 或
./init.sh dev /path/to/your-project
# 或
./init.sh prod /path/to/your-project
```

## 安装后的目录结构

```
your-project/
├── CLAUDE.md              # 项目配置（需编辑）
├── .claude/
│   ├── commands/          # 斜杠命令
│   │   ├── plan.md
│   │   ├── fix-issue.md
│   │   ├── review.md
│   │   └── checkpoint.md
│   └── settings.json      # 权限配置
├── docs/
│   └── DISCOVERIES.md     # 开发教训记录
└── .gitignore             # 已配置
```

## 使用流程

### 1. 安装插件

```bash
/plugin install project-optimizer@claude-code-optimizer
```

### 2. 初始化项目

直接告诉 Claude：
```
帮我初始化这个项目用于 Claude Code（选择 new/dev/prod 模式）
```

或使用斜杠命令配合 init.sh：
```bash
./init.sh new .
```

### 3. 编辑 CLAUDE.md

填写项目具体信息：
- 项目名称和描述
- 技术栈
- 常用命令
- 代码规范

### 4. 开始使用

```bash
# 规划任务
/project-optimizer:plan 实现用户登录功能

# 代码审查
/project-optimizer:review src/

# 修复 Issue
/project-optimizer:fix-issue 123

# 保存进度
/project-optimizer:checkpoint
```

## 核心原则

基于 [Anthropic 官方最佳实践](https://www.anthropic.com/engineering/claude-code-best-practices)：

1. **先探索再编码** - 让 Claude 先读文件、做计划
2. **CLAUDE.md 要精炼** - 像调试 prompt 一样迭代
3. **分层配置** - 根目录 + 子模块各有 CLAUDE.md
4. **记录教训** - 用 DISCOVERIES.md 记录问题和解决方案

## 深度思考触发词

| 触发词 | 思考深度 | 适用场景 |
|--------|----------|----------|
| `think` | 基础 | 简单问题 |
| `think hard` | 中等 | 复杂逻辑 |
| `think harder` | 深入 | 架构决策 |
| `ultrathink` | 最深 | 关键决策 |

## 相关资源

- [Anthropic 官方最佳实践](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code 插件文档](https://code.claude.com/docs/en/plugins)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)
- [awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)

## 贡献

欢迎提交 Issue 和 PR！

## License

MIT
