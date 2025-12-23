---
description: Help and command reference
---

# 帮助 (Help)

v1.0.2 命令参考和使用指南。

## 命令列表

```bash
/project-optimizer:help                 # 显示此帮助
/project-optimizer:help [命令名]         # 查看特定命令帮助
```

---

## 核心命令

### 🚀 自动驾驶

| 命令 | 说明 |
|------|------|
| `/start` | 启动自动驾驶模式，一次启动全程跟踪 |
| `/start --resume` | 恢复已有项目的自动驾驶 |
| `/status` | 查看当前项目状态 |
| `/status --brief` | 简要状态 |

### 📋 阶段流程

| 命令 | 说明 |
|------|------|
| `/research` | 研究阶段（自动驾驶自动进入） |
| `/plan` | 规划阶段（自动驾驶自动进入） |
| `/arch` | 架构阶段（自动驾驶自动进入） |
| `/dev` | 开发阶段（自动驾驶自动进入） |
| `/gate` | 手动触发阶段门控检查 |

### 🤖 Agent 与任务

| 命令 | 说明 |
|------|------|
| `/agents` | 查看 Agent 状态 |
| `/agents --list` | 查看所有 Agent |
| `/split` | 任务分割 |
| `/split --status` | 查看分割状态 |

### 🧠 记忆系统

| 命令 | 说明 |
|------|------|
| `/diary` | 记录到短期记忆 |
| `/diary --show` | 查看短期记忆 |
| `/reflect` | 整理到长期记忆 |
| `/reflect --show` | 查看长期记忆 |

### 🔄 同步系统

| 命令 | 说明 |
|------|------|
| `/sync` | 同步 CLAUDE.md 和代码 |
| `/sync --check` | 仅检查不同步 |
| `/sync --history` | 查看同步历史 |

---

## 快速开始

### 新项目

```bash
# 1. 启动自动驾驶
/project-optimizer:start 我的项目名称

# 2. 跟随引导完成 4 个阶段
#    研究 → 规划 → 架构 → 开发

# 3. 每个阶段自动:
#    - 分配合适的 Agent
#    - 通过 Gate 检查
#    - 更新 CLAUDE.md
#    - 记录到 Memory
```

### 恢复项目

```bash
# 恢复已有项目
/project-optimizer:start --resume

# 查看当前状态
/project-optimizer:status
```

---

## 自动驾驶行为

### 4 阶段流程

```
研究 → 规划 → 架构 → 开发
  │       │       │       │
  ▼       ▼       ▼       ▼
Gate1   Gate2   Gate3   完成
```

### Agent 自动分配

| 阶段 | Agent | 模型 |
|------|-------|------|
| 研究 | 🔬 分析师 | Sonnet |
| 规划 | 📋 PM | Sonnet |
| 架构 | 🏗️ 架构师 | Opus |
| 开发 | 💻 开发者 | 按任务分配 |

### 任务自动分割

大任务（>200行）自动分割成小任务并行执行。

### 选项驱动

所有关键决策都会提供选项，禁止无方向编码。

---

## 双记忆系统

```
短期记忆 (Memory)     长期记忆 (History)
CLAUDE.md ## Memory   docs/HISTORY.md
最多 10 条            永久保存
────────────────────▶
         /reflect
```

---

## 文件结构

```
project/
├── .claude/
│   └── PROJECT_STATE.json  # 项目状态
├── docs/
│   ├── PRD.md              # 产品需求文档
│   ├── ARCHITECTURE.md     # 架构设计文档
│   └── HISTORY.md          # 长期记忆
└── CLAUDE.md               # 项目配置 + 短期记忆
```

---

## 版本信息

```
Claude Code Optimizer v1.0.2

特性:
- 4 阶段自动驾驶流程
- 全自动 Agent 分配
- 任务自动分割
- 双记忆系统
- CLAUDE.md 自动同步
- Gate 质量门控
- 选项驱动开发

命令数: 12 个
```
