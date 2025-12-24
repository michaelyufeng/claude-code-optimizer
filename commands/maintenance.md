---
description: Maintenance mode for existing projects - issue tracking and problem solving
---

# 维护模式 (Maintenance Mode)

专为**旧项目维护**和**问题修复**设计的工作流程。

## 适用场景

```
✅ 适合维护模式:
- 项目开发到一半，需要修复问题
- 项目已完成，需要维护和改进
- 多个问题需要追踪和解决
- 上下文经常中断，需要恢复

❌ 不适合维护模式:
- 全新项目（使用 /start --type new）
- 完整开发流程（使用 /start）
```

---

## 快速启动

### 方式 1: 从现有项目启动

```bash
/project-optimizer:start --type maintenance

# 系统会:
# 1. 扫描项目结构
# 2. 创建 .claude/ISSUES.md
# 3. 检测现有问题
# 4. 进入问题追踪模式
```

### 方式 2: 手动创建问题追踪

```bash
/project-optimizer:maintenance --init

# 创建:
# - .claude/ISSUES.md
# - .claude/SESSION_LOG.md
# - 多级 CLAUDE.md 建议
```

---

## 核心文件结构

```
project/
├── .claude/
│   ├── ISSUES.md          # 🔴 问题追踪（核心）
│   ├── SESSION_LOG.md     # 会话日志
│   ├── TASKS.md           # 任务追踪
│   └── PROJECT_STATE.json # 项目状态
├── CLAUDE.md              # 项目级配置
├── src/
│   ├── api/
│   │   └── CLAUDE.md      # API 模块配置
│   ├── database/
│   │   └── CLAUDE.md      # 数据库模块配置
│   └── trading/           # 您的 AI Trading 项目
│       └── CLAUDE.md      # 交易模块配置
└── docs/
    └── HISTORY.md         # 长期记忆
```

---

## 维护工作流

### Step 1: 问题扫描

```
🔍 扫描项目问题

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

正在扫描项目...

## 检测方法

1. Git 状态分析
   - 查看未提交变更
   - 分析最近 commit 历史
   - 检测回滚记录

2. 错误日志分析
   - 扫描 .log 文件
   - 检测错误堆栈
   - 提取异常信息

3. TODO/FIXME 扫描
   - 搜索代码中的 TODO
   - 搜索 FIXME 标记
   - 搜索 HACK 注释

4. 测试失败分析
   - 运行测试套件
   - 收集失败用例
   - 分析失败原因

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

发现问题:
🔴 严重: 3 个
🟡 重要: 5 个
🟢 一般: 12 个

[1] 📋 查看详细列表
[2] 🔧 立即开始修复
[3] 📊 查看问题分类
```

### Step 2: 问题分类

```
📊 问题分类

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 按影响范围

| 范围 | 问题数 | 严重度 |
|------|--------|--------|
| 启动流程 | 2 | 🔴🔴 |
| 数据库 | 3 | 🔴🟡🟡 |
| API 接口 | 4 | 🟡🟡🟢🟢 |
| 前端界面 | 6 | 🟢🟢🟢🟢🟢🟢 |
| 性能优化 | 5 | 🟡🟢🟢🟢🟢 |

## 按依赖关系

启动流程问题 (阻塞所有)
 ├─ C1: 程序启动失败
 └─ C2: 依赖加载错误

数据库问题 (阻塞数据操作)
 ├─ I1: 连接池耗尽
 └─ I2: 查询性能差

独立问题 (不阻塞)
 ├─ N1-N12: UI/文档/日志等

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

建议修复顺序:
1. 🔴 启动流程问题 (阻塞所有功能)
2. 🔴 数据库严重问题
3. 🟡 性能问题
4. 🟢 改进项

[1] 按建议顺序开始
[2] 自定义修复顺序
[3] 导出问题列表
```

### Step 3: 问题修复循环

```
🔧 修复问题: C1 - 程序启动失败

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 问题详情

ID: C1
描述: 运行 npm start 后进程立即退出
发现: 2025-12-24 10:00
影响: 整个项目无法启动
状态: 🔍 分析中

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 分析步骤

[1/4] 收集错误信息
  ✅ 已收集: Error: Cannot find module 'express'

[2/4] 定位问题文件
  ✅ 文件: src/index.ts:5
  ✅ 代码: import express from 'express';

[3/4] 分析根本原因
  🔍 正在分析...
  - 检查 package.json
  - 检查 node_modules
  - 检查依赖版本

[4/4] 制定修复方案
  ⏳ 待分析完成

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[等待分析完成...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 根本原因

依赖安装不完整:
- express 未在 dependencies 中
- npm install 可能失败

## 修复方案

方案 A (推荐):
1. 添加 express 到 package.json
2. 运行 npm install
3. 验证启动

方案 B:
1. 删除 node_modules
2. 删除 package-lock.json
3. 重新 npm install

[1] ✅ 执行方案 A
[2] 📝 执行方案 B
[3] 🔍 继续分析
```

### Step 4: 修复验证

