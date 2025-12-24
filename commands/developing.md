---
description: Developing mode for in-progress projects with incremental development
---

# 开发中模式 (Developing Mode)

针对**已有基础、正在开发中**的项目，采用增量开发模式，保护现有结构的同时持续迭代。

## 适用场景

```
✅ 适用项目特征:
- Git commits: 10-500+
- 代码完成度: 30-80%
- 有一定测试覆盖 (>30%)
- 核心功能部分完成
- 活跃开发中（近期有提交）

❌ 不适用:
- 全新项目 (用 new 模式)
- 完成度 >90% (用 maintenance 模式)
- 需要大规模重构 (用 new 模式重新规划)
```

## 启动方式

### 自动检测启动

```bash
# 扫描后自动推荐
/project-optimizer:scan
→ 推荐: developing 模式

/project-optimizer:start --type developing
```

### 手动指定启动

```bash
# 直接启动 developing 模式
/project-optimizer:start --type developing

# 从特定阶段开始
/project-optimizer:start --type developing --phase dev
```

---

## Developing 模式流程

### 4 阶段工作流

```
🔧 Developing 模式

analyze → update-plan → continue-dev → verify
  (分析)    (更新计划)     (继续开发)     (验证)
    │           │              │            │
    ▼           ▼              ▼            ▼
[扫描现状] [调整路线] [增量开发] [质量检查]
    │           │              │            │
    └───Gate 1──┘              └──Gate 2────┘
      (方案确认)                 (交付质量)
```

### 对比 New 模式

| 阶段 | New 模式 (6 阶段) | Developing 模式 (4 阶段) |
|------|------------------|------------------------|
| 前期 | research → plan → arch | analyze (一次完成) |
| 开发 | dev (从零开始) | continue-dev (增量) |
| 测试 | test | verify (集成到 dev) |
| 部署 | deploy | (按需执行) |

**时间对比**:
- New 模式: 完整 6 阶段，~10-20 小时
- Developing 模式: 4 阶段，~5-10 小时 ✅ 节省 50%

---

## 阶段 1: Analyze (分析现状)

### 执行内容

```
📊 分析项目现状 (30-45 分钟)

自动执行:
1. 代码扫描 (/scan)
   - Git 历史分析
   - 代码结构扫描
   - 功能完成度评估

2. 架构审查
   - 现有架构模式识别
   - API 设计评估
   - 数据模型分析

3. 技术债清单
   - Critical 问题识别
   - Important 改进点
   - Nice-to-have 优化

4. 约束识别
   - API 红线 (不可变更)
   - 数据库 schema 约束
   - 依赖版本锁定
   - 结构保护规则
```

### 输出文件

```
生成:
├── .claude/PROJECT_SNAPSHOT.json    # 项目快照
├── .claude/RESTRICTIONS.md          # 约束规则
├── docs/ARCHITECTURE_REVIEW.md      # 架构审查
└── docs/TECHNICAL_DEBT.md           # 技术债清单
```

### 决策点

```
🎯 分析完成，请确认:

1. 项目完成度: 65%
   核心功能: 认证✅, 用户管理✅, 权限❌, 审计❌

2. 架构评估: 良好
   - REST API 设计合理
   - 数据模型清晰
   - 模块化程度: 中等

3. 技术债: 6 项
   - Critical: 2 项 (缺少错误处理, 硬编码配置)
   - Important: 4 项

4. 约束识别: 15 个 API 端点需保护

下一步选择:
[1] 继续现有架构 (推荐) - 增量迭代
[2] 调整架构方向 - 重新规划部分模块
[3] 暂停分析 - 需要更多信息

选择: 1

✅ 进入 update-plan 阶段
```

---

## 阶段 2: Update-Plan (更新计划)

### 执行内容

```
📋 更新开发计划 (20-30 分钟)

基于分析结果:
1. 读取现有 PRD/TASKS (如果存在)
2. 识别待完成功能
3. 优先级排序
4. 拆分为可执行任务
5. 创建 Sprint Backlog
```

### 任务规划

```
🎯 待完成功能清单

高优先级 (Must Have):
[1] 角色权限系统 (8 points)
    └─ 依赖: 用户管理 (已完成✅)
[2] 日志审计系统 (5 points)

中优先级 (Should Have):
[3] 数据导出功能 (3 points)
[4] 高级搜索 (5 points)

低优先级 (Nice to Have):
[5] 多语言支持 (8 points)

技术债修复 (Critical):
[6] 添加错误处理中间件 (2 points)
[7] 提取硬编码配置 (1 point)

───────────────────────────────────────

请选择本次迭代目标:
[1] 完成所有高优先级 (推荐)
[2] 高优先级 + 技术债
[3] 自定义选择

选择: 2

✅ 本次迭代任务:
- 角色权限系统 (8 points)
- 日志审计系统 (5 points)
- 错误处理中间件 (2 points)
- 配置提取 (1 point)

总计: 16 points
预估时间: 16-20 小时 (按 1 point = 1h)

是否创建 Sprint? [y/N]: y
```

