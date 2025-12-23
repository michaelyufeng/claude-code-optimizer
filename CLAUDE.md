# Claude Code Optimizer

> 初始化: 2025-12-23 | 版本: 1.0.2

## 项目概述

Claude Code 自动驾驶开发插件。一次启动，全程跟踪项目开发。

核心特性：
- 4 阶段流程：研究 → 规划 → 架构 → 开发
- 全自动 Agent 分配
- 任务自动分割
- 双记忆系统（短期 + 长期）
- Gate 质量门控
- 选项驱动（禁止无方向编码）

## 技术栈

- 类型: Claude Code Plugin
- 语言: Markdown (命令定义)
- 仓库: https://github.com/michaelyufeng/claude-code-optimizer

## 目录结构

```
claude-code-optimizer/
├── .claude-plugin/       # 插件配置
│   ├── plugin.json
│   └── marketplace.json
├── commands/             # 12 个核心命令
│   ├── start.md         # 自动驾驶入口
│   ├── status.md        # 状态查看
│   ├── research.md      # 研究阶段
│   ├── plan.md          # 规划阶段
│   ├── arch.md          # 架构阶段
│   ├── dev.md           # 开发阶段
│   ├── gate.md          # 阶段门控
│   ├── agents.md        # Agent 管理
│   ├── split.md         # 任务分割
│   ├── diary.md         # 短期记忆
│   ├── reflect.md       # 长期记忆
│   ├── sync.md          # 同步系统
│   ├── help.md          # 帮助
│   └── _deprecated/     # 废弃命令
├── templates/
│   └── CLAUDE.md        # 项目模板
└── README.md
```

## 命令一览

### 自动驾驶
- `/start` - 启动自动驾驶
- `/status` - 查看状态

### 阶段流程
- `/research` - 研究阶段
- `/plan` - 规划阶段
- `/arch` - 架构阶段
- `/dev` - 开发阶段
- `/gate` - 门控检查

### Agent 与任务
- `/agents` - Agent 管理
- `/split` - 任务分割

### 记忆系统
- `/diary` - 短期记忆
- `/reflect` - 长期记忆
- `/sync` - 同步系统

## 约定

### 自动驾驶规则
- 必须通过 Gate 才能进入下一阶段
- 禁止跳过阶段
- 禁止无方向编码
- 所有决策必须提供选项

### 记忆规则
- 短期记忆最多 10 条
- 超出自动 reflect 到长期记忆
- Git commit 前自动归档

---

## Memory

### 2025-12-23 23:00 - v1.0.2 完整重构
- **完成**: 从 v3.0 极简版恢复为 v1.0.2 完整版
- **新增**:
  - 4 阶段自动驾驶流程
  - 全自动 Agent 分配
  - 任务自动分割
  - 双记忆系统
  - Gate 质量门控
  - 选项驱动开发
- **命令数**: 6 → 12 个
- **设计原则**: 保留核心开发流程，恢复项目开发意义

### 2025-12-23 21:00 - v3.0 极简版
- **问题**: 精简过度，失去项目开发意义
- **结论**: 回退到完整版设计

### 2025-12-23 - 初始化
- **创建**: 项目初始化 v1.0.0
- **功能**: 强制阶段工作流、智能评估系统

---
*由 /project-optimizer:start 启动 | 使用 /diary 记录 | 使用 /reflect 整理*
