---
description: Split large tasks into smaller context-aware subtasks for parallel execution
---

# 任务分割器 (Task Splitter)

## 功能说明

将大型任务智能分割成多个小任务，支持：
- 上下文大小感知
- 并行执行分配
- 依赖关系管理
- Agent 分配

## 使用方法

```
/project-optimizer:split-task [任务描述]
```

## 分割流程

### Step 1: 分析任务

```markdown
## 任务分析

原始任务: $ARGUMENTS

### 任务类型识别
- [ ] 功能开发
- [ ] Bug 修复
- [ ] 重构
- [ ] 文档
- [ ] 测试

### 复杂度评估
- 预估涉及文件数: ___
- 预估代码行数: ___
- 依赖模块数: ___
- 复杂度等级: 低/中/高/极高
```

### Step 2: 上下文大小估算

根据任务复杂度分配上下文：

| 任务规模 | Token 预算 | 适用场景 |
|----------|------------|----------|
| 🟢 小型 (S) | 8K | 单文件修改、简单函数 |
| 🟡 中型 (M) | 32K | 多文件修改、模块开发 |
| 🔴 大型 (L) | 100K | 跨模块、复杂逻辑 |
| ⚫ 超大 (XL) | 200K | 全局重构、架构变更 |

### Step 3: 任务分割

将任务分割成独立的子任务：

```markdown
## 子任务列表

### 任务组 A (可并行)
| ID | 任务名称 | 规模 | Agent | 依赖 | 状态 |
|----|----------|------|-------|------|------|
| T1 | [描述] | S | Developer | 无 | ⬜ |
| T2 | [描述] | M | Developer | 无 | ⬜ |

### 任务组 B (依赖组A)
| ID | 任务名称 | 规模 | Agent | 依赖 | 状态 |
|----|----------|------|-------|------|------|
| T3 | [描述] | M | Developer | T1,T2 | 🔒 |

### 任务组 C (依赖组B)
| ID | 任务名称 | 规模 | Agent | 依赖 | 状态 |
|----|----------|------|-------|------|------|
| T4 | [描述] | S | Reviewer | T3 | 🔒 |
```

### Step 4: 执行计划

```markdown
## 执行计划

### 阶段 1: 并行执行
同时执行: T1, T2
预计 Token: 8K + 32K = 40K
预计时间: ~15分钟

### 阶段 2: 顺序执行
等待 T1, T2 完成后执行: T3
预计 Token: 32K
预计时间: ~10分钟

### 阶段 3: 审核
执行: T4
预计 Token: 8K
预计时间: ~5分钟

### 总计
- 子任务数: 4
- 总 Token: ~80K
- 预计总时间: ~30分钟
- 可节省时间: ~40% (通过并行)
```

---

## 子任务模板

每个子任务应包含：

```markdown
## 子任务: [ID] - [名称]

### 目标
[清晰的单一目标]

### 范围
- 文件: [涉及的文件列表]
- 函数/类: [涉及的函数或类]

### 输入
- [前置条件或依赖输出]

### 输出
- [预期产出]

### 验收标准
- [ ] [标准1]
- [ ] [标准2]

### 上下文提示
需要加载的文件:
- `path/to/file1.ts` - [原因]
- `path/to/file2.ts` - [原因]

### 约束
- Token 预算: [S/M/L/XL]
- 时间预算: [X分钟]
```

---

## 输出

创建 `.claude/TASKS.json`:

```json
{
  "originalTask": "[原始任务描述]",
  "createdAt": "[timestamp]",
  "totalSubtasks": 4,
  "groups": [
    {
      "id": "A",
      "parallel": true,
      "tasks": [
        {
          "id": "T1",
          "name": "[任务名]",
          "size": "S",
          "agent": "Developer",
          "dependencies": [],
          "status": "pending",
          "files": ["path/to/file.ts"]
        }
      ]
    }
  ],
  "executionPlan": {
    "phases": [
      { "phase": 1, "tasks": ["T1", "T2"], "parallel": true },
      { "phase": 2, "tasks": ["T3"], "parallel": false },
      { "phase": 3, "tasks": ["T4"], "parallel": false }
    ],
    "estimatedTokens": 80000,
    "estimatedTime": "30min"
  }
}
```

同时创建 `docs/TASK_BREAKDOWN.md` 供人阅读。

---

## 执行子任务

分割完成后，使用以下命令执行：

```bash
/project-optimizer:run-task T1    # 执行单个任务
/project-optimizer:run-group A    # 执行任务组（并行）
/project-optimizer:task-status    # 查看任务状态
```