### Gate 1 检查

```
🚧 Gate 1: 方案确认

检查项:
✅ 开发计划完整
✅ 任务优先级合理
✅ 约束规则已识别
✅ Sprint 已创建

结果: ✅ 通过

✅ 进入 continue-dev 阶段
```

---

## 阶段 3: Continue-Dev (继续开发)

### 增量开发模式

```
💻 增量开发 (Incremental Development)

核心原则:
1. 保护现有结构 (Preserve Structure)
2. 向后兼容 (Backward Compatible)
3. 小步提交 (Small Commits)
4. 持续集成 (Continuous Integration)
```

### 开发约束

```
🔒 强制约束 (来自 RESTRICTIONS.md)

❌ 禁止:
- 修改现有 API 签名
- 删除/重命名公共函数
- 更改数据库表结构 (无迁移)
- 破坏现有单元测试
- 更改环境变量名称

✅ 允许:
- 新增 API 端点
- 扩展现有函数 (保持签名)
- 添加数据库列 (有迁移脚本)
- 新增单元测试
- 新增环境变量

⚠️ 需审批:
- 废弃现有 API (需 @deprecated 标记)
- 重构内部实现 (需保证测试通过)
- 升级主要依赖版本
```

### 开发流程

```
📝 任务: 实现角色权限系统

1. 读取约束
   ✅ 检查 RESTRICTIONS.md
   → 用户表不可变更
   → 需保持现有 /users API 兼容

2. 设计方案 (提供选项)
   选项 A: 新建 roles 表 + 关联表 (推荐)
   选项 B: 扩展 users 表 (简单但耦合)
   选项 C: RBAC 服务化 (复杂但解耦)

   用户选择: A

3. 拆分子任务
   ├─ 创建 roles 表 (迁移脚本)
   ├─ 创建 user_roles 关联表
   ├─ 实现 RoleService
   ├─ 添加 /roles API (新端点✅)
   ├─ 权限检查中间件
   └─ 单元测试 (覆盖率 >80%)

4. 增量实现 (每个子任务一个 commit)
   [dev] 创建 roles 表迁移脚本
   [dev] 实现 RoleService 核心逻辑
   [dev] 添加 /roles CRUD API
   [dev] 实现权限检查中间件
   [test] 添加 RoleService 单元测试

5. 验证约束
   ✅ 现有 API 未变更
   ✅ 现有测试全部通过
   ✅ 新功能测试覆盖率 85%
   ✅ 迁移脚本可回滚
```

### 自动模型选择

```
💰 智能模型分配 (节省成本)

任务拆分后自动选择:

| 子任务 | 类型 | 规模 | 模型 | 成本 |
|--------|------|------|------|------|
| 迁移脚本 | 模板化 | S | Haiku | $ |
| RoleService | 复杂编码 | M | Sonnet | $$$ |
| CRUD API | 标准 CRUD | M | Sonnet | $$$ |
| 中间件 | 复杂逻辑 | M | Sonnet | $$$ |
| 单元测试 | 测试代码 | M | Haiku | $ |

原始任务 (L, 8 points) → Opus → $$$$$
分割后总成本 → $$$$ (节省 20%)
```

### 每日更新

```
/project-optimizer:sprint --update

📝 Day 2 站会更新

昨日完成:
- ✅ 创建 roles 表迁移脚本
- ✅ 实现 RoleService 核心逻辑

今日计划:
- 🔄 添加 /roles CRUD API
- ⬜ 实现权限检查中间件

阻塞: 无

Sprint 进度: 2/16 points → 6/16 points (38%)
```

---

## 阶段 4: Verify (验证质量)

### 综合验证

```
🧪 质量验证 (30-60 分钟)

自动检查:
1. 单元测试 ✅
   - 覆盖率: 85% (目标: >80%)
   - 通过率: 100%

2. 集成测试 ✅
   - 新功能集成: 通过
   - 回归测试: 通过

3. 约束合规性 ✅
   - API 签名检查: 无变更
   - 数据库 schema: 有迁移脚本
   - 依赖版本: 符合约束

4. 代码质量 ✅
   - Linter: 0 errors, 2 warnings
   - 技术债: -2 (修复了 Critical 问题)

5. 文档更新 ✅
   - API 文档: 已更新
   - README: 已更新
   - CHANGELOG: 已添加
```

