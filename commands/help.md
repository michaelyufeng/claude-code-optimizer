---
description: Help and command reference
---

# 帮助 (Help)

v1.0.6 命令参考和使用指南。

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
| `/start --resume` | 恢复项目 (自动检测离线变更) |
| `/start --phase [阶段]` | 从指定阶段开始 (research/plan/arch/dev/test/deploy) |
| `/start --type [类型]` | 指定项目类型预设 (new/existing/maintenance) |
| `/status` | 查看状态 (含变更提示) |
| `/status --brief` | 简要状态 |
| `/detect` | 检测用户离线变更 |
| `/detect --sync` | 检测并自动同步 |

### 📋 阶段流程 (6 阶段)

| 命令 | 说明 |
|------|------|
| `/research` | 研究阶段 - 需求分析、技术可行性 |
| `/plan` | 规划阶段 - PRD、用户故事、MVP 范围 |
| `/arch` | 架构阶段 - 系统设计、API 设计 |
| `/dev` | 开发阶段 - 代码实现 |
| `/test` | 测试阶段 - 单元/集成/E2E 测试 |
| `/deploy` | 部署阶段 - CI/CD、发布、文档 |
| `/gate` | 手动触发阶段门控检查 |
| `/gate 1/2/3` | 检查指定 Gate |

### 🤖 Agent 与任务

| 命令 | 说明 |
|------|------|
| `/agents` | 查看 Agent 状态 |
| `/agents --list` | 查看所有 Agent |
| `/split` | 任务分割 |
| `/split --status` | 查看分割状态 |

### 💰 模型选择

| 命令 | 说明 |
|------|------|
| `/model-selection` | 查看模型自动选择策略 |
| `/model-selection --current` | 查看当前任务的模型 |
| `/model-selection --set [model]` | 手动指定模型 (haiku/sonnet/opus) |
| `/model-selection --cost-estimate` | 查看成本估算 |

### 🧠 记忆系统

| 命令 | 说明 |
|------|------|
| `/diary` | 记录到 TASKS.md |
| `/diary --show` | 查看任务和日志 |
| `/reflect` | 整理到长期记忆 |
| `/reflect --show` | 查看长期记忆 |

### 🔄 同步系统

| 命令 | 说明 |
|------|------|
| `/sync` | 同步项目文件 |
| `/sync --check` | 仅检查不同步 |
| `/sync --detect` | 检测离线变更 |
| `/sync --history` | 查看同步历史 |

---

## 快速开始

### 新项目

```bash
# 1. 启动自动驾驶
/project-optimizer:start 我的项目名称

# 2. 跟随引导完成 6 个阶段
#    研究 → 规划 → 架构 → 开发 → 测试 → 部署

# 3. 每个阶段自动:
#    - 分配合适的 Agent
#    - 通过 Gate 检查
#    - 更新 CLAUDE.md
#    - 记录到 Memory
```

### 已有项目

```bash
# 从架构阶段开始（跳过研究和规划）
/project-optimizer:start --type existing

# 或直接指定阶段
/project-optimizer:start --phase dev
```

### 恢复项目

```bash
# 恢复已有项目
/project-optimizer:start --resume

# 恢复后跳到测试阶段
/project-optimizer:start --resume --phase test

# 查看当前状态
/project-optimizer:status
```

---

## 自动驾驶行为

### 6 阶段流程

```
研究 → 规划 → 架构 → 开发 → 测试 → 部署
         │               │          │
         ▼               ▼          ▼
      Gate 1          Gate 2     Gate 3
```

### Gate 检查点

| Gate | 位置 | 检查重点 |
|------|------|----------|
| Gate 1 | 规划→架构 | PRD 完整性、需求可行性 |
| Gate 2 | 开发→测试 | 代码质量、功能完整性 |
| Gate 3 | 测试→部署 | 测试覆盖率、安全审计 |

### Agent 自动分配