```
✅ 验证修复: C1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 修复执行

[1] 修改 package.json
    ✅ 添加 "express": "^4.18.0"

[2] 安装依赖
    ✅ npm install
    ✅ express@4.18.0 installed

[3] 验证启动
    ✅ npm start
    ✅ Server running on port 3000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Git 记录

Commit: a1b2c3d
Message: fix(deps): add express dependency to fix startup error

Files:
- package.json
- package-lock.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 更新追踪

.claude/ISSUES.md:
- C1: 🔧 修复中 → ✅ 已修复

.claude/TASKS.md:
- 添加会话日志: "修复 C1 程序启动失败"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

修复完成！

下一个问题: C2 - 依赖加载错误

[1] ▶️ 继续修复 C2
[2] 📊 查看整体进度
[3] 💾 保存并退出
```

---

## 会话恢复机制

### 问题: 上下文结束后怎么办？

**解决方案: SESSION_LOG.md**

```markdown
# 会话日志 (Session Log)

> 最后更新: 2025-12-24 15:30

## 🔄 当前会话状态

会话 ID: session-20251224-1530
开始时间: 2025-12-24 14:00
当前时间: 2025-12-24 15:30
持续时间: 1.5 小时

## 📍 当前位置

正在处理: C2 - 依赖加载错误
进度: 分析完成，准备修复
下一步: 执行修复方案 A

## ✅ 本次会话完成

1. ✅ C1 - 程序启动失败
   - 修复: 添加 express 依赖
   - Commit: a1b2c3d
   - 耗时: 30 分钟

2. 🔍 C2 - 依赖加载错误
   - 分析: 根本原因已定位
   - 方案: 已制定修复方案
   - 进度: 50%

## 📋 待处理队列

1. C2 - 依赖加载错误 (下一个)
2. I1 - 数据库连接池耗尽
3. I2 - 查询性能差
4. N1-N12 - 一般问题

## 🧠 关键决策

- 决定使用方案 A 修复 C1（快速）
- 暂缓性能优化，优先修复阻塞问题

## 📂 相关文件

修改的文件:
- package.json
- src/index.ts (验证修复)

待修改:
- src/config/loader.ts (C2 修复)

## 🔗 快速恢复

如果新会话开始，执行:
1. 查看 .claude/ISSUES.md 了解所有问题
2. 查看 .claude/SESSION_LOG.md 了解上次进度
3. 从 "下一步" 继续工作
```

### 新会话启动流程

```
🔄 会话恢复

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

检测到上一次会话:
- 时间: 2025-12-24 15:30
- 位置: C2 - 依赖加载错误 (50%)

上次完成:
✅ C1 - 程序启动失败

正在恢复上下文...

[1/3] 读取问题追踪
  ✅ .claude/ISSUES.md (4 个问题)

[2/3] 读取会话日志
  ✅ .claude/SESSION_LOG.md

[3/3] 读取项目状态
  ✅ .claude/PROJECT_STATE.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

恢复完成！

您上次在处理: C2 - 依赖加载错误
进度: 已分析，准备执行修复方案 A

[1] ▶️ 继续修复 C2
[2] 📊 查看整体进度
[3] 🔍 重新分析问题
```

---

## 多级 CLAUDE.md 管理

### 为什么需要多级文档？

```
大项目问题:
❌ 单一 CLAUDE.md 太长，超出 Claude 上下文
❌ 切换模块时，无关信息干扰
❌ 团队协作时，文档冲突

多级文档优势:
✅ 每个模块独立文档（200 行以内）
✅ Claude 自动加载相关模块文档
✅ 团队可以并行编辑
```

### 推荐结构

```
project/
├── CLAUDE.md                    # 项目级（全局规则）
│   内容: 项目概述、技术栈、核心约定
│   长度: 100-200 行
│
├── src/
│   ├── api/
│   │   ├── CLAUDE.md            # API 模块
│   │   │   内容: API 设计、路由规则、认证逻辑
│   │   ├── routes/
│   │   └── middleware/
│   │
│   ├── database/
│   │   ├── CLAUDE.md            # 数据库模块
│   │   │   内容: 表结构、查询优化、连接池配置
│   │   ├── models/
│   │   └── migrations/
│   │
│   └── trading/                 # 您的 AI Trading 项目
│       ├── CLAUDE.md            # 交易模块
│       │   内容: 交易策略、风控规则、API 对接
│       ├── strategies/
│       │   └── CLAUDE.md        # 策略子模块
│       ├── risk/
│       │   └── CLAUDE.md        # 风控子模块
│       └── backtesting/
│           └── CLAUDE.md        # 回测子模块
```

### 文档模板

**项目级 CLAUDE.md**:
```markdown
# AI Trading Platform

## 项目概述
AI 量化交易系统

## 技术栈
- 语言: Python 3.11
- 框架: FastAPI
- 数据库: PostgreSQL + Redis
- 消息队列: RabbitMQ

## 核心约定
- 所有金额使用 Decimal
- 所有时间使用 UTC
- API 返回格式统一

## 模块结构
- `src/api/` - API 接口（见 src/api/CLAUDE.md）
- `src/trading/` - 交易核心（见 src/trading/CLAUDE.md）
- `src/database/` - 数据层（见 src/database/CLAUDE.md）
```

