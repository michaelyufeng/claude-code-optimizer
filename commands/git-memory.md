---
description: Git-based memory system for context preservation and recovery
---

# Git 记忆系统 (Git Memory)

基于Git版本控制的记忆管理系统，实现上下文持久化和快速恢复。

**灵感来源**:
- [Git Context Controller](https://arxiv.org/html/2508.00031v1)
- [DiffMem](https://github.com/Growth-Kinetics/DiffMem)

---

## 核心概念

```
Git Commits = 记忆节点
Git History = 项目记忆
Git Diff = 变更感知
Git Branch = 并行探索
```

### 传统方式 vs Git记忆

| 方式 | 上下文恢复 | Token消耗 | 耗时 |
|------|-----------|----------|------|
| 传统 | 重新分析整个项目 | 50K-100K | 30-60秒 |
| **Git记忆** | 读取commits+上下文 | 5K-10K | <5秒 |
| **节省** | - | **80-90%** | **90%+** |

---

## 自动驾驶行为

Git记忆系统**自动集成**到所有阶段：

- 任务完成时 → 自动Memory Commit
- Gate通过时 → 自动Memory Commit
- 阶段完成时 → 自动Memory Commit
- `/start --resume` → 自动Context Recovery

---

## Memory Commit (记忆提交)

### Commit格式

```bash
[阶段][Agent] 任务描述

详细信息
- 做了什么
- 为什么这样做
- 遇到了什么问题

🧠 Memory Snapshot:
- 当前进度: 60%
- 下一任务: F3 核心功能
- 发现问题: #1 缺少输入验证
- 技术决策: 使用JWT认证
```

### 示例Commit

```
Commit: abc123
Author: Claude Sonnet 4.5
Date: 2025-12-24 15:30

[开发][开发者] 完成用户注册功能 (F1)

实现用户注册API端点:
- POST /api/v1/users/register
- 邮箱+密码注册
- 密码使用bcrypt哈希
- 生成JWT token
- 单元测试覆盖率: 85%

文件变更:
- src/api/users.ts (新增)
- src/auth/hash.ts (新增)
- src/models/user.ts (修改)
- tests/api/users.test.ts (新增)

🧠 Memory Snapshot:
- 当前进度: 40%
- 阶段: 开发 (4/6)
- 下一任务: F2 用户登录
- 发现问题: #1 缺少输入验证 (email格式)
- 技术决策: 使用JWT而非session (原因: 无状态、易扩展)
```

---

## Context Recovery (上下文恢复)

### 自动恢复流程

```
用户运行: /start --resume

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Git Memory Recovery
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: 读取Git Commits
→ 最近10个commits
→ 提取Memory Snapshots
→ 重建时间线

Step 2: 检测未提交变更
→ git diff --name-status
→ 发现3个未提交文件

Step 3: 加载分层文档
→ CLAUDE.md (全局)
→ src/CLAUDE.md (当前模块)
→ .claude/CONTEXT.md (活跃上下文)

Step 4: 状态重建
→ 当前阶段: 开发 (4/6)
→ 进度: 40%
→ 活跃任务: F2 用户登录
→ 已完成: F1 用户注册
→ 问题: #1 待修复

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ 上下文恢复完成！

欢迎回来！

📊 状态总结:
- 上次工作: 完成F1用户注册 (12-24 15:30)
- 当前任务: F2 用户登录
- 发现问题: #1 需要添加邮箱格式验证
- 未提交变更: 3个文件

🎯 建议操作:
[1] ▶️ 继续F2 (用户登录)
[2] 🔧 先修复#1 (输入验证)
[3] 📋 查看详细状态
[4] 🔄 从其他任务开始

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 恢复性能

```
恢复内容:
✓ 读取10个commits (~2K tokens)
✓ 读取3个CLAUDE.md (~3K tokens)
✓ 读取CONTEXT.md (~2K tokens)
✓ Git diff (~1K tokens)

总Token: ~8K
总耗时: <5秒

vs 传统方式:
- Token: 50K-100K
- 耗时: 30-60秒

节省: 80-90% Token, 90%+ 时间
```

---

## Branch Exploration (分支探索)

### 并行尝试不同方案

```
场景: 不确定用JWT还是Session认证

主分支继续开发:
main
 │
 ├─ [开发] F1完成
 └─ [开发] F2开始...

创建实验分支:
main ──┬─> experiment/jwt-auth
       │    ├─ 实现JWT
       │    ├─ 测试
       │    └─ 评估
       │
       └─> experiment/session-auth
            ├─ 实现Session
            ├─ 测试
            └─ 评估

比较结果后:
→ JWT更适合 → git merge experiment/jwt-auth
→ 删除另一个 → git branch -D experiment/session-auth
```

### 创建实验分支

```
💻 [开发者] 决策点: 认证方案

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

有两种方案可选:

[1] 🔑 JWT认证
    优点: 无状态、易扩展、支持跨域
    缺点: 无法主动注销、Token较大

[2] 🍪 Session认证
    优点: 可主动注销、安全性高
    缺点: 需要状态存储、扩展性差

[3] 🔬 两个都试试 (创建实验分支)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

用户选择: [3]

→ 创建 experiment/jwt-auth
→ 创建 experiment/session-auth
→ 分别实现和测试
→ 提供对比报告
```

---

## 手动命令

### `/git-memory:commit` - 手动创建记忆节点

```bash
/project-optimizer:git-memory --commit "完成F1功能"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧠 创建Memory Commit

当前状态:
- 阶段: 开发
- Agent: 开发者
- 进度: 40%

请填写Memory Snapshot:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[自动填充]
- 下一任务: F2 用户登录
- 发现问题: #1 输入验证
- 技术决策: JWT认证

确认提交?
[1] ✅ 确认
[2] 📝 编辑
[3] ❌ 取消

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

选择: [1]

✅ Memory Commit创建成功！
Commit: abc123
```

### `/git-memory:recover` - 恢复上下文

```bash
/project-optimizer:git-memory --recover

→ 执行完整的Context Recovery流程
→ 显示恢复的状态
→ 提供继续选项
```

### `/git-memory:timeline` - 查看记忆时间线

```bash
/project-optimizer:git-memory --timeline

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📜 Memory Timeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2025-12-24
  15:30 │ [开发][开发者] 完成F1用户注册
        │ → 进度: 40% → 下一步: F2
        └─ Commit: abc123

  14:00 │ [架构][架构师] 完成API设计
        │ → 进度: 30% → 下一步: 开发阶段
        └─ Commit: def456

2025-12-23
  16:00 │ [规划][PM] PRD完成
        │ → 进度: 20% → 下一步: 架构设计
        └─ Commit: ghi789

  14:30 │ [研究][分析师] 需求分析完成
        │ → 进度: 10% → 下一步: PRD编写
        └─ Commit: jkl012

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] 📖 查看详细Commit
[2] 🔙 恢复到某个时间点
[3] 🔍 搜索Commit
```

### `/git-memory:branch` - 创建实验分支

```bash
/project-optimizer:git-memory --branch "尝试Redis缓存"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌿 创建实验分支

分支名: experiment/redis-cache
描述: 尝试Redis缓存

当前位置: main @ abc123

创建后:
→ 切换到新分支
→ 在新分支上开发
→ 完成后对比结果

[1] ✅ 创建并切换
[2] 📝 修改描述
[3] ❌ 取消

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### `/git-memory:diff` - 查看记忆变更

```bash
/project-optimizer:git-memory --diff abc123..def456

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Memory Diff
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

From: abc123 (F1完成)
To:   def456 (F2完成)

状态变化:
- 进度: 40% → 60% (+20%)
- 任务: F1 → F2
- 问题: #1 → #1(已修复), #2(新增)

代码变化:
- 新增文件: 3
- 修改文件: 5
- 删除文件: 1

Memory Snapshot变化:
- 下一任务: F2 → F3
- 技术决策: +1 (使用Redis缓存)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 配置文件

### `.claude/GIT_MEMORY.json`

```json
{
  "memoryCommits": {
    "autoCommit": true,
    "triggers": ["task_complete", "gate_pass", "phase_complete"]
  },
  "contextRecovery": {
    "commitDepth": 10,
    "autoRecover": true,
    "tokenBudget": 10000
  },
  "branchStrategy": {
    "experimentBranches": true,
    "autoCleanup": true
  }
}
```

---

## 与现有系统集成

### 集成点

```
开发流程 → Git Memory

任务完成 → Memory Commit
  ├─ 自动提取状态
  ├─ 生成Memory Snapshot
  ├─ 创建Git commit
  └─ 更新CONTEXT.md

Gate通过 → Memory Commit
  ├─ 记录Gate检查结果
  ├─ 更新阶段状态
  └─ 创建里程碑Commit

/start --resume → Context Recovery
  ├─ 读取Git commits
  ├─ 提取Memory Snapshots
  ├─ 加载分层文档
  ├─ 检测未提交变更
  └─ 重建完整上下文
```

---

## 最佳实践

### 1. Commit频率

```
推荐频率:
✅ 每完成一个任务
✅ 每通过一个Gate
✅ 每个重大决策
✅ 每天结束前

❌ 避免:
❌ 太频繁 (每5分钟)
❌ 太少 (一周一次)
```

### 2. Commit Message质量

```
✅ 好的Commit:
[开发][开发者] 完成用户注册 (F1)

- 实现POST /api/users/register
- 密码使用bcrypt哈希
- 单元测试85%覆盖

🧠 Memory Snapshot:
- 进度: 40%
- 下一步: F2 用户登录
- 问题: #1 输入验证

❌ 差的Commit:
update code
```

### 3. 实验分支使用

```
何时创建实验分支:
✅ 不确定哪个方案更好
✅ 想尝试新技术
✅ 重大重构前

何时避免:
❌ 简单修改
❌ 明确知道怎么做
```

---

## 性能指标

### 对比数据

| 指标 | 传统方式 | Git Memory | 节省 |
|------|---------|-----------|------|
| 上下文恢复Token | 50K-100K | 5K-10K | **80-90%** |
| 恢复耗时 | 30-60秒 | <5秒 | **90%+** |
| 记忆节点数 | 0 | 50+ | - |
| 可追溯性 | 低 | 高 | - |

---

## 相关命令

- `/start --resume` - 自动使用Git Memory恢复
- `/status` - 显示当前Memory状态
- `/sync` - 同步Git记忆
- `/hierarchy` - 配合分层文档使用

---

*基于: Git Context Controller (GCC) & DiffMem*
*参考: https://arxiv.org/html/2508.00031v1*