| 阶段 | Agent | 模型 |
|------|-------|------|
| 研究 | 🔬 分析师 | Sonnet |
| 规划 | 📋 PM | Sonnet |
| 架构 | 🏗️ 架构师 | Opus |
| 开发 | 💻 开发者 | 按任务分配 |
| 测试 | 🧪 测试员 | Sonnet |
| 部署 | 🚀 运维 | Sonnet |

### 智能模型选择

开发阶段采用**三层决策**自动选择最优模型，优化 Token 使用：

```
1. 任务类型（最高优先级）
   简单 CRUD → Haiku
   复杂编码 → Sonnet
   架构决策 → Opus

2. 任务规模
   S (< 50 行) → Haiku
   M (50-200 行) → Sonnet
   L/XL (> 200 行) → Sonnet/Opus

3. 阶段基础模型
   开发阶段默认: 动态分配
```

**成本优化**: 典型项目可节省 30-40% Token 成本

**查看详情**: `/model-selection`

### 任务自动分割

大任务（>200行）自动分割成小任务并行执行。

### 选项驱动

所有关键决策都会提供选项，禁止无方向编码。

---

## 灵活模式

### --phase 参数

从指定阶段开始，适用于已有项目：

```bash
/start --phase research   # 从研究阶段开始
/start --phase plan       # 从规划阶段开始
/start --phase arch       # 从架构阶段开始
/start --phase dev        # 从开发阶段开始
/start --phase test       # 从测试阶段开始
/start --phase deploy     # 从部署阶段开始
```

### --type 参数

项目类型预设：

```bash
/start --type new           # 新项目，完整 6 阶段
/start --type existing      # 已有项目，从架构开始
/start --type maintenance   # 维护项目，从开发开始
```

---

## 任务追踪系统

```
┌─────────────────────────────────────────────────────────┐
│                    文件职责分离                          │
├─────────────────────┬───────────────────────────────────┤
│ .claude/TASKS.md    │ 任务状态、会话日志 (实时更新)      │
│ .claude/LAST_SYNC   │ 同步追踪、变更检测               │
│ CLAUDE.md           │ 项目规则、重大决策               │
│ docs/HISTORY.md     │ 长期记忆归档                     │
└─────────────────────┴───────────────────────────────────┘
```

---

## 自动检测机制

```
用户离线修改代码
        ↓
  /start --resume
        ↓
  检测 Git diff
        ↓
  ┌─────────────────┐
  │ 发现未追踪变更？ │
  └────────┬────────┘
           ↓ 是
  ┌─────────────────┐
  │ 提示同步选项    │
  │ [1] 自动同步    │
  │ [2] 手动处理    │
  │ [3] 跳过        │
  └─────────────────┘
```

---

## 文件结构

```
project/
├── .claude/
│   ├── PROJECT_STATE.json  # 阶段状态、Agent
│   ├── TASKS.md            # 任务追踪、会话日志
│   └── LAST_SYNC.json      # 同步追踪
├── docs/
│   ├── PRD.md              # 产品需求文档
│   ├── ARCHITECTURE.md     # 架构设计文档
│   ├── TEST_REPORT.md      # 测试报告
│   ├── DEPLOYMENT.md       # 部署指南
│   └── HISTORY.md          # 长期记忆
└── CLAUDE.md               # 项目规则、重大决策
```

---

## 版本信息

```
Claude Code Optimizer v1.0.6

特性:
- 6 阶段自动驾驶流程 (研究→规划→架构→开发→测试→部署)
- 3 道 Gate 门控 (规划→架构、开发→测试、测试→部署)
- 8 种 Agent 自动分配 (分析师、PM、架构师、开发者、审核员、测试员、运维、协调者)
- 智能模型选择 (三层决策: 任务类型→规模→阶段)
- 成本优化 (自动分配 Haiku/Sonnet/Opus，节省 30-40% Token)
- 灵活模式 (--phase, --type, --resume 参数)
- 任务自动分割
- 独立任务追踪 (TASKS.md)
- 自动检测离线变更
- 选项驱动开发

命令数: 17 个
```
