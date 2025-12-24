# Sprint 任务管理 (Sprint Backlog)

> 项目: {{projectName}}
> Sprint: {{sprintNumber}} - {{sprintName}}
> 周期: {{sprintStart}} → {{sprintEnd}} ({{sprintLength}} 天)
> 工作模式: {{workMode}}

---

## 🎯 Sprint 目标 (Sprint Goal)

### 主要目标

{{sprintGoal}}

### 成功标准

{{#successCriteria}}
- {{criterion}}
{{/successCriteria}}

---

## 📊 Sprint 概览 (Sprint Overview)

### 进度统计

```
Sprint 进度:  ████████████░░░░░░░░ {{sprintProgress}}%
任务完成率:   {{completedTasks}}/{{totalTasks}} ({{completionRate}}%)
Story Points: {{completedPoints}}/{{plannedPoints}} ({{pointsRate}}%)
剩余天数:     {{remainingDays}} 天
每日需完成:   {{dailyRequired}} points/天
```

### 健康度评估

| 指标 | 状态 | 值 | 目标 |
|------|------|-----|------|
| 进度 | {{progressHealth}} | {{sprintProgress}}% | ≥ {{targetProgress}}% |
| Velocity | {{velocityHealth}} | {{currentVelocity}} | {{targetVelocity}} |
| 测试覆盖 | {{testHealth}} | {{testCoverage}}% | ≥ 80% |
| Bug 数量 | {{bugHealth}} | {{openBugs}} | ≤ {{maxBugs}} |

---

## 📋 任务列表 (Task List)

### 🔥 高优先级 (High Priority)

{{#highPriorityTasks}}
#### {{taskId}} - {{taskTitle}} {{#isCompleted}}✅{{/isCompleted}}

- **类型**: {{taskType}}
- **Story Points**: {{storyPoints}}
- **状态**: {{status}}
- **负责人**: {{assignee}}
- **进度**: {{progress}}%
- **预估时间**: {{estimate}}
- **已用时间**: {{spent}}
- **剩余时间**: {{remaining}}

**描述**: {{description}}

**验收标准**:
{{#acceptanceCriteria}}
- {{#isDone}}☑{{/isDone}}{{^isDone}}☐{{/isDone}} {{criterion}}
{{/acceptanceCriteria}}

**子任务**:
{{#subtasks}}
- {{#isDone}}✅{{/isDone}}{{^isDone}}⬜{{/isDone}} {{subtask}} ({{subtaskEstimate}})
{{/subtasks}}

**阻塞点**: {{blockers}}

---

{{/highPriorityTasks}}

### ⚡ 中优先级 (Medium Priority)

{{#mediumPriorityTasks}}
#### {{taskId}} - {{taskTitle}} {{#isCompleted}}✅{{/isCompleted}}

- **Story Points**: {{storyPoints}}
- **状态**: {{status}}
- **进度**: {{progress}}%

{{/mediumPriorityTasks}}

### 📌 低优先级 (Low Priority)

{{#lowPriorityTasks}}
#### {{taskId}} - {{taskTitle}} {{#isCompleted}}✅{{/isCompleted}}

- **Story Points**: {{storyPoints}}
- **状态**: {{status}}

{{/lowPriorityTasks}}

---

## 📈 Burndown Chart (燃尽图)

### Story Points Burndown

```
Points
  {{totalPoints}} │ ●
                  │  ╲
  {{day1Points}}  │   ●
                  │    ╲
  {{day2Points}}  │     ●
                  │      ╲ 理想趋势线
  {{day3Points}}  │       ●
                  │        ╲
  {{day4Points}}  │         ●
                  │          ╲
                0 │___________●____________
                    D1 D2 D3 D4 D5 D6 D7

实际进度: {{actualProgress}} ({{progressTrend}})
理想进度: {{idealProgress}}
```

### 每日完成情况

| 日期 | 计划 Points | 实际 Points | 累计完成 | 剩余 |
|------|------------|------------|----------|------|
{{#dailyProgress}}
| {{date}} | {{planned}} | {{actual}} | {{cumulative}} | {{remaining}} |
{{/dailyProgress}}

---

## 🚧 阻塞与风险 (Blockers & Risks)

### 当前阻塞

{{#blockers}}
#### {{blockerId}} - {{blockerTitle}}

- **影响任务**: {{affectedTasks}}
- **严重程度**: {{severity}}
- **等待**: {{waitingFor}}
- **预计解决**: {{expectedResolution}}
- **备选方案**: {{workaround}}

---

{{/blockers}}

{{#unless blockers}}
✅ 无阻塞项
{{/unless}}

### 风险识别

{{#risks}}
#### {{riskTitle}} ({{probability}} × {{impact}})

- **描述**: {{description}}
- **影响**: {{impact}}
- **缓解措施**: {{mitigation}}
- **负责人**: {{owner}}

---

{{/risks}}

---

## ✅ 已完成任务 (Completed Tasks)

{{#completedTasks}}
### {{taskId}} - {{taskTitle}} ✅

- **完成时间**: {{completedDate}}
- **实际耗时**: {{actualTime}}
- **Story Points**: {{storyPoints}}
- **Commit**: {{commitHash}}

{{/completedTasks}}

---

## 🔄 Sprint 事件 (Sprint Events)

### Sprint Planning

```
时间: {{planningDate}}
参与人: {{planningParticipants}}
输出: {{planningOutputs}}
```

### Daily Standup

参见 [DAILY_STANDUP.md](.claude/DAILY_STANDUP.md)

### Sprint Review

```
时间: {{reviewDate}}
演示内容: {{reviewDemos}}
反馈: {{reviewFeedback}}
```

### Sprint Retrospective

```
时间: {{retroDate}}

做得好的 (Keep):
{{#retroKeep}}
- {{item}}
{{/retroKeep}}

需改进的 (Improve):
{{#retroImprove}}
- {{item}}
{{/retroImprove}}

行动项 (Actions):
{{#retroActions}}
- {{action}} (负责人: {{owner}})
{{/retroActions}}
```

---

## 📊 质量指标 (Quality Metrics)

### 代码质量

```
测试覆盖率:     {{testCoverage}}%
代码审查率:     {{codeReviewRate}}%
静态检查通过率: {{lintPassRate}}%
```

### Bug 统计

| 类型 | 新增 | 已修复 | 待修复 |
|------|------|--------|--------|
| P0 (致命) | {{p0New}} | {{p0Fixed}} | {{p0Open}} |
| P1 (严重) | {{p1New}} | {{p1Fixed}} | {{p1Open}} |
| P2 (一般) | {{p2New}} | {{p2Fixed}} | {{p2Open}} |
| P3 (轻微) | {{p3New}} | {{p3Fixed}} | {{p3Open}} |

### 技术债

```
新增技术债: {{newDebt}} 项
偿还技术债: {{paidDebt}} 项
剩余技术债: {{remainingDebt}} 项
```

---

## 🎯 下个 Sprint 预览 (Next Sprint Preview)

### 候选任务

{{#nextSprintCandidates}}
- {{taskTitle}} ({{storyPoints}} points) - 优先级: {{priority}}
{{/nextSprintCandidates}}

### 规划建议

{{#planningNotes}}
- {{note}}
{{/planningNotes}}

---

## 📝 Sprint 日志 (Sprint Log)

{{#sprintLogs}}
### {{date}} - {{event}}

{{description}}

**影响**: {{impact}}

---

{{/sprintLogs}}

---

## 🔗 相关链接

- [每日站会](DAILY_STANDUP.md)
- [任务追踪](TASKS.md)
- [项目约束](RESTRICTIONS.md)
- [项目配置](../CLAUDE.md)
- [长期记忆](../docs/HISTORY.md)

---

## 📌 团队信息

### Sprint 成员

{{#teamMembers}}
- **{{name}}** ({{role}})
  - Capacity: {{capacity}}h/天
  - 当前任务: {{currentTasks}}
  - 已完成: {{completedPoints}} points
{{/teamMembers}}

### 工作时间

```
工作日: {{workDays}}
团队总容量: {{teamCapacity}}h
已使用: {{usedCapacity}}h ({{capacityUsage}}%)
剩余: {{remainingCapacity}}h
```

---

*此文件由 /project-optimizer:sprint 自动管理*
*最后更新: {{lastUpdate}}*
*下次 Sprint Planning: {{nextPlanningDate}}*
