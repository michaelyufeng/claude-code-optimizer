---
description: Gate 1 - Planning review checkpoint (must pass before architecture)
---

# Gate 1: 规划审核 (Phase 3/9)

## 前置检查

读取 `.claude/PROJECT_STATE.json` 确认：
1. 规划阶段 (`planning`) 已完成
2. 当前阶段为 `gate1`

## 审核说明

```
🚧 Gate 1: 规划审核

这是一个质量检查点。必须通过所有检查项才能进入架构阶段。
如果有检查项不通过，需要返回规划阶段修改。
```

## 审核清单

逐项检查以下内容，并标记通过/不通过：

### 1. PRD 完整性

检查 `docs/PRD.md` 是否包含所有必要部分：

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 产品概述是否清晰 | ⬜ | |
| 用户故事是否完整 | ⬜ | |
| MVP 范围是否明确 | ⬜ | |
| 成功指标是否可衡量 | ⬜ | |
| 风险评估是否全面 | ⬜ | |

### 2. 技术可行性

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 技术方案是否可实现 | ⬜ | |
| 技术难点是否有解决方案 | ⬜ | |
| 团队是否具备所需技能 | ⬜ | |
| 第三方依赖是否可靠 | ⬜ | |

### 3. 范围清晰度

| 检查项 | 状态 | 备注 |
|--------|------|------|
| MVP 边界是否清晰 | ⬜ | |
| 排除功能是否合理 | ⬜ | |
| 用户故事优先级是否合理 | ⬜ | |
| 有没有遗漏关键功能 | ⬜ | |

### 4. 风险识别

| 检查项 | 状态 | 备注 |
|--------|------|------|
| 主要风险是否已识别 | ⬜ | |
| 风险应对策略是否可行 | ⬜ | |
| 依赖项是否已梳理 | ⬜ | |
| 合规风险是否已评估 | ⬜ | |

---

## 审核流程

### Step 1: 自动检查

读取并分析 `docs/PRD.md` 和 `docs/RESEARCH.md`，自动评估上述检查项。

### Step 2: 输出审核报告

```markdown
## Gate 1 审核报告

### 审核时间
[timestamp]

### 审核结果
通过: X/16
待改进: Y
阻塞项: Z

### 详细结果
[每个检查项的状态和备注]

### 建议
[如果有不通过项，给出具体修改建议]
```

### Step 3: 用户确认

如果所有检查项通过：
```
✅ Gate 1 审核通过！

所有检查项均已通过：
✓ PRD 完整性 (5/5)
✓ 技术可行性 (4/4)
✓ 范围清晰度 (4/4)
✓ 风险识别 (4/4)

是否确认进入架构阶段？(y/n)
```

如果有检查项不通过：
```
❌ Gate 1 审核未通过

通过项: X/16
未通过项: Y/16

需要修改的问题：
1. [问题1] - 建议：[修改建议]
2. [问题2] - 建议：[修改建议]

请运行 /project-optimizer:planning 返回规划阶段进行修改。
```

---

## 审核通过

更新 `PROJECT_STATE.json`:
```json
{
  "phases": {
    "gate1": { "status": "completed", "completedAt": "[timestamp]", "result": "passed" },
    "architecture": { "status": "in_progress", "completedAt": null }
  },
  "currentPhase": 4
}
```

保存审核报告到 `docs/GATE1_REVIEW.md`

输出：
```
✅ Gate 1 审核通过！

📄 审核报告已保存至：docs/GATE1_REVIEW.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 研究 → ✓ 规划 → ✓ Gate1 → 🏗️ 架构 → 🎨 原型 → ✅ Gate2 → ⚙️ 后端 → 🔗 集成 → 📦 输出
                               ↑
                             下一步
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

下一步：运行 /project-optimizer:architecture 进入架构阶段
```

---

## 审核未通过

更新 `PROJECT_STATE.json`:
```json
{
  "phases": {
    "gate1": { "status": "failed", "failedAt": "[timestamp]", "failReason": "[原因]" },
    "planning": { "status": "in_progress", "completedAt": null }
  },
  "currentPhase": 2
}
```

```
🔄 返回规划阶段

请根据审核反馈修改 PRD，然后重新运行 /project-optimizer:gate1
```
