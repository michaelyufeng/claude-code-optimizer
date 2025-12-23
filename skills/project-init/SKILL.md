# Project Planner Pro - Skill

## Description

强制性项目规划流程。新项目必须按顺序完成每个阶段，不能跳过。

## Activation Triggers

- "初始化项目"、"新项目"、"start project"
- "创建项目"、"setup project"、"init project"

## Instructions

### Step 1: 确定项目状态

首先询问用户项目处于什么阶段：

```
🎯 请选择你的项目状态：

1. 🆕 全新项目
   - 项目还未启动，需要完整规划后才能开发
   - 流程：研究 → 规划 → Gate1 → 架构 → 原型 → Gate2 → 后端 → 集成 → 输出

2. 🔧 开发中项目
   - 框架已定，部分功能完成，需要完善计划
   - 流程：分析现状 → 更新计划 → Gate → 继续开发 → 输出

3. 🚀 运维项目
   - 已上线运行，只做修复，严格红线保护
   - 流程：诊断 → 审批 → 修复 → 验证 → 输出

请输入数字 (1/2/3):
```

### Step 2: 根据项目状态执行对应流程

#### 🆕 全新项目流程（9个步骤，强制顺序）

**Phase 1: 研究阶段** `/project-optimizer:research`
必须完成以下6类研究：
- 📊 市场调研 - 目标用户、市场规模、竞争格局
- ⚙️ 技术研究 - 技术栈选择、可行性分析
- 👥 用户研究 - 用户痛点、需求分析
- ⚖️ 合规研究 - 法规政策、安全要求
- 💰 成本研究 - 开发成本、运营成本
- 🎯 竞品研究 - 竞品分析、差异化

输出：`docs/RESEARCH.md`

**Phase 2: 规划阶段** `/project-optimizer:planning`
- 编写 PRD（产品需求文档）
- 定义用户故事
- 确定 MVP 范围
- 制定成功指标

输出：`docs/PRD.md`

**Phase 3: Gate 1 - 规划审核** `/project-optimizer:gate1`
检查项：
- [ ] PRD 完整性
- [ ] 技术可行性
- [ ] 范围清晰度
- [ ] 风险识别
不通过则返回 Phase 2

**Phase 4: 架构阶段** `/project-optimizer:architecture`
- 技术栈确认
- 系统架构设计
- API 设计
- 数据模型设计

输出：`docs/ARCHITECTURE.md`, `docs/API.md`

**Phase 5: 原型阶段** `/project-optimizer:prototype`
- 只做前端，不写后端
- 所有数据用 Mock
- 专注用户体验
- 重做成本极低

输出：前端原型代码

**Phase 6: Gate 2 - 原型确认** `/project-optimizer:gate2`
检查项：
- [ ] 用户体验满意
- [ ] 核心流程顺畅
- [ ] 设计风格确认
- [ ] 功能覆盖完整
不通过则返回 Phase 5（低成本重做）

**Phase 7: 后端阶段** `/project-optimizer:backend`
- 实现真实 API
- 数据库设计与实现
- 认证授权
- 第三方集成

**Phase 8: 集成阶段** `/project-optimizer:integration`
- 前后端集成
- 端到端测试
- 性能优化
- 安全审计

**Phase 9: 输出阶段** `/project-optimizer:output`
生成所有产出物：
- CLAUDE.md（项目配置）
- 完整文档
- 部署配置

### Step 3: 创建进度追踪文件

创建 `.claude/PROJECT_STATE.json`：

```json
{
  "projectType": "new",
  "currentPhase": 1,
  "phases": {
    "research": { "status": "in_progress", "completedAt": null },
    "planning": { "status": "locked", "completedAt": null },
    "gate1": { "status": "locked", "completedAt": null },
    "architecture": { "status": "locked", "completedAt": null },
    "prototype": { "status": "locked", "completedAt": null },
    "gate2": { "status": "locked", "completedAt": null },
    "backend": { "status": "locked", "completedAt": null },
    "integration": { "status": "locked", "completedAt": null },
    "output": { "status": "locked", "completedAt": null }
  },
  "research": {
    "market": false,
    "tech": false,
    "user": false,
    "legal": false,
    "cost": false,
    "competitor": false
  }
}
```

### Step 4: 阻止跳过

**重要规则**：
- 每次用户请求开发任务时，先检查 `PROJECT_STATE.json`
- 如果当前阶段未完成，拒绝执行并提示完成当前阶段
- 示例响应：

```
🔒 当前处于【研究阶段】(1/9)

未完成的研究：
❌ 市场调研
❌ 用户研究

请先完成研究阶段，使用命令：
/project-optimizer:research

完成后才能进入【规划阶段】
```

## Output Format

初始化完成后输出：

```
✅ 项目初始化完成！

📋 项目类型：🆕 全新项目
📍 当前阶段：研究阶段 (1/9)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 研究 → 📝 规划 → 🚧 Gate1 → 🏗️ 架构 → 🎨 原型 → ✅ Gate2 → ⚙️ 后端 → 🔗 集成 → 📦 输出
   ↑
  当前
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 强制顺序模式：必须完成当前步骤才能进入下一步

下一步：运行 /project-optimizer:research 开始研究阶段
```
