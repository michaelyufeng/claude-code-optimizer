---
description: Save current context and state to checkpoint for session recovery
---

# 保存检查点 (Memory System)

## 功能说明

将当前会话的上下文、状态、进度保存到检查点，以便在新会话中恢复。

## 检查点结构

### 目录结构

```
.claude/PROJECT_MEMORY/
├── state.json              # 当前状态
├── checkpoints/            # 检查点历史
│   ├── cp_20241215_143022.json
│   ├── cp_20241215_160045.json
│   └── ...
├── decisions/              # 关键决策记录
│   └── decisions.json
├── context/                # 上下文片段
│   ├── research_summary.md
│   ├── architecture_notes.md
│   └── ...
└── sessions/               # 会话历史
    └── sessions.json
```

## 保存流程

### 1. 收集当前状态

```markdown
## 状态收集

### 项目状态
- 项目类型: [new/developing/production]
- 当前阶段: [phase name]
- 阶段进度: [X%]

### 任务状态
- 当前任务: [task description]
- 待完成: [pending tasks]
- 阻塞项: [blockers]

### 上下文摘要
- 最近修改的文件: [file list]
- 关键决策: [decisions made]
- 待确认问题: [open questions]
```

### 2. 生成检查点文件

创建 `.claude/PROJECT_MEMORY/checkpoints/cp_[timestamp].json`:

```json
{
  "checkpointId": "cp_20241215_143022",
  "createdAt": "[timestamp]",
  "version": "1.0",

  "projectState": {
    "type": "new",
    "currentPhase": "architecture",
    "currentSubPhase": "api_design",
    "phaseProgress": 65,
    "phases": {
      "research": { "status": "completed", "completedAt": "..." },
      "planning": { "status": "completed", "completedAt": "..." },
      "gate1": { "status": "completed", "completedAt": "..." },
      "architecture": { "status": "in_progress", "startedAt": "..." }
    }
  },

  "taskState": {
    "currentTask": {
      "id": "task_001",
      "description": "设计用户认证 API",
      "status": "in_progress",
      "progress": 40
    },
    "pendingTasks": [
      { "id": "task_002", "description": "设计数据模型" },
      { "id": "task_003", "description": "编写 API 文档" }
    ],
    "completedTasks": [
      { "id": "task_000", "description": "完成技术栈选型" }
    ]
  },

  "contextSummary": {
    "recentFiles": [
      "docs/API.md",
      "src/routes/auth.ts"
    ],
    "keyDecisions": [
      {
        "id": "dec_001",
        "decision": "使用 JWT 进行认证",
        "reason": "支持无状态验证，适合微服务架构",
        "madeAt": "..."
      }
    ],
    "openQuestions": [
      "是否需要支持 OAuth2.0？",
      "Token 过期时间设置多长？"
    ],
    "blockers": [],
    "notes": "用户倾向于简单的认证方式，避免过度设计"
  },

  "conversationContext": {
    "summaryTokens": 2000,
    "keyTopics": ["API设计", "认证方案", "数据库选型"],
    "userPreferences": {
      "codeStyle": "TypeScript + 函数式",
      "frameworkChoice": "Hono + Drizzle",
      "detailLevel": "详细解释"
    }
  },

  "filesModified": [
    {
      "path": "docs/API.md",
      "lastModified": "...",
      "changes": "添加了认证 API 端点定义"
    }
  ]
}
```

### 3. 更新状态文件

更新 `.claude/PROJECT_MEMORY/state.json`:

```json
{
  "lastCheckpoint": "cp_20241215_143022",
  "lastSavedAt": "[timestamp]",
  "autoSaveEnabled": true,
  "checkpointCount": 5
}
```

### 4. 记录会话

追加到 `.claude/PROJECT_MEMORY/sessions/sessions.json`:

```json
{
  "sessions": [
    {
      "sessionId": "sess_001",
      "startedAt": "...",
      "endedAt": "...",
      "checkpointId": "cp_20241215_143022",
      "summary": "完成了 API 设计的第一部分，确定了认证方案",
      "phasesWorked": ["architecture"],
      "filesModified": ["docs/API.md"]
    }
  ]
}
```

---

## 自动保存触发

### 触发条件

```markdown
自动保存在以下情况触发：

1. **阶段完成时**
   - 完成任一阶段自动保存

2. **Gate 通过时**
   - Gate1 或 Gate2 审核通过时

3. **关键决策时**
   - 做出重要技术决策后

4. **长时间工作后**
   - 连续工作超过 30 分钟

5. **大量修改后**
   - 修改文件数超过 5 个

6. **用户手动触发**
   - 运行 /project-optimizer:save
```

---

## 输出格式

### 保存成功

```
💾 检查点已保存！

📋 检查点信息：
- ID: cp_20241215_143022
- 时间: 2024-12-15 14:30:22

📊 保存的状态：
- 项目阶段: 架构阶段 (4/9)
- 阶段进度: 65%
- 当前任务: 设计用户认证 API

📁 保存的上下文：
- 修改文件: 2 个
- 关键决策: 1 个
- 待确认问题: 2 个

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 下次对话可使用 /project-optimizer:restore 恢复

💡 提示：关键决策会自动记录，可用 /project-optimizer:history 查看
```

### 保存选项

```markdown
## 保存选项

使用参数自定义保存：

/project-optimizer:save --note "完成了认证设计"
/project-optimizer:save --full   # 完整保存（包含更多上下文）
/project-optimizer:save --quick  # 快速保存（仅状态）
```

---

## 上下文压缩策略

### Token 优化

```markdown
## 上下文压缩

当上下文过大时，自动压缩：

1. **摘要化**
   - 将详细讨论压缩为摘要
   - 保留关键决策和结论

2. **分层存储**
   - 核心信息：保留在 checkpoint
   - 详细信息：存储到 context/ 目录
   - 历史信息：归档到 sessions/

3. **智能裁剪**
   - 移除重复信息
   - 合并相似决策
   - 精简文件变更记录
```

### 压缩后的检查点

```json
{
  "checkpointId": "cp_20241215_143022",
  "compressed": true,
  "compressionRatio": 0.3,
  "originalTokens": 15000,
  "compressedTokens": 4500,

  "projectState": { "..." },
  "taskState": { "..." },

  "contextSummary": {
    "summary": "完成了研究和规划阶段，通过 Gate1 审核。当前在架构阶段，正在设计认证 API。已决定使用 JWT + Hono 框架。",
    "detailsRef": "context/architecture_details.md"
  }
}
```
