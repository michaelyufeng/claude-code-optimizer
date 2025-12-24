---
description: Continue development for existing projects
---

# 继续开发 (开发中项目 - Phase 4/5)

## 前置检查

确认 Gate 1 已通过。

## 开发模式

### 🛡️ 保护机制

开发时自动检查保护规则：

```markdown
## 保护检查

每次修改前，检查 `.claude/PROTECTED.json`：

### 禁止修改的文件
如果尝试修改保护文件：
```
⛔ 保护警告

文件 [path] 被标记为保护文件。
原因: [保护原因]

如需修改，请先：
1. 确认修改必要性
2. 运行 /project-optimizer:unprotect [path]
3. 获得用户确认
```

### 禁止删除的代码
如果检测到删除保护代码：
```
⛔ 保护警告

检测到尝试删除受保护的代码：
- [code snippet]

这段代码被 [X] 个地方依赖，删除可能导致问题。
```
```

### 📋 开发清单

按照 `docs/DEV_PLAN.md` 中的计划执行：

```markdown
## 当前 Sprint

Sprint: [名称]
目标: [目标]

### 功能开发
- [ ] F1 - [描述]
  - 涉及文件: [files]
  - 状态: 进行中
- [ ] F2 - [描述]
  - 涉及文件: [files]
  - 状态: 未开始

### 问题修复
- [ ] Bug1 - [描述]
- [ ] Bug2 - [描述]

### 进度
完成度: X%
```

### 🔄 开发工作流

```markdown
## 推荐工作流

### 1. 开始任务
```bash
/project-optimizer:start-task F1
```
- 加载相关文件到上下文
- 显示任务详情
- 设置当前任务状态

### 2. 开发中
- 遵循 CLAUDE.md 中的代码规范
- 保持小步提交
- 及时运行测试

### 3. 完成任务
```bash
/project-optimizer:complete-task F1
```
- 运行 lint 检查
- 运行相关测试
- 更新任务状态
- 提交代码

### 4. 查看进度
```bash
/project-optimizer:sprint-status
```
```

### 🧪 质量检查

每个任务完成后自动执行：

```markdown
## 质量检查清单

### 代码规范
- [ ] ESLint 通过
- [ ] TypeScript 无错误
- [ ] 格式化正确

### 测试
- [ ] 相关单元测试通过
- [ ] 无新增测试失败

### 集成
- [ ] 不破坏现有功能
- [ ] API 兼容性保持

### 文档
- [ ] 必要的注释已添加
- [ ] API 文档已更新（如需要）
```

---

## Sprint 完成

当 Sprint 中所有任务完成：

```markdown
## Sprint 完成报告

### 完成的功能
- [x] F1 - [描述]
- [x] F2 - [描述]

### 修复的问题
- [x] Bug1

### 质量指标
- 代码覆盖率: X%
- Lint 警告: X 个
- TypeScript 错误: 0

### 下一步
进入下一个 Sprint 或输出阶段
```

---

## 输出

更新 `PROJECT_STATE.json`:
```json
{
  "phases": {
    "continue-dev": { "status": "completed", "completedAt": "[timestamp]" },
    "output": { "status": "in_progress" }
  },
  "development": {
    "completedFeatures": [],
    "completedBugfixes": [],
    "currentSprint": null
  }
}
```

输出：
```
✅ 开发阶段完成！

📊 开发摘要：
- 完成功能: X 个
- 修复问题: X 个
- 新增代码: X 行
- 测试覆盖: X%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 开发中项目流程:
✓ 分析 → ✓ 更新计划 → ✓ Gate → ✓ 继续开发 → 📦 输出
                                             ↑
                                           最后一步
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

下一步：运行 /project-optimizer:output 生成产出物
```
