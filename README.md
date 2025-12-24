# Claude Code Optimizer

> 自动驾驶项目开发 - 6 阶段流程 | 多 Agent | 双记忆 | 3 道 Gate 门控

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)
[![Version](https://img.shields.io/badge/version-1.0.5-green.svg)](https://github.com/michaelyufeng/claude-code-optimizer)

## 核心理念

```
一次启动，全程跟踪
研究 → 规划 → 架构 → 开发 → 测试 → 部署
禁止无方向编码，选项驱动决策
```

## 为什么选择自动驾驶？

| 问题 | 自动驾驶方案 |
|------|-------------|
| 跳过研究直接编码 | 强制 6 阶段流程，3 道 Gate 门控 |
| 编码没有方向 | 选项驱动，每个决策点提供选项 |
| 上下文丢失 | 双记忆系统（短期 + 长期） |
| 任务太大无从下手 | 自动任务分割 |
| 不知道用什么模型 | 自动 Agent 分配 |
| 已有项目难以接入 | 灵活模式 `--phase` 跳转阶段 |

## 安装

```bash
claude /plugin install michaelyufeng/claude-code-optimizer
```

## 快速开始

### 新项目

```bash
# 启动自动驾驶（完整 6 阶段）
/project-optimizer:start 我的新项目

# 查看状态
/project-optimizer:status
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
# 恢复已有项目（自动检测离线变更）
/project-optimizer:start --resume

# 恢复后跳到测试阶段
/project-optimizer:start --resume --phase test
```

## 6 阶段流程

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  研究    │───▶│  规划    │───▶│  架构    │───▶│  开发    │───▶│  测试    │───▶│  部署    │
│ Research │    │   Plan   │    │   Arch   │    │   Dev    │    │   Test   │    │  Deploy  │
└──────────┘    └────┬─────┘    └──────────┘    └────┬─────┘    └────┬─────┘    └──────────┘
                     │                               │               │
                     ▼                               ▼               ▼
                  [Gate 1]                        [Gate 2]        [Gate 3]
```

### 阶段说明

| 阶段 | 产出 | Agent |
|------|------|-------|
| 🔬 研究 | 需求分析、技术选型 | 分析师 (Sonnet) |
| 📋 规划 | PRD、功能优先级 | PM (Sonnet) |
| 🏗️ 架构 | 系统设计、API、数据模型 | 架构师 (Opus) |
| 💻 开发 | 代码实现 | 开发者 (按任务分配) |
| 🧪 测试 | 单元/集成/E2E 测试 | 测试员 (Sonnet) |
| 🚀 部署 | CI/CD、发布、文档 | 运维 (Sonnet) |

### Gate 检查点

| Gate | 位置 | 检查重点 |
|------|------|----------|
| Gate 1 | 规划→架构 | PRD 完整性、需求可行性 |
| Gate 2 | 开发→测试 | 代码质量、功能完整性、基础测试 |
| Gate 3 | 测试→部署 | 测试覆盖率≥80%、安全审计、无 P0/P1 Bug |

## 灵活模式

### --phase 参数

从指定阶段开始，适用于已有项目：

```bash
/project-optimizer:start --phase research   # 从研究阶段开始
/project-optimizer:start --phase plan       # 从规划阶段开始
/project-optimizer:start --phase arch       # 从架构阶段开始
/project-optimizer:start --phase dev        # 从开发阶段开始
/project-optimizer:start --phase test       # 从测试阶段开始
/project-optimizer:start --phase deploy     # 从部署阶段开始
```

### --type 参数

项目类型预设：

```bash
/project-optimizer:start --type new           # 新项目，完整 6 阶段
/project-optimizer:start --type existing      # 已有项目，从架构开始
/project-optimizer:start --type maintenance   # 维护项目，从开发开始
```

## 16 个命令

### 自动驾驶
| 命令 | 说明 |
|------|------|
| `/project-optimizer:start` | 启动自动驾驶 |
| `/project-optimizer:start --resume` | 恢复项目（自动检测变更） |
| `/project-optimizer:start --phase [阶段]` | 从指定阶段开始 |
| `/project-optimizer:start --type [类型]` | 指定项目类型预设 |
| `/project-optimizer:status` | 查看当前状态 |
| `/project-optimizer:detect` | 检测离线变更 |

### 阶段流程
| 命令 | 说明 |
|------|------|
| `/project-optimizer:research` | 研究阶段 |
| `/project-optimizer:plan` | 规划阶段 |
| `/project-optimizer:arch` | 架构阶段 |
| `/project-optimizer:dev` | 开发阶段 |
| `/project-optimizer:test` | 测试阶段 |
| `/project-optimizer:deploy` | 部署阶段 |
| `/project-optimizer:gate` | 阶段门控检查 |

### Agent 与任务
| 命令 | 说明 |
|------|------|
| `/project-optimizer:agents` | Agent 管理 |
| `/project-optimizer:split` | 任务分割 |

### 记忆系统
| 命令 | 说明 |
|------|------|
| `/project-optimizer:diary` | 短期记忆 → TASKS.md |
| `/project-optimizer:reflect` | 长期记忆 → HISTORY.md |
| `/project-optimizer:sync` | 同步系统 |

## 核心特性

### 1. 3 道 Gate 门控

每个关键阶段转换必须通过 Gate 检查：

```
🚧 Gate 2 检查

✅ 核心功能已实现
✅ 代码规范通过
❌ 测试覆盖率 35%，低于要求的 50%

结果: ❌ 不通过 → 修复后重试
```

### 2. 多 Agent 系统

根据阶段自动分配 Agent 和模型：

| Agent | 角色 | 模型 | 阶段 |
|-------|------|------|------|
| 🔬 分析师 | 需求分析、调研 | Sonnet | 研究 |
| 📋 PM | PRD、优先级 | Sonnet | 规划 |
| 🏗️ 架构师 | 系统设计 | Opus | 架构 |
| 💻 开发者 | 代码实现 | 按任务分配 | 开发 |
| 🧪 测试员 | 测试编写执行 | Sonnet | 测试 |
| 🚀 运维 | 部署发布 | Sonnet | 部署 |

### 3. 双记忆系统

```
短期记忆 (.claude/TASKS.md)     长期记忆 (docs/HISTORY.md)
         │                              ▲
         │ 任务状态、会话日志             │
         │                              │
         └──── /reflect ────────────────┘
               (自动整理归档)
```

### 4. 任务自动分割

大任务（>200行）自动分割为可执行的子任务：

```
原任务: 实现用户认证系统
     │
     ├─ [S] 创建 User 模型
     ├─ [M] 实现注册接口
     ├─ [M] 实现登录接口
     └─ [S] 添加 JWT 中间件
```

### 5. 选项驱动

禁止无方向编码，所有关键决策都提供选项：

```
📋 技术选型

请选择数据库:
[1] PostgreSQL (推荐) - 关系型，功能丰富
[2] MySQL - 关系型，广泛使用
[3] MongoDB - 文档型，灵活
[4] 🔍 需要更多信息
```

### 6. 离线变更检测

自动检测用户在任务系统外的代码修改：

```
⚠️ 检测到未追踪变更

2 个文件在任务系统外被修改:
- src/utils/helper.ts (新增)
- src/config.ts (修改)

→ 使用 /detect --sync 同步这些变更
```

## 工作流示例

```bash
# 1. 启动
/project-optimizer:start 电商网站

# 2. 自动进入研究阶段
🔬 [分析师] 开始研究...
请描述你的项目需求...

# 3. 研究完成，进入规划阶段
📋 [PM] 开始规划...

# 4. 规划完成，Gate 1 检查
🚧 Gate 1 检查 → ✅ 通过

# 5. 进入架构阶段
🏗️ [架构师] 开始设计...

# 6. 架构完成，进入开发阶段
💻 [开发者] 开始实现...

# 7. 开发完成，Gate 2 检查
🚧 Gate 2 检查 → ✅ 通过

# 8. 进入测试阶段
🧪 [测试员] 开始测试...

# 9. 测试完成，Gate 3 检查
🚧 Gate 3 检查 → ✅ 通过

# 10. 进入部署阶段
🚀 [运维] 开始部署...

# 11. 完成！
🎉 项目开发流程全部完成！
```

## 文件结构

```
your-project/
├── .claude/
│   ├── PROJECT_STATE.json    # 项目状态、阶段追踪
│   ├── TASKS.md              # 任务追踪、会话日志
│   └── LAST_SYNC.json        # 同步追踪
├── docs/
│   ├── PRD.md                # 产品需求文档
│   ├── ARCHITECTURE.md       # 架构设计
│   ├── TEST_REPORT.md        # 测试报告
│   ├── DEPLOYMENT.md         # 部署指南
│   └── HISTORY.md            # 长期记忆归档
└── CLAUDE.md                 # 项目规则、重大决策
```

## 设计原则

1. **强制阶段流程** - 6 阶段完整覆盖项目生命周期
2. **3 道 Gate 门控** - 关键转换点必须通过检查
3. **禁止无方向编码** - 所有编码必须有任务来源
4. **选项驱动** - 关键决策由用户选择
5. **双记忆系统** - 短期 + 长期，永不遗忘
6. **灵活模式** - 支持已有项目和维护项目
7. **离线感知** - 自动检测任务系统外的变更

## 版本历史

- **v1.0.5** - 6 阶段流程、3 道 Gate、灵活模式（--phase, --type）
- **v1.0.4** - 任务分离、自动检测离线变更
- **v1.0.2** - 完整版重构、双记忆系统
- **v1.0.0** - 初始版本

## License

MIT
