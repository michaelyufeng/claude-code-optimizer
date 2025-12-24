# Claude Code Optimizer

> 自动驾驶项目开发 - 4 阶段流程 | 多 Agent | 双记忆 | Gate 门控

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)
[![Version](https://img.shields.io/badge/version-1.0.2-green.svg)](https://github.com/michaelyufeng/claude-code-optimizer)

## 核心理念

```
一次启动，全程跟踪
研究 → 规划 → 架构 → 开发
禁止无方向编码，选项驱动决策
```

## 为什么选择自动驾驶？

| 问题 | 自动驾驶方案 |
|------|-------------|
| 跳过研究直接编码 | 强制 4 阶段流程，Gate 门控 |
| 编码没有方向 | 选项驱动，每个决策点提供选项 |
| 上下文丢失 | 双记忆系统（短期 + 长期） |
| 任务太大无从下手 | 自动任务分割 |
| 不知道用什么模型 | 自动 Agent 分配 |

## 安装

```bash
claude /plugin install michaelyufeng/claude-code-optimizer
```

## 快速开始

```bash
# 启动自动驾驶
/project-optimizer:start 我的新项目

# 查看状态
/project-optimizer:status

# 恢复项目
/project-optimizer:start --resume
```

## 4 阶段流程

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  研究    │───▶│  规划    │───▶│  架构    │───▶│  开发    │
│ Research │    │   Plan   │    │   Arch   │    │   Dev    │
└────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │               │
     ▼               ▼               ▼               ▼
  [Gate 1]       [Gate 2]       [Gate 3]       [完成]
```

### 阶段说明

| 阶段 | 产出 | Agent |
|------|------|-------|
| 🔬 研究 | 需求分析、技术选型 | 分析师 |
| 📋 规划 | PRD、功能优先级 | PM |
| 🏗️ 架构 | 系统设计、API、数据模型 | 架构师 |
| 💻 开发 | 代码实现、测试 | 开发者 + 审核员 |

## 12 个命令

### 自动驾驶
| 命令 | 说明 |
|------|------|
| `/project-optimizer:start` | 启动自动驾驶 |
| `/project-optimizer:status` | 查看当前状态 |

### 阶段流程
| 命令 | 说明 |
|------|------|
| `/project-optimizer:research` | 研究阶段 |
| `/project-optimizer:plan` | 规划阶段 |
| `/project-optimizer:arch` | 架构阶段 |
| `/project-optimizer:dev` | 开发阶段 |
| `/project-optimizer:gate` | 阶段门控检查 |

### Agent 与任务
| 命令 | 说明 |
|------|------|
| `/project-optimizer:agents` | Agent 管理 |
| `/project-optimizer:split` | 任务分割 |

### 记忆系统
| 命令 | 说明 |
|------|------|
| `/project-optimizer:diary` | 短期记忆 |
| `/project-optimizer:reflect` | 长期记忆 |
| `/project-optimizer:sync` | 同步系统 |

## 核心特性

### 1. Gate 门控

每个阶段必须通过 Gate 检查才能进入下一阶段：

```
🚧 Gate 1 检查

✅ 需求分析完成
✅ 技术方案已选定
❌ CLAUDE.md 技术栈章节缺失

结果: ❌ 不通过 → 修复后重试
```

### 2. 多 Agent 系统

根据任务自动分配 Agent 和模型：

| Agent | 角色 | 模型 |
|-------|------|------|
| 🔬 分析师 | 需求分析、调研 | Sonnet |
| 📋 PM | PRD、优先级 | Sonnet |
| 🏗️ 架构师 | 系统设计 | Opus |
| 💻 开发者 | 代码实现 | Haiku/Sonnet |
| 👁️ 审核员 | 代码审查 | Sonnet |

### 3. 双记忆系统

```
短期记忆 (Memory)          长期记忆 (History)
     │                           ▲
     │ 最多 10 条                │
     │                           │
     └──── /reflect ─────────────┘
           (自动整理)
```

### 4. 任务自动分割

大任务自动分割为可执行的子任务：

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

## 工作流示例

```bash
# 1. 启动
/project-optimizer:start 电商网站

# 2. 自动进入研究阶段
🔬 [分析师] 开始研究...
请描述你的项目需求...

# 3. 研究完成，Gate 检查
🚧 Gate 1 检查 → ✅ 通过

# 4. 自动进入规划阶段
📋 [PM] 开始规划...

# 5. 规划完成，Gate 检查
🚧 Gate 2 检查 → ✅ 通过

# 6. 自动进入架构阶段
🏗️ [架构师] 开始设计...

# 7. 架构完成，Gate 检查
🚧 Gate 3 检查 → ✅ 通过

# 8. 自动进入开发阶段
💻 [开发者] 开始实现...

# 9. 完成！
✅ 项目开发完成
```

## 文件结构

```
your-project/
├── .claude/
│   └── PROJECT_STATE.json    # 项目状态
├── docs/
│   ├── PRD.md                # 产品需求
│   ├── ARCHITECTURE.md       # 架构设计
│   └── HISTORY.md            # 长期记忆
└── CLAUDE.md                 # 项目记忆
```

## 设计原则

1. **强制阶段流程** - 不可跳过任何阶段
2. **Gate 门控** - 必须通过检查才能继续
3. **禁止无方向编码** - 所有编码必须有任务来源
4. **选项驱动** - 关键决策由用户选择
5. **双记忆系统** - 短期 + 长期，永不遗忘
6. **自动同步** - CLAUDE.md 实时更新

## License

MIT
