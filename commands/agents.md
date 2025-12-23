---
description: Multi-agent collaboration mode - specialized agents for different tasks
---

# 多Agent协作模式

## Agent 团队

基于 BMAD Method，定义以下专业 Agent：

### 🔬 分析师 (Analyst)
```yaml
角色: 需求分析、用户研究、市场调研
擅长:
  - 收集和整理信息
  - 竞品分析
  - 用户画像构建
  - 数据分析
适用阶段: research, analyze
模型建议: Sonnet (性价比)
```

### 📋 产品经理 (PM)
```yaml
角色: PRD编写、需求优先级、路线图规划
擅长:
  - 编写产品需求文档
  - 用户故事定义
  - 功能优先级排序
  - 项目规划
适用阶段: planning
模型建议: Sonnet
```

### 🏗️ 架构师 (Architect)
```yaml
角色: 系统设计、技术选型、API设计
擅长:
  - 系统架构设计
  - 技术方案评估
  - API 设计
  - 数据模型设计
适用阶段: architecture
模型建议: Opus (关键决策)
```

### 🎨 UX设计师 (UX Designer)
```yaml
角色: 用户体验、界面设计、原型
擅长:
  - 用户流程设计
  - 界面布局
  - 交互设计
  - 原型制作
适用阶段: prototype
模型建议: Sonnet
```

### 💻 开发者 (Developer)
```yaml
角色: 代码实现、测试、优化
擅长:
  - 编写代码
  - 单元测试
  - 性能优化
  - Bug修复
适用阶段: prototype, backend, integration
模型建议:
  - 简单任务: Haiku ($)
  - 复杂任务: Sonnet ($$)
  - 架构级: Opus ($$$)
```

### 👁️ 审核员 (Reviewer)
```yaml
角色: 质量门禁、代码审查、验收
擅长:
  - 代码审查
  - 安全审计
  - 质量检查
  - 验收测试
适用阶段: gate1, gate2, integration
模型建议: Sonnet
```

### 📝 技术文档 (Tech Writer)
```yaml
角色: API文档、用户指南、CLAUDE.md
擅长:
  - 编写技术文档
  - API 文档
  - 用户手册
  - README 编写
适用阶段: output
模型建议: Haiku (简单), Sonnet (复杂)
```

### 🎯 协调者 (Orchestrator)
```yaml
角色: 流程协调、资源分配、进度跟踪
擅长:
  - 任务分配
  - 进度监控
  - 冲突解决
  - 资源调度
适用阶段: 所有阶段
模型建议: Sonnet
```

---

## 使用方法

### 1. 查看可用 Agent

```
/project-optimizer:agents
```

输出：
```
🤖 可用 Agent 团队

当前阶段: [阶段名称]
推荐 Agent: [Agent 名称]

┌────────────┬──────────────┬────────────┬──────────┐
│ Agent      │ 角色         │ 当前阶段   │ 状态     │
├────────────┼──────────────┼────────────┼──────────┤
│ 🔬 分析师  │ 需求分析     │ ✓ 可用     │ 空闲     │
│ 📋 PM      │ PRD编写      │ ✓ 可用     │ 空闲     │
│ 🏗️ 架构师  │ 系统设计     │ ○ 未激活   │ -        │
│ 🎨 UX设计  │ 界面设计     │ ○ 未激活   │ -        │
│ 💻 开发者  │ 代码实现     │ ○ 未激活   │ -        │
│ 👁️ 审核员  │ 质量检查     │ ○ 未激活   │ -        │
│ 📝 文档    │ 技术文档     │ ○ 未激活   │ -        │
│ 🎯 协调者  │ 流程协调     │ ✓ 可用     │ 监控中   │
└────────────┴──────────────┴────────────┴──────────┘
```

### 2. 切换 Agent 视角

```
/project-optimizer:as-agent [agent-name]
```

示例：
```
/project-optimizer:as-agent architect
```

切换后，Claude 会以该 Agent 的视角工作：
```
🏗️ 已切换到【架构师】视角

我将专注于：
- 系统架构设计
- 技术方案评估
- API 设计
- 数据模型设计

请描述你的需求，我会以架构师的专业角度回答。
```

### 3. 分配任务给 Agent

```
/project-optimizer:assign [agent] [task]
```

示例：
```
/project-optimizer:assign developer 实现用户登录API
```

---

## Agent 协作流程

### 顺序协作模式

```
分析师 → PM → 架构师 → UX设计 → 开发者 → 审核员 → 文档
   ↓       ↓      ↓        ↓        ↓        ↓       ↓
 研究    规划    架构     原型     实现     审核    文档
```

### 并行协作模式

```
                    ┌→ UX设计师 (原型)
分析师 → PM → 架构师 ┤
                    └→ 开发者 (技术预研)
                           ↓
                       审核员 → 开发者 → 审核员 → 文档
```

---

## 模型分配策略

### 成本优化原则

| 任务类型 | 推荐模型 | 成本 | 说明 |
|----------|----------|------|------|
| 简单查询 | Haiku | $ | 格式转换、简单问答 |
| 日志分析 | Haiku | $ | 错误日志解析 |
| 代码生成 | Sonnet | $$ | 标准功能实现 |
| API 设计 | Sonnet | $$ | 接口设计 |
| 代码审查 | Sonnet | $$ | 质量检查 |
| 架构决策 | Opus | $$$ | 关键技术决策 |
| 复杂问题 | Opus | $$$ | 疑难杂症 |
| 安全审计 | Opus | $$$ | 安全关键 |

### 自动分配逻辑

```markdown
## 模型自动选择

1. 判断任务复杂度
   - 简单 (< 50行代码) → Haiku
   - 中等 (50-500行) → Sonnet
   - 复杂 (> 500行或跨模块) → Opus

2. 判断任务类型
   - 格式化/转换 → Haiku
   - 实现/测试 → Sonnet
   - 决策/审计 → Opus

3. 判断风险等级
   - 低风险 → 当前模型
   - 中风险 → 至少 Sonnet
   - 高风险 → 必须 Opus
```

---

## 配置文件

创建 `.claude/AGENTS.json`:

```json
{
  "activeAgents": ["analyst", "pm", "orchestrator"],
  "currentAgent": "analyst",
  "modelAllocation": {
    "analyst": "sonnet",
    "pm": "sonnet",
    "architect": "opus",
    "uxDesigner": "sonnet",
    "developer": "auto",
    "reviewer": "sonnet",
    "techWriter": "haiku",
    "orchestrator": "sonnet"
  },
  "taskHistory": []
}
```
