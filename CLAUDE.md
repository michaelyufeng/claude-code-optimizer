# Claude Code Optimizer

> 初始化: 2025-12-23 | 版本: 3.0.0

## 项目概述

Claude Code 增强插件，通过 CLAUDE.md 日记系统实现跨会话持久记忆。

核心理念：
- CLAUDE.md 自动加载 = 持久记忆
- Git commit = 自然检查点
- 6 个命令 = 够用就好

## 技术栈

- 类型: Claude Code Plugin
- 语言: Markdown (命令定义)
- 仓库: https://github.com/michaelyufeng/claude-code-optimizer

## 目录结构

```
claude-code-optimizer/
├── .claude-plugin/       # 插件配置
│   └── plugin.json
├── commands/             # 6 个核心命令
│   ├── init.md          # 初始化
│   ├── diary.md         # 记录会话
│   ├── reflect.md       # 整理记忆
│   ├── plan.md          # 规划任务
│   ├── review.md        # 代码审查
│   ├── help.md          # 帮助
│   └── _deprecated/     # 废弃命令
├── templates/
│   └── CLAUDE.md        # 统一模板
└── README.md
```

## 约定

### 命令设计
- 命令使用 Markdown 格式定义
- 每个命令应简洁明了，单一职责
- 复杂功能通过 CLAUDE.md Memory 机制实现

### 版本管理
- 主要变更更新 major 版本
- 功能添加更新 minor 版本
- 修复更新 patch 版本

## 注意事项

- 废弃命令保留在 `_deprecated/` 以便需要时恢复
- CLAUDE.md 模板变量使用 `{{VARIABLE}}` 格式
- Memory 区域最多保留 10 条记录

---

## Memory

### 2025-12-23 21:00 - v3.0 极简版实施
- **完成**: 从 v2.0 重构为 v3.0 极简版
- **变更**:
  - 29 个命令 → 6 个命令 (init, diary, reflect, plan, review, help)
  - 3 种模式 → 统一模式
  - 新增 diary.md 和 reflect.md 命令
  - 移除 checkpoint/restore 系统（使用 Git 替代）
- **设计**: 基于 Claude Diary 模式 - CLAUDE.md Memory 区域作为短期记忆，reflect 整理为长期记忆

### 2025-12-23 20:30 - v2.0 自驱动架构
- **完成**: 实现自驱动行为规则架构
- **决策**: 移除预定义 Agent 角色（上下文截断问题）
- **来源**: Anthropic 最佳实践 + sshh.io 博客研究

### 2025-12-23 - 初始化
- **创建**: 项目初始化 v1.0.0
- **功能**: 强制阶段工作流、智能评估系统

---
*由 /project-optimizer:init 生成 | 使用 /diary 记录 | 使用 /reflect 整理*
