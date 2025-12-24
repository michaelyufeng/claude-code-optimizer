---
description: Sprint management for agile development workflow
---

# Sprint 管理 (Sprint Management)

Agile/Scrum Sprint 工作流管理，适用于增量开发和持续交付场景。

## 使用场景

```
适用于:
✅ 采用 Agile/Scrum 方法论的团队
✅ 需要迭代开发的项目
✅ developing 和 maintenance 工作模式
✅ 需要跟踪开发速度 (Velocity) 的场景

不适用于:
❌ 全新项目的前期阶段 (research, plan)
❌ 一次性脚本或原型项目
```

## 命令格式

```bash
# 创建新 Sprint
/project-optimizer:sprint --create

# 查看当前 Sprint 状态
/project-optimizer:sprint --status

# 结束当前 Sprint
/project-optimizer:sprint --complete

# Sprint 回顾会议
/project-optimizer:sprint --retrospective

# 更新 Sprint 任务
/project-optimizer:sprint --update

# 查看 Sprint 历史
/project-optimizer:sprint --history
```

---

## Sprint 创建

### 交互式创建

```bash
/project-optimizer:sprint --create
```

```
🎯 创建新 Sprint

Sprint 名称 (默认: Sprint 1): Sprint 2 - 认证增强
Sprint 周期 (默认: 2 周): 1 周
Sprint 开始日期 (默认: 今天): 2025-12-24
Sprint 目标: 完成用户认证系统，添加 OAuth 支持

───────────────────────────────────────

📋 从任务池选择任务...

可用任务 (来自 TASKS.md):
[1] 📱 实现 OAuth 登录 (8 points, High)
[2] 🔐 添加 2FA 支持 (5 points, Medium)
[3] 📊 用户活动日志 (3 points, Low)
[4] 🐛 修复密码重置 bug (2 points, High)
[5] 📚 更新认证文档 (2 points, Low)

选择任务 (逗号分隔，如: 1,2,4): 1,2,4

───────────────────────────────────────

✅ Sprint 2 已创建

Sprint 名称: Sprint 2 - 认证增强
周期: 2025-12-24 ~ 2025-12-31 (7 天)
总任务: 3 个
总 Story Points: 15
每日目标: 2.14 points/天

已创建:
- .claude/SPRINT_BACKLOG.md
- .claude/DAILY_STANDUP.md (初始化)

下一步:
/project-optimizer:sprint --status  (查看 Sprint 看板)
/project-optimizer:dev              (开始开发)
```

---

## Sprint 状态

### 查看 Sprint 看板

```bash
/project-optimizer:sprint --status
```

```
🎯 Sprint 2 - 认证增强 (Day 3/7)

进度: ████████░░░░░░░░░░░░ 40%

┌──────────────────────────────────────────────┐
│  Story Points: 6/15 完成 (40%)               │
│  任务: 1/3 完成 (33%)                        │
│  剩余时间: 4 天                               │
│  每日需要: 2.25 points/天                     │
│  当前速度: 2.0 points/天 ⚠️ 略慢             │
└──────────────────────────────────────────────┘

📊 Burndown Chart
Points
    15 │ ●
       │  ╲
    12 │   ●
       │    ╲ 理想进度
     9 │     ●─────●  实际进度
       │          ╲
     6 │           ●
       │            ╲
     3 │             ●
       │              ╲
     0 │_______________●___
         D1 D2 D3 D4 D5 D6 D7

📋 任务状态

✅ 已完成 (1)
┌─────────────────────────────────────────────┐
│ ✅ #1 修复密码重置 bug                      │
│    Points: 2 | 实际耗时: 3h                 │
│    完成时间: 2025-12-25 14:30               │
└─────────────────────────────────────────────┘

🔄 进行中 (1)
┌─────────────────────────────────────────────┐
│ 🔄 #2 实现 OAuth 登录                       │
│    Points: 8 | 进度: 50%                    │
│    预估剩余: 8h | 阻塞: 无                  │
│    负责人: Claude                            │
│    ├─ ✅ Google OAuth 配置                  │
│    ├─ 🔄 GitHub OAuth 集成 (60%)            │
│    └─ ⬜ 前端 OAuth 按钮                    │
└─────────────────────────────────────────────┘

⬜ 待办 (1)
┌─────────────────────────────────────────────┐
│ ⬜ #3 添加 2FA 支持                         │
│    Points: 5 | 优先级: Medium               │
│    依赖: #2 完成后开始                       │
└─────────────────────────────────────────────┘

🚧 阻塞 (0)
✅ 无阻塞项

⚠️ 风险
- OAuth 登录进度略慢，可能影响 Sprint 目标
  建议: 优先完成核心功能，2FA 可移至下一 Sprint

下一步:
- 继续完成 OAuth 登录
- 每日更新: /project-optimizer:sprint --update
```