### Gate 2 检查

```
🚧 Gate 2: 交付质量

检查项:
✅ 功能完成 (角色权限系统 100%)
✅ 测试覆盖率 ≥ 80% (实际 85%)
✅ 无 Breaking Changes
✅ 迁移脚本已准备
✅ 文档已更新
⚠️ 2 个 Linter warnings (可接受)

结果: ✅ 通过

✅ 可以部署 (如需要)
✅ 可以开始下一 Sprint
```

---

## Developing vs New vs Maintenance

### 三种模式对比

| 特性 | New | Developing | Maintenance |
|------|-----|------------|-------------|
| 适用场景 | 全新项目 | 开发中项目 | 成熟项目 |
| 阶段数 | 6 | 4 | 3 |
| 时间成本 | 10-20h | 5-10h | 2-5h |
| 架构设计 | 完整设计 | 审查+微调 | 不变 |
| 约束规则 | 建立规则 | 识别+遵守 | 严格遵守 |
| 开发模式 | 从零开始 | 增量开发 | 修复为主 |
| 测试要求 | 新建测试 | 扩展测试 | 回归测试 |
| 文档要求 | 完整文档 | 更新文档 | 更新 CHANGELOG |
| Breaking Changes | 允许 | 不允许 | 绝对禁止 |

### 选择决策树

```
项目扫描
    │
    ├─ 完成度 < 30%
    │  └─ new 模式 (完整规划)
    │
    ├─ 完成度 30-80%
    │  ├─ 需要重新规划?
    │  │  ├─ 是 → new 模式
    │  │  └─ 否 → developing 模式 ✅
    │  │
    │  └─ 最近活跃开发?
    │     ├─ 是 → developing 模式 ✅
    │     └─ 否 → maintenance 模式
    │
    └─ 完成度 > 80%
       └─ maintenance 模式 (仅修复)
```

---

## 与其他命令集成

### Scan + Developing

```bash
# 1. 扫描项目
/project-optimizer:scan
→ 分析: 65% 完成度，活跃开发
→ 推荐: developing 模式

# 2. 启动 developing
/project-optimizer:start --type developing
→ 自动执行 analyze 阶段
→ 读取 PROJECT_SNAPSHOT.json
→ 进入 update-plan
```

### Developing + Sprint

```bash
# developing 模式会自动创建 Sprint
/project-optimizer:start --type developing

update-plan 阶段会提示:
"是否创建 Sprint? [y/N]"

创建后:
- SPRINT_BACKLOG.md
- DAILY_STANDUP.md
- 自动跟踪进度
```

### Developing + Git Memory

```bash
# developing 模式利用 Git 历史
analyze 阶段会:
1. 读取最近 30 个 commits
2. 分析提交模式
3. 识别主要功能模块
4. 评估开发速度 (Velocity)

基于 Git 历史推荐:
- 任务优先级
- Sprint 容量
- 风险识别
```

---

## 最佳实践

### DO ✅

```
1. 保护现有结构
   - 先分析再修改
   - 遵守 RESTRICTIONS.md
   - 小步提交

2. 增量开发
   - 任务拆分为 2-5 points
   - 每个子任务独立可测
   - 持续集成

3. 向后兼容
   - 新增不修改
   - 废弃不删除
   - 提供迁移路径

4. 质量优先
   - 测试覆盖率 >80%
   - 修复 Critical 技术债
   - 代码审查
```

### DON'T ❌

```
1. 不要破坏现有功能
   - 不修改 API 签名
   - 不删除环境变量
   - 不改变默认行为

2. 不要大规模重构
   - 不一次性改太多文件
   - 不改变整体架构
   - 不升级主要版本依赖

3. 不要跳过验证
   - 不跳过测试
   - 不忽略 Linter 警告
   - 不省略迁移脚本

4. 不要忽略约束
   - 不删除红线标记的代码
   - 不修改锁定的依赖
   - 不绕过 Gate 检查
```

---

## 示例工作流

### 完整示例

