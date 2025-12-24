# 活跃上下文快照 (Active Context Snapshot)

> 自动生成时间: {{timestamp}}
> 项目: {{projectName}}

## 🎯 当前状态

```
阶段: {{currentPhase}} ({{phaseNumber}}/6)
进度: {{progressBar}} {{progress}}%
Agent: {{currentAgent}}
模型: {{currentModel}}
```

---

## 📋 活跃任务

### 进行中

| ID | 任务 | Agent | 模型 | 开始时间 |
|----|------|-------|------|----------|
{{#activeTasks}}
| {{id}} | {{name}} | {{agent}} | {{model}} | {{startTime}} |
{{/activeTasks}}

### 待处理

{{#pendingTasks}}
- {{id}}: {{name}} (依赖: {{dependencies}})
{{/pendingTasks}}

---

## ✅ 最近完成 (最近3个)

| ID | 任务 | 完成时间 | 耗时 | Commit |
|----|------|----------|------|--------|
{{#recentCompleted}}
| {{id}} | {{name}} | {{completedAt}} | {{duration}} | `{{commit}}` |
{{/recentCompleted}}

---

## 🐛 发现的问题

{{#issues}}
### #{{id}} {{title}}
- **状态**: {{status}}
- **优先级**: {{priority}}
- **发现时间**: {{discoveredAt}}
- **负责**: {{assignedTo}}
{{/issues}}

---

## 🎯 下一步计划

{{#nextSteps}}
1. {{step}}
{{/nextSteps}}

---

## 📊 阶段进展

```
[{{phase1Status}}] 研究 → [{{phase2Status}}] 规划 → [{{phase3Status}}] 架构
  → [{{phase4Status}}] 开发 → [{{phase5Status}}] 测试 → [{{phase6Status}}] 部署
                              ↑
                          当前位置
```

---

## 🔍 最近变更 (Git)

```bash
# 最近3个commits
{{#recentCommits}}
{{sha}} - {{message}} ({{author}}, {{date}})
{{/recentCommits}}

# 未提交变更
{{#uncommittedChanges}}
{{status}} {{file}}
{{/uncommittedChanges}}
```

---

## 🧠 关键决策

{{#keyDecisions}}
- **{{date}}**: {{decision}} (原因: {{reason}})
{{/keyDecisions}}

---

## 📝 会话恢复指南

当Claude恢复时，应该:
1. 读取此文件了解当前状态
2. 读取CLAUDE.md了解项目规则
3. 读取当前模块的CLAUDE.md (如有)
4. 检查最近10个Git commits
5. 询问用户是否继续{{currentTask}}

---

*此文件由 /project-optimizer 自动更新*
*最后更新: {{lastUpdate}}*