---

## Sprint 更新

### 每日站会更新

```bash
/project-optimizer:sprint --update
```

```
📝 每日 Sprint 更新 (Day 4/7)

昨日完成了什么?
> 完成了 GitHub OAuth 集成，修复了回调 URL 问题

今天计划做什么?
> 1. 完成 OAuth 前端按钮
> 2. 开始 2FA 支持开发

有什么阻塞吗?
> 无

───────────────────────────────────────

✅ 已更新 DAILY_STANDUP.md

当前进度:
- OAuth 登录: 50% → 75%
- Sprint 进度: 40% → 55%
- Story Points: 6 → 9 (预计)

Sprint 健康度: 🟢 健康
```

---

## Sprint 完成

### 结束 Sprint

```bash
/project-optimizer:sprint --complete
```

```
🏁 完成 Sprint 2 - 认证增强

Sprint 周期: 2025-12-24 ~ 2025-12-31 (7 天)

📊 完成统计:
✅ 完成任务: 2/3 (67%)
✅ 完成 Points: 10/15 (67%)
⚠️ 未完成: 1 个任务 (2FA 支持, 5 points)

🎯 Sprint 目标达成: ⚠️ 部分达成
   已完成核心 OAuth 登录，2FA 移至下一 Sprint

📈 Velocity:
   本 Sprint: 10 points / 7 天 = 1.43 points/天
   历史平均: 1.5 points/天
   趋势: 稳定

📋 质量指标:
   测试覆盖率: 75% ✅
   代码审查: 100% ✅
   Bug 修复: 1 个
   技术债: +0 项 ✅

💾 已归档到 docs/HISTORY.md
📝 Sprint 回顾会议: /project-optimizer:sprint --retrospective

是否创建下一个 Sprint? [y/N]: y

───────────────────────────────────────

🎯 创建 Sprint 3

建议携带未完成任务:
[1] 添加 2FA 支持 (5 points)

从任务池添加新任务?
[显示可用任务...]
```

---

## Sprint 回顾

### Retrospective 会议

```bash
/project-optimizer:sprint --retrospective
```