**模块级 CLAUDE.md** (src/trading/CLAUDE.md):
```markdown
# Trading Module

## 模块职责
- 交易策略执行
- 风险控制
- 订单管理

## 关键文件
- `strategies/` - 交易策略
- `risk/` - 风控模块
- `orders/` - 订单管理

## 交易流程
1. 策略信号 → 2. 风控检查 → 3. 订单提交 → 4. 状态追踪

## 风控规则
- 单笔最大: 总资产 2%
- 日内最大回撤: 5%
- 禁止: 周末交易

## 依赖的其他模块
- `src/api/` - 获取行情数据
- `src/database/` - 持久化订单
```

---

## Git 集成记忆系统

### 双重记忆 + Git

```
┌─────────────────────────────────────────────────┐
│            双重记忆系统 + Git                    │
├─────────────────────────────────────────────────┤
│                                                 │
│  短期记忆 (.claude/TASKS.md)                    │
│    ↓                                            │
│  每次修复后自动 Git Commit                       │
│    ↓                                            │
│  Commit 信息包含问题 ID                          │
│    ↓                                            │
│  7 天后自动 reflect → docs/HISTORY.md           │
│    ↓                                            │
│  长期记忆 (docs/HISTORY.md)                      │
│    ↓                                            │
│  Git 历史 (完整追溯)                             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 自动 Commit 规范

每次修复问题后:
```bash
git add [修改的文件]
git commit -m "fix(#C1): resolve startup failure by adding express dependency

- Problem: Program fails to start with 'Cannot find module' error
- Root Cause: Missing express in package.json
- Solution: Add express@^4.18.0 to dependencies
- Verification: ✅ Server starts successfully

Issue: C1
Session: session-20251224-1530
Time: 30min

🤖 Generated with Claude Code Optimizer
"
```

---

## 命令参考

```bash
# 启动维护模式
/project-optimizer:maintenance

# 初始化问题追踪
/project-optimizer:maintenance --init

# 扫描项目问题
/project-optimizer:maintenance --scan

# 查看问题列表
/project-optimizer:maintenance --issues

# 继续上次会话
/project-optimizer:maintenance --resume

# 查看修复进度
/project-optimizer:maintenance --progress

# 导出问题报告
/project-optimizer:maintenance --report
```

---

## 最佳实践

### 1. 每次开始前

```bash
# 查看问题追踪
cat .claude/ISSUES.md

# 查看会话日志
cat .claude/SESSION_LOG.md

# 查看 Git 状态
git status && git log --oneline -5
```

### 2. 修复过程中

- 每修复一个问题，立即更新 ISSUES.md
- 每次 commit，包含问题 ID
- 每个阶段，更新 SESSION_LOG.md

### 3. 上下文中断时

- 保存当前进度到 SESSION_LOG.md
- 标记当前问题状态
- 记录下一步行动

### 4. 新会话开始时

- 读取 ISSUES.md 了解全局
- 读取 SESSION_LOG.md 恢复上下文
- 从 "下一步" 继续

---

## 针对您的 AI Trading 项目

### 推荐文件结构

```
aitrading/
├── CLAUDE.md                      # 项目概述
├── .claude/
│   ├── ISSUES.md                  # 🔴 所有问题追踪
│   ├── SESSION_LOG.md             # 会话恢复
│   ├── TASKS.md                   # 任务追踪
│   └── PROJECT_STATE.json
├── src/
│   ├── api/
│   │   └── CLAUDE.md              # API 层说明
│   ├── trading/
│   │   ├── CLAUDE.md              # 交易核心说明
│   │   ├── strategies/
│   │   │   └── CLAUDE.md          # 策略说明
│   │   └── risk/
│   │       └── CLAUDE.md          # 风控说明
│   └── database/
│       └── CLAUDE.md              # 数据层说明
└── docs/
    ├── HISTORY.md                 # 长期记忆
    └── PROBLEMS_SOLVED.md         # 已解决问题归档
```

### 启动流程

```bash
# 1. 初始化维护模式
/project-optimizer:maintenance --init

# 2. 扫描现有问题
/project-optimizer:maintenance --scan

# 3. 开始修复
/project-optimizer:maintenance

# 4. （上下文中断后）恢复会话
/project-optimizer:maintenance --resume
```

---

## 与 GitHub Copilot 对比

| 功能 | GitHub Copilot | Claude Code Optimizer |
|------|----------------|----------------------|
| 问题追踪 | Agent HQ + Mission Control | ISSUES.md |
| 会话恢复 | Session Log | SESSION_LOG.md |
| 多级文档 | ❌ 不支持 | ✅ 分层 CLAUDE.md |
| Git 集成 | ✅ 自动 commit | ✅ 规范化 commit |
| 成本 | 付费 $19-39/月 | 免费（基于 Claude Code） |

---

## 相关命令

- `/start --type maintenance` - 从 start 命令启动维护模式
- `/status` - 查看项目状态
- `/issues` - 专门的问题管理（待实现）
- `/session-recovery` - 会话恢复（待实现）

---

*适用于: AI Trading、大型项目、问题修复、长期维护*
