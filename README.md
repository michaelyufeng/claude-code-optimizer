# Claude Code Optimizer

> AI 驱动的项目规划工具 - 强制性流程，不能跳过

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)

## 核心特性

### 🔐 强制顺序流程

新项目必须按以下顺序完成，**不能跳过任何步骤**：

```
🔍 研究 → 📝 规划 → 🚧 Gate1 → 🏗️ 架构 → 🎨 原型 → ✅ Gate2 → ⚙️ 后端 → 🔗 集成 → 📦 输出
```

### 🔬 完整研究阶段

在写任何代码之前，必须完成 6 类研究：

| 研究类型 | 内容 |
|----------|------|
| 📊 市场调研 | 目标用户、市场规模、竞争格局 |
| ⚙️ 技术研究 | 技术栈选择、可行性分析 |
| 👥 用户研究 | 用户痛点、需求分析 |
| ⚖️ 合规研究 | 法规政策、安全要求 |
| 💰 成本研究 | 开发成本、运营成本 |
| 🎯 竞品研究 | 竞品分析、差异化策略 |

### 🚧 Quality Gates

- **Gate 1**: 规划审核 - PRD 完整性、技术可行性检查
- **Gate 2**: 原型确认 - 用户体验验证，确认满意后才开发后端

### 🎨 原型先行策略

- 先做前端原型（Mock 数据）
- 用户确认后再开发后端
- 重做成本极低

### 💾 项目记忆系统

跨会话上下文持久化，项目状态与 CLAUDE.md 随项目演进自动更新：

- **检查点保存** - 自动保存项目状态和上下文
- **会话恢复** - 新会话自动检测并恢复上次进度
- **决策记录** - 关键决策自动记录，便于追溯
- **配置演进** - CLAUDE.md 随项目进展自动更新

## 安装

```bash
# 添加 marketplace
/plugin marketplace add michaelyufeng/claude-code-optimizer

# 安装插件
/plugin install project-optimizer
```

## 三种项目模式

| 模式 | 适用场景 | 流程 |
|------|----------|------|
| 🆕 全新项目 | 从零开始 | 研究 → 规划 → Gate1 → 架构 → 原型 → Gate2 → 后端 → 集成 → 输出 |
| 🔧 开发中项目 | 已有代码框架 | 分析 → 更新计划 → Gate → 继续开发 → 输出 |
| 🚀 运维项目 | 线上运行中 | 诊断 → 审批 → 修复 → 验证 → 输出 |

## 使用流程

### 1. 初始化项目

```
用户: 帮我初始化一个新项目

Claude: 🎯 请选择你的项目状态：

        1. 🆕 全新项目
        2. 🔧 开发中项目
        3. 🚀 运维项目

用户: 1

Claude: ✅ 项目初始化完成！
        📍 当前阶段：研究阶段 (1/9)

        下一步：运行 /project-optimizer:research
```

### 2. 按顺序完成各阶段

```bash
/project-optimizer:status      # 查看当前状态
/project-optimizer:research    # 研究阶段
/project-optimizer:planning    # 规划阶段
/project-optimizer:gate1       # Gate 1 审核
/project-optimizer:architecture # 架构阶段
/project-optimizer:prototype   # 原型阶段
/project-optimizer:gate2       # Gate 2 确认
/project-optimizer:backend     # 后端阶段
/project-optimizer:integration # 集成阶段
/project-optimizer:output      # 输出阶段
```

### 3. 阻止跳过

如果尝试跳过阶段：

```
用户: 帮我开始写代码

Claude: 🔒 当前处于【研究阶段】(1/9)

        未完成的研究：
        ❌ 市场调研
        ❌ 用户研究
        ❌ 技术研究

        请先完成研究阶段：
        /project-optimizer:research

        完成后才能进入下一阶段。
```

## 产出物

完成流程后将生成：

```
project/
├── CLAUDE.md                  # 项目配置（自动演进）
├── .claude/
│   ├── PROJECT_STATE.json     # 进度追踪
│   └── PROJECT_MEMORY/        # 记忆系统
│       ├── state.json         # 当前状态
│       ├── checkpoints/       # 检查点历史
│       ├── decisions/         # 决策记录
│       ├── context/           # 上下文片段
│       └── sessions/          # 会话历史
└── docs/
    ├── RESEARCH.md            # 研究报告
    ├── PRD.md                 # 产品需求文档
    ├── ARCHITECTURE.md        # 架构设计
    ├── API.md                 # API 文档
    ├── DATABASE.md            # 数据库设计
    ├── GATE1_REVIEW.md        # Gate 1 审核报告
    ├── GATE2_REVIEW.md        # Gate 2 审核报告
    └── PROJECT_SUMMARY.md     # 项目总结
```

## 记忆系统命令

```bash
/project-optimizer:save        # 保存当前上下文到检查点
/project-optimizer:restore     # 恢复上次的上下文
/project-optimizer:history     # 查看会话历史和时间线
/project-optimizer:decision    # 记录关键决策
/project-optimizer:evolve      # 更新 CLAUDE.md 配置
/project-optimizer:rules       # 管理项目规则
```

## 规则分层系统

解决 "规则约束 vs 用户意图" 的冲突问题：

| 级别 | 标记 | 行为 | 示例 |
|------|------|------|------|
| 🔴 MUST | 硬性规则 | 直接执行，不询问 | 安全规则、无障碍标准 |
| 🟡 SHOULD | 软性规则 | 变更时询问用户 | 配色方案、设计风格 |
| 🟢 PREFER | 偏好规则 | 可自动调整 | 动画时长、圆角大小 |

### 规则冲突处理示例

```
用户: 重新设计前端

Claude: 检测到相关设计规则：

🟡 SHOULD 规则 (需要确认):
- 配色方案: 深色主题 (黑色为主)

请选择设计范围：
[1] 🔄 在现有规则内重新设计
[2] 🎨 修改规则后重新设计
[3] 🆕 完全重新定义规则
```

### 会话恢复示例

```
# 新会话开始时自动提示
🔔 检测到进行中的项目！

📋 上次会话信息：
- 时间: 2024-12-15 14:30
- 阶段: 架构阶段 (4/9)
- 任务: 设计用户认证 API

是否恢复上次的上下文？
[1] ✅ 恢复并继续 (推荐)
[2] 📋 查看详情后决定
[3] 🆕 从头开始
```

## 设计理念

基于以下最佳实践：

1. **Spec-Driven Development** - 规范驱动开发
2. **V-Bounce Model** - 验证优先
3. **BMAD Method** - 多代理协作
4. **Quality Gates** - 质量门禁
5. **Phased Configuration** - 分阶段配置

核心原则：
- 先探索再编码
- 先规划后实现
- 先验证后扩展
- 低成本试错

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

## 贡献

欢迎提交 Issue 和 PR！

## License

MIT