```
🔄 Sprint 2 - 回顾会议

Sprint: Sprint 2 - 认证增强
完成时间: 2025-12-31
参与人: Claude (Agent), User

───────────────────────────────────────

✅ 做得好的 (Keep)

请列出本 Sprint 做得好的方面:
1> OAuth 集成顺利，代码质量高
2> 每日站会坚持良好
3> 测试覆盖率达标
4> (回车结束)

───────────────────────────────────────

⚠️ 需要改进的 (Improve)

请列出需要改进的方面:
1> 任务拆分不够细致，导致 OAuth 任务过大
2> 2FA 功能预估不足，应该提前识别依赖
3> (回车结束)

───────────────────────────────────────

🎯 行动项 (Action Items)

基于改进点，制定具体行动:
1> 任务超过 5 points 必须拆分为子任务
   负责人: Claude
   截止日期: 下一 Sprint Planning

2> Sprint Planning 时识别任务间依赖关系
   负责人: Team
   截止日期: Sprint 3 Planning

3> (回车结束)

───────────────────────────────────────

💡 学到的经验 (Lessons Learned)

1> OAuth 回调 URL 配置需要注意环境差异
2> 第三方 API 集成应该预留缓冲时间
3> (回车结束)

───────────────────────────────────────

✅ 回顾完成

已保存到:
- .claude/SPRINT_BACKLOG.md (归档部分)
- docs/HISTORY.md (长期记忆)

回顾摘要:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Keep (3):
  - OAuth 集成顺利，代码质量高
  - 每日站会坚持良好
  - 测试覆盖率达标

Improve (2):
  - 任务拆分不够细致
  - 功能预估不足

Actions (2):
  - 大任务必须拆分
  - 识别任务依赖

Lessons (2):
  - 环境配置注意事项
  - 第三方集成预留缓冲
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Sprint 历史

### 查看历史 Sprint

```bash
/project-optimizer:sprint --history
```

```
📚 Sprint 历史

┌────────────────────────────────────────────────┐
│ Sprint 2 - 认证增强                            │
│ 2025-12-24 ~ 2025-12-31 (7 天)                 │
│ ──────────────────────────────────────────     │
│ 完成: 10/15 points (67%)                       │
│ Velocity: 1.43 points/天                       │
│ 质量: 测试 75%, 无技术债                       │
│ 状态: ✅ 已完成                                │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│ Sprint 1 - 项目初始化                          │
│ 2025-12-10 ~ 2025-12-17 (7 天)                 │
│ ──────────────────────────────────────────     │
│ 完成: 12/12 points (100%)                      │
│ Velocity: 1.71 points/天                       │
│ 质量: 测试 80%, 无技术债                       │
│ 状态: ✅ 已完成                                │
└────────────────────────────────────────────────┘

📈 Velocity 趋势:
Sprint 1: 1.71 ████████████████████
Sprint 2: 1.43 ███████████████
────────────────────────────────
平均: 1.57 points/天
```

---

## 与 Developing 模式集成

### 典型工作流

```bash
# 1. 扫描项目，识别为 developing 模式
/project-optimizer:scan
→ 推荐: developing 模式

# 2. 启动 developing 工作流
/project-optimizer:start --type developing
→ analyze 阶段: 分析架构和代码

# 3. 创建 Sprint 1
/project-optimizer:sprint --create
→ 选择任务，设定目标

# 4. 开始开发 (增量模式)
/project-optimizer:dev
→ 自动进入增量开发模式
→ 遵守 RESTRICTIONS.md 约束
→ 更新 DAILY_STANDUP.md

# 5. 每日更新
/project-optimizer:sprint --update
→ 记录进度和阻塞

# 6. Sprint 完成
/project-optimizer:sprint --complete
→ 统计 Velocity
→ 回顾会议

# 7. 继续下一 Sprint
/project-optimizer:sprint --create
→ 循环迭代
```

---

## 与任务分割集成

### 自动分割 + Sprint

```bash
# Sprint 任务过大时，自动建议分割
/project-optimizer:sprint --create

选择任务: 1,2,3

⚠️ 检测到大任务
任务 #1: 实现 OAuth 登录 (8 points)
建议: 此任务较大，是否分割为子任务?
[y/N]: y

───────────────────────────────────────

🔧 任务分割建议

任务 #1 可分割为:
├─ [3 points] Google OAuth 配置
├─ [3 points] GitHub OAuth 集成
└─ [2 points] 前端 OAuth 按钮

是否应用此分割? [y/N]: y

✅ 已分割并添加到 Sprint

Sprint 任务更新:
- 原任务 #1 (8 points) → 3 个子任务
- 总任务: 3 → 5
- 总 Points: 15 (不变)
- 平均任务大小: 5 → 3 points
```

---

## Sprint 指标

### 关键指标跟踪

```
📊 Sprint 2 关键指标

