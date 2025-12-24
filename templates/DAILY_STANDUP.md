# 每日站会日志 (Daily Standup Log)

> 项目: {{projectName}}
> Sprint: {{currentSprint}}
> 工作模式: {{workMode}}

---

## 📅 当前会话 (Current Session)

### {{currentDate}} - Session {{sessionId}}

**时间**: {{startTime}} - {{currentTime}} ({{duration}})
**模式**: {{workMode}}
**阶段**: {{currentPhase}}

#### 今日完成 (Completed Today)

{{#todayCompleted}}
- ✅ {{task}} ({{duration}})
  - 说明: {{description}}
  - Commit: {{commitHash}}
{{/todayCompleted}}

{{#unless todayCompleted}}
*暂无完成项*
{{/unless}}

#### 进行中 (In Progress)

{{#inProgress}}
- 🔄 {{task}} ({{progress}}%)
  - 预估剩余: {{remaining}}
  - 阻塞点: {{blockers}}
  - 下一步: {{nextAction}}
{{/inProgress}}

{{#unless inProgress}}
*暂无进行中任务*
{{/unless}}

#### 待办 (Todo Today)

{{#todoToday}}
- ⬜ {{task}}
  - 优先级: {{priority}}
  - 预估时间: {{estimate}}
{{/todoToday}}

{{#unless todoToday}}
*暂无待办任务*
{{/unless}}

#### 阻塞点 (Blockers)

{{#blockers}}
- 🚧 {{blocker}}
  - 影响: {{impact}}
  - 等待: {{waiting}}
  - 解决方案: {{solution}}
{{/blockers}}

{{#unless blockers}}
*无阻塞*
{{/unless}}

---

## 📊 本周汇总 (Week Summary)

### 周进度

```
本周: 第 {{weekNumber}} 周 ({{weekStart}} - {{weekEnd}})
Sprint: {{sprintName}} (Day {{sprintDay}}/{{sprintLength}})
完成任务: {{completedCount}}/{{plannedCount}} ({{completionRate}}%)
累计时间: {{totalHours}}h
```

### 本周完成

{{#weekCompleted}}
#### {{date}}

{{#tasks}}
- ✅ {{task}} ({{duration}})
{{/tasks}}

{{/weekCompleted}}

### 本周目标完成情况

| 目标 | 状态 | 进度 | 备注 |
|------|------|------|------|
{{#weekGoals}}
| {{goal}} | {{status}} | {{progress}}% | {{note}} |
{{/weekGoals}}

---

## 📈 Sprint 跟踪

### Sprint {{sprintNumber}} - {{sprintName}}

```
周期: {{sprintStart}} - {{sprintEnd}}
总任务: {{totalTasks}}
完成: {{completedTasks}}
进行中: {{inProgressTasks}}
待办: {{todoTasks}}
Sprint 健康度: {{sprintHealth}}
```

### Sprint Burndown

```
Day 1:  ████████████████████ 100%
Day 2:  ████████████████░░░░  80%
Day 3:  ████████████░░░░░░░░  60%
Day 4:  ████████░░░░░░░░░░░░  40%
Day 5:  ████░░░░░░░░░░░░░░░░  20%
Day 6:  ░░░░░░░░░░░░░░░░░░░░   0%
        ────────────────────
        目标: {{targetDate}}
        实际: {{actualProgress}}%
```

### Velocity 趋势

| Sprint | 计划 | 完成 | Velocity |
|--------|------|------|----------|
{{#velocityHistory}}
| Sprint {{number}} | {{planned}} | {{completed}} | {{velocity}} |
{{/velocityHistory}}

---

## 🎯 关键指标 (Key Metrics)

### 今日指标

```
代码提交: {{todayCommits}} 次
代码行数: +{{linesAdded}} / -{{linesDeleted}}
测试覆盖率: {{testCoverage}}%
技术债: {{technicalDebt}} 项
```

### 质量指标

```
代码审查: {{codeReviews}} 个
Bug 发现: {{bugsFound}} 个
Bug 修复: {{bugsFixed}} 个
重构任务: {{refactorings}} 个
```

---

## 🧠 决策与讨论 (Decisions & Discussions)

{{#decisions}}
### {{timestamp}} - {{title}}

**讨论内容**: {{discussion}}
**决策结果**: {{decision}}
**执行人**: {{owner}}
**截止日期**: {{deadline}}

---

{{/decisions}}

{{#unless decisions}}
*暂无决策记录*
{{/unless}}

---

## 🔄 会话历史 (Session History)

{{#sessionHistory}}
### {{date}} - Session {{id}}

**时长**: {{duration}}
**完成**: {{completedCount}} 个任务
**主要产出**:
{{#outputs}}
- {{output}}
{{/outputs}}

**遇到的问题**:
{{#issues}}
- {{issue}} ({{resolution}})
{{/issues}}

---

{{/sessionHistory}}

---

## 📝 团队协作 (Team Collaboration)

### 今日沟通

{{#communications}}
- **{{time}}** - {{person}}: {{message}}
{{/communications}}

### 代码审查

{{#codeReviews}}
#### {{prTitle}} (#{{prNumber}})

- 审查人: {{reviewer}}
- 状态: {{status}}
- 评论数: {{comments}}
- 建议: {{suggestions}}

{{/codeReviews}}

---

## 💡 学习与改进 (Learning & Improvement)

### 今日学到的

{{#learnings}}
- {{learning}}
{{/learnings}}

### 流程改进建议

{{#improvements}}
- {{suggestion}} (优先级: {{priority}})
{{/improvements}}

---

## 🚀 明日计划 (Tomorrow's Plan)

### 优先任务

{{#tomorrowPriority}}
1. {{task}} (预估: {{estimate}})
{{/tomorrowPriority}}

### 会议安排

{{#tomorrowMeetings}}
- {{time}}: {{meeting}} ({{duration}})
{{/tomorrowMeetings}}

---

## 📌 快速链接

- [Sprint Backlog](.claude/SPRINT_BACKLOG.md)
- [任务追踪](.claude/TASKS.md)
- [项目约束](.claude/RESTRICTIONS.md)
- [项目配置](../CLAUDE.md)

---

*此文件由 /project-optimizer:dev 和 /project-optimizer:sprint 自动更新*
*最后更新: {{lastUpdate}}*
*下次站会: {{nextStandup}}*
