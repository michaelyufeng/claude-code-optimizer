# 维护会话日志 (Maintenance Session Log)

> 项目: {{projectName}}
> 创建时间: {{createdAt}}

---

## 🔄 当前会话

### 会话信息

```
会话 ID: {{sessionId}}
开始时间: {{startTime}}
当前时间: {{currentTime}}
持续时间: {{duration}}
当前Agent: {{currentAgent}}
当前模型: {{currentModel}}
```

### 📍 当前位置

```
正在处理: #{{currentIssueId}} - {{currentIssueTitle}}
状态: {{currentStatus}}
进度: {{currentProgress}}%
下一步: {{nextAction}}
```

---

## ✅ 本次会话完成

{{#sessionCompleted}}
### {{timestamp}} - #{{issueId}} {{issueTitle}} ✅

**修复方案**: {{solution}}
**相关Commits**: {{commits}}
**耗时**: {{duration}}
**验证**: {{verification}}

{{/sessionCompleted}}

{{#unless sessionCompleted}}
(本次会话暂无完成项)
{{/unless}}

---

## 🔄 进行中

{{#inProgress}}
### #{{issueId}} {{issueTitle}}

**当前阶段**: {{currentStage}}
**进度**: {{progress}}%
**已完成**:
{{#completed}}
- ✅ {{step}}
{{/completed}}

**进行中**:
- 🔄 {{currentStep}}

**待完成**:
{{#pending}}
- ⬜ {{step}}
{{/pending}}

**下一步行动**: {{nextAction}}

{{/inProgress}}

---

## 📋 待处理队列

| 优先级 | ID | 问题 | 预估工作量 |
|--------|----|----- |-----------|
{{#queue}}
| {{priority}} | #{{id}} | {{title}} | {{effort}} |
{{/queue}}

---

## 🧠 关键决策

{{#decisions}}
### {{timestamp}} - {{title}}

**决策**: {{decision}}
**原因**: {{reason}}
**影响**: {{impact}}
**责任Agent**: {{agent}}

---

{{/decisions}}

---

## 📂 相关文件

### 本次会话修改的文件

{{#modifiedFiles}}
- `{{path}}` ({{status}}) - {{description}}
{{/modifiedFiles}}

### 待修改的文件

{{#toModify}}
- `{{path}}` - {{reason}}
{{/toModify}}

---

## 🔗 上下文恢复指南

如果新会话开始，执行以下步骤快速恢复上下文：

### Step 1: 读取问题追踪
```bash
cat .claude/ISSUES.md
```
→ 了解所有问题的全局情况

### Step 2: 读取会话日志
```bash
cat .claude/SESSION_LOG.md
```
→ 了解上次进度和下一步行动

### Step 3: 读取Git历史
```bash
git log --oneline -10
git status
```
→ 了解最近的变更

### Step 4: 恢复上下文
- 当前问题: #{{currentIssueId}}
- 当前状态: {{currentStatus}}
- 下一步行动: {{nextAction}}

### Step 5: 继续工作
```bash
/project-optimizer:maintenance --resume
```

---

## 📊 会话统计

### 本次会话

```
开始时间: {{sessionStart}}
当前时长: {{sessionDuration}}
处理问题: {{sessionIssuesCount}}个
完成问题: {{sessionCompleted}}个
完成率: {{sessionCompletionRate}}%
```

### 效率分析

| 问题 | 预估 | 实际 | 差异 |
|------|------|------|------|
{{#efficiency}}
| #{{id}} | {{estimated}} | {{actual}} | {{diff}} |
{{/efficiency}}

---

## 🔄 会话历史

{{#sessionHistory}}
### 会话 {{id}} - {{date}}

**时长**: {{duration}}
**完成**: {{completed}}个问题
**处理**: {{issuesList}}

**主要成果**:
{{#achievements}}
- {{achievement}}
{{/achievements}}

---

{{/sessionHistory}}

---

## 💡 经验总结

### 本次会话学到的

{{#lessons}}
- **{{title}}**: {{content}}
{{/lessons}}

### 遇到的障碍

{{#blockers}}
- **{{issue}}**: {{description}} (解决方案: {{solution}})
{{/blockers}}

### 改进建议

{{#improvements}}
- {{suggestion}}
{{/improvements}}

---

## 🚨 需要注意

{{#warnings}}
### {{title}}

{{description}}

**影响**: {{impact}}
**建议**: {{suggestion}}

---

{{/warnings}}

---

## 📝 待办事项

{{#todos}}
- [ ] {{item}} ({{priority}})
{{/todos}}

---

## 🔍 调试信息

### 环境信息
```
工作目录: {{workingDir}}
Git分支: {{gitBranch}}
未提交文件: {{uncommittedFiles}}
最近Commit: {{lastCommit}}
```

### Agent状态
```
当前Agent: {{currentAgent}}
模型: {{currentModel}}
Token使用: {{tokenUsage}}
预估剩余: {{remainingTokens}}
```

---

## 📌 快速链接

- [问题追踪](.claude/ISSUES.md)
- [任务追踪](.claude/TASKS.md)
- [项目状态](.claude/PROJECT_STATE.json)
- [项目配置](../CLAUDE.md)
- [长期记忆](../docs/HISTORY.md)

---

*此文件由 /project-optimizer:maintenance 自动更新*
*最后更新: {{lastUpdate}}*
*下次自动保存: {{nextSave}}*