🎯 交付指标:
   Commitment: 15 points
   Completed: 10 points
   完成率: 67%

⚡ 效率指标:
   Velocity: 1.43 points/天
   历史平均: 1.57 points/天
   偏差: -8.9%

🐛 质量指标:
   测试覆盖率: 75%
   Bug 发现: 0 个
   Bug 修复: 1 个
   技术债: +0 项

⏱️ 时间指标:
   计划工时: 40h
   实际工时: 35h
   效率: 114%
```

---

## 配置选项

### Sprint 配置文件

`.claude/sprint-config.json` (自动生成):

```json
{
  "defaultSprintLength": 14,
  "defaultLengthUnit": "days",
  "storyPointScale": "fibonacci",
  "velocityCalculation": "average",
  "burndownUpdateFrequency": "daily",
  "autoArchive": true,
  "integrations": {
    "tasks": true,
    "git": true,
    "testing": true
  }
}
```

### 自定义 Story Points 刻度

```bash
# Fibonacci (默认): 1, 2, 3, 5, 8, 13
# Linear: 1, 2, 3, 4, 5, 6
# T-shirt: XS, S, M, L, XL
```

---

## 与其他命令协同

### Sprint + Dev

```bash
/project-optimizer:dev

# 开发阶段会自动:
1. 读取当前 Sprint 任务
2. 按优先级排序
3. 进入增量开发模式
4. 完成后更新 Sprint 进度
```

### Sprint + Test

```bash
/project-optimizer:test

# 测试阶段会:
1. 针对 Sprint 任务生成测试
2. 更新测试覆盖率指标
3. 阻塞 Sprint 完成（如果覆盖率不达标）
```

### Sprint + Sync

```bash
/project-optimizer:sync

# 同步时会:
1. 更新 Sprint 任务状态
2. 检测离线完成的任务
3. 自动记录到 DAILY_STANDUP
```

---

## 最佳实践

### Sprint Planning

```
✅ DO:
- Sprint 长度保持一致 (1-2 周)
- 任务大小均匀 (2-5 points)
- 留 20% 缓冲时间
- 明确 Sprint 目标
- 识别任务依赖

❌ DON'T:
- Sprint 过长 (>3 周)
- 任务过大 (>8 points)
- 100% 填满容量
- 模糊的目标
- 忽略技术债
```

### Daily Standup

```
✅ DO:
- 每天更新进度
- 及时标记阻塞
- 更新预估剩余时间
- 记录关键决策

❌ DON'T:
- 几天才更新一次
- 隐藏阻塞问题
- 不更新预估
- 口头沟通不记录
```

### Sprint Retrospective

```
✅ DO:
- 诚实反思问题
- 制定具体行动项
- 跟踪行动项执行
- 分享经验教训

❌ DON'T:
- 走形式不认真
- 只列问题不行动
- 行动项无人负责
- 同样问题重复出现
```

---

## 故障排除

### Q: Sprint 进度追踪不准确？

A: 可能原因:
1. 忘记更新任务状态 → 使用 `/sprint --update`
2. 离线工作未同步 → 使用 `/sync --detect`
3. 子任务未关联 → 检查 SPRINT_BACKLOG.md

### Q: Velocity 波动太大？

A: 建议:
1. 检查任务预估准确性
2. 确保 Story Points 一致性
3. 至少 3 个 Sprint 后才参考 Velocity
4. 考虑团队容量变化

### Q: Sprint 经常无法完成？

A: 分析:
1. 任务预估过于乐观 → 查看历史偏差
2. 未预留缓冲时间 → 建议 80% 容量规划
3. 阻塞未及时处理 → 每日检查阻塞项
4. 优先级不合理 → 重新排序任务

---

*此命令对应 project-planner-pro 的增量迭代模式*
*参考: docs/V1.0.7_UPGRADE_PLAN.md*