```bash
# ========== 会话开始 ==========

# 接手已有项目
cd my-app

# 扫描项目
/project-optimizer:scan

📊 扫描结果:
- Commits: 247
- 完成度: 65%
- 活跃度: 高 (最近 7 天 15 次提交)
- 测试: 72%

🎯 推荐: developing 模式


# 启动 developing
/project-optimizer:start --type developing

# ──────────────────────────────
# 阶段 1: Analyze
# ──────────────────────────────

📊 分析项目现状...

✅ 已生成:
- PROJECT_SNAPSHOT.json
- RESTRICTIONS.md
- ARCHITECTURE_REVIEW.md

🎯 分析完成:
- 架构: REST API, 数据库 8 表
- 技术债: 6 项 (2 Critical)
- 约束: 15 个 API 需保护

选择: [1] 继续现有架构 (推荐)
→ 选择: 1

✅ 通过 Gate 1


# ──────────────────────────────
# 阶段 2: Update-Plan
# ──────────────────────────────

📋 更新开发计划...

待完成功能:
[1] 角色权限系统 (8 points) - High
[2] 日志审计 (5 points) - High
[3] 数据导出 (3 points) - Medium
[4] 高级搜索 (5 points) - Medium

技术债:
[5] 错误处理 (2 points) - Critical
[6] 配置提取 (1 point) - Critical

本次迭代选择:
→ 选择: [1] [2] [5] [6] (高优先级 + Critical 债)

总计: 16 points (约 16-20h)

是否创建 Sprint? [y/N]: y

✅ Sprint 1 已创建
   - 目标: 完成权限系统，修复关键技术债
   - 周期: 7 天
   - 容量: 16 points


# ──────────────────────────────
# 阶段 3: Continue-Dev
# ──────────────────────────────

💻 开始增量开发...

🔒 读取约束: RESTRICTIONS.md
   - 保护 15 个 API
   - 数据库变更需迁移脚本

📝 任务 1: 错误处理中间件 (Critical)

方案选择:
[1] Express 中间件 (推荐)
[2] 全局 try-catch
→ 选择: 1

实现中... (使用 Haiku 模型，节省成本)

✅ 已完成:
   - src/middleware/errorHandler.ts
   - 单元测试覆盖率 90%
   - Commit: [fix] 添加全局错误处理中间件

Sprint 更新: 2/16 points (12%)


📝 任务 2: 配置提取 (Critical)

✅ 已完成:
   - 提取到 .env
   - 添加 config validation
   - Commit: [refactor] 提取硬编码配置到环境变量

Sprint 更新: 3/16 points (19%)


📝 任务 3: 角色权限系统 (High, 8 points)

检测到大任务，自动分割:
├─ [2] 创建 roles 表
├─ [3] RoleService 实现
├─ [2] CRUD API
└─ [1] 单元测试

每日站会:
Day 1: 完成 roles 表迁移
Day 2: 完成 RoleService
Day 3: 完成 CRUD API
Day 4: 完成单元测试

✅ 任务完成
Sprint 更新: 11/16 points (69%)


# ──────────────────────────────
# 阶段 4: Verify
# ──────────────────────────────

🧪 质量验证...

✅ 单元测试: 85% (目标 80%)
✅ 集成测试: 通过
✅ API 签名: 无变更
✅ 迁移脚本: 已准备
✅ 文档: 已更新

🚧 Gate 2 检查:
✅ 功能完成
✅ 测试覆盖
✅ 无 Breaking Changes
✅ 质量达标

结果: ✅ 通过

━━━━━━━━━━━━━━━━━━━━━━━
🎉 Sprint 1 完成!

完成: 16/16 points (100%)
Velocity: 2.3 points/天
技术债: -2 (修复 2 个 Critical)
质量: 测试 85%, 无新 Bug
━━━━━━━━━━━━━━━━━━━━━━━

下一步:
[1] 开始 Sprint 2
[2] 部署到测试环境
[3] 回顾会议

→ 选择: 3


# 回顾会议
/project-optimizer:sprint --retrospective

[记录 Keep, Improve, Actions...]

✅ 回顾完成

归档到:
- docs/HISTORY.md
- SPRINT_BACKLOG.md


# ========== 会话结束 ==========
```

---

## 故障排除

### Q: 扫描说不适合 developing 模式？

A: 可能原因:
- 完成度太低 (<30%) → 用 new 模式
- 完成度太高 (>90%) → 用 maintenance 模式
- Git 历史太少 (<10 commits) → 用 new 模式

### Q: Gate 1 检查不通过？

A: 常见问题:
- 约束识别不完整 → 手动补充 RESTRICTIONS.md
- 任务拆分不合理 → 重新规划任务
- 优先级不明确 → 与用户确认

### Q: 开发时违反约束怎么办？

A: 处理流程:
1. 立即停止修改
2. 检查 RESTRICTIONS.md
3. 选择:
   - [1] 调整方案 (推荐)
   - [2] 申请豁免 (需记录原因)
   - [3] 降低优先级

### Q: Velocity 与预估差距大？

A: 调整策略:
1. 重新校准 Story Points
2. 下次 Sprint 降低容量
3. 分析偏差原因 (技术债、依赖阻塞等)

---

*此模式对应 project-planner-pro 的 developing 状态*
*参考: docs/V1.0.7_UPGRADE_PLAN.md*
