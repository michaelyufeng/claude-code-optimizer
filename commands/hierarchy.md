---
description: Hierarchical documentation system for managing large codebases
---

# 分层文档系统 (Hierarchy)

为大型项目设计的多层级CLAUDE.md文档系统，解决单一文档过长、上下文丢失的问题。

**灵感来源**:
- [DocAgent](https://arxiv.org/html/2504.08725v1) - 多Agent文档系统
- [Augment](https://theaieconomy.substack.com/p/meet-the-ai-agent-built-for-massive) - 大型codebase支持

---

## 核心问题

### 单一CLAUDE.md的问题

```
大项目挑战:
❌ 单一CLAUDE.md太长 (1000+ 行)
❌ 超出Claude上下文窗口
❌ 模块信息混杂，难以聚焦
❌ 团队协作时文档冲突
❌ 切换模块时加载无关信息

后果:
→ Claude需要重新分析整个项目 (50K-100K tokens)
→ 上下文经常丢失
→ 耗时30-60秒
```

### 分层文档的优势

```
多层级CLAUDE.md:
✅ 每个模块独立文档 (200行以内)
✅ 自动加载相关模块
✅ Token使用优化 (5K-10K)
✅ 团队可并行编辑
✅ 上下文恢复快速 (<5秒)

对比:
传统: 读取1个大文件 (50K tokens, 30秒)
分层: 读取3-5个小文件 (8K tokens, <5秒)
节省: 80-90% Token, 90%+ 时间
```

---

## 文档层级设计

### 三层架构

```
Layer 1: 全局 (Global)
┌────────────────────────────────────────┐
│ CLAUDE.md                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ - 项目概述                              │
│ - 技术栈                                │
│ - 全局约定                              │
│ - 架构原则                              │
│ - 模块索引                              │
│ Token: ~2000                           │
└────────────────────────────────────────┘
              │
    ┌─────────┴──────────┐
    ▼                    ▼
Layer 2: 模块 (Module)
┌─────────────┐      ┌─────────────┐
│src/CLAUDE.md│      │tests/       │
│             │      │CLAUDE.md    │
│- 代码组织    │      │- 测试策略    │
│- 导入规则    │      │- 覆盖率要求  │
│- 命名规范    │      │- Mock规范   │
│Token: ~1500 │      │Token: ~800  │
└──────┬──────┘      └─────────────┘
       │
   ┌───┴────┬─────────┐
   ▼        ▼         ▼
Layer 3: 子模块 (Submodule)
┌────────┐ ┌────────┐ ┌────────┐
│api/    │ │db/     │ │auth/   │
│CLAUDE  │ │CLAUDE  │ │CLAUDE  │
│        │ │        │ │        │
│- API   │ │- 数据模型│ │- JWT   │
│- 路由   │ │- 查询优化│ │- 中间件 │
│~1000   │ │~1000   │ │~1000   │
└────────┘ └────────┘ └────────┘
```

### 推荐目录结构

```
project/
├── CLAUDE.md                    # 🌍 Level 1: Global
│   内容: 项目概述、技术栈、全局约定
│   读者: 所有开发者、Claude
│   Token: ~2000
│
├── .claude/
│   ├── HIERARCHY.json           # 📂 文档层级配置
│   ├── CONTEXT.md               # 📸 活跃上下文
│   └── ...
│
├── src/
│   ├── CLAUDE.md                # 📦 Level 2: Source Module
│   │   内容: 代码组织、导入规则、命名规范
│   │   Token: ~1500
│   │
│   ├── api/
│   │   ├── CLAUDE.md            # 🌐 Level 3: API Submodule
│   │   │   内容: API设计、路由、认证
│   │   │   Token: ~1000
│   │   ├── routes/
│   │   └── middleware/
│   │
│   ├── database/
│   │   ├── CLAUDE.md            # 🗄️ Level 3: DB Submodule
│   │   │   内容: 模型、查询、迁移
│   │   │   Token: ~1000
│   │   ├── models/
│   │   └── migrations/
│   │
│   └── auth/
│       ├── CLAUDE.md            # 🔒 Level 3: Auth Submodule
│       │   内容: JWT、Session、中间件
│       │   Token: ~1000
│       ├── jwt.ts
│       └── middleware.ts
│
├── tests/
│   └── CLAUDE.md                # 🧪 Level 2: Test Module
│       内容: 测试策略、覆盖率、Mock
│       Token: ~800
│
└── docs/
    └── HISTORY.md               # 长期记忆
```

---

## 智能上下文加载

### 加载策略

```
Claude工作在 src/api/ 目录时:

自动加载顺序:
┌──────────────────────────────────────────┐
│ 1. .claude/CONTEXT.md                    │
│    活跃上下文快照                         │
│    → 快速了解当前状态                     │
│    Token: ~2000                          │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 2. CLAUDE.md (根目录)                    │
│    全局规则和约定                         │
│    → 了解项目整体                         │
│    Token: ~2000                          │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 3. src/CLAUDE.md (父模块)                │
│    源代码组织规范                         │
│    → 了解代码结构                         │
│    Token: ~1500                          │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 4. src/api/CLAUDE.md (当前模块)          │
│    API模块具体规则                        │
│    → 了解当前模块                         │
│    Token: ~1000                          │
└────────────────┬─────────────────────────┘
                 ↓
┌──────────────────────────────────────────┐
│ 5. Git最近10个commits                    │
│    项目最近变更                           │
│    → 了解最新进展                         │
│    Token: ~3500                          │
└──────────────────────────────────────────┘

总Token: ~10,000
总耗时: <5秒

vs 单一CLAUDE.md:
总Token: 50,000-100,000
总耗时: 30-60秒

节省: 80-90% Token, 90%+ 时间
```

### `.claude/HIERARCHY.json` 配置

```json
{
  "contextAssembly": {
    "order": [
      "active-context",
      "global-docs",
      "current-module",
      "parent-modules",
      "git-memory"
    ],
    "tokenBudget": 10000,
    "priorities": {
      "active-context": {
        "file": ".claude/CONTEXT.md",
        "maxTokens": 2000,
        "priority": 1
      },
      "global-docs": {
        "files": ["CLAUDE.md"],
        "maxTokens": 2000,
        "priority": 2
      },
      "current-module": {
        "pattern": "{currentDir}/CLAUDE.md",
        "maxTokens": 1500,
        "priority": 3
      },
      "parent-modules": {
        "pattern": "{parentDirs}/CLAUDE.md",
        "maxTokens": 1000,
        "priority": 4
      },
      "git-memory": {
        "source": "git-commits",
        "commitDepth": 10,
        "maxTokens": 3500,
        "priority": 5
      }
    }
  }
}
```

---

## 自动驾驶行为

分层文档系统**自动集成**到整个工作流：

- `/start` → 自动扫描并创建HIERARCHY.json
- 进入任何目录 → 自动加载相关CLAUDE.md
- `/start --resume` → 自动加载活跃上下文
- 任务完成 → 自动更新相关模块文档

---

## 使用命令

### `/hierarchy:init` - 初始化分层文档

```bash
/project-optimizer:hierarchy --init

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏗️ 初始化分层文档系统

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: 扫描项目结构
→ 检测到 src/, tests/, docs/
→ 发现 5 个主要目录

Step 2: 分析现有CLAUDE.md
→ 找到: CLAUDE.md (根目录, 1500行)
→ 建议: 拆分为多个模块

Step 3: 生成文档建议

推荐层级结构:

Level 1 (Global):
  ✓ CLAUDE.md (已存在)

Level 2 (Modules) - 建议创建:
  → src/CLAUDE.md (代码组织规范)
  → tests/CLAUDE.md (测试规范)
  → docs/CLAUDE.md (文档规范)

Level 3 (Submodules) - 建议创建:
  → src/api/CLAUDE.md
  → src/database/CLAUDE.md
  → src/auth/CLAUDE.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] ✅ 自动创建所有建议文档
[2] 📝 手动选择创建哪些
[3] 📋 查看每个文档的建议内容
[4] ❌ 取消

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### `/hierarchy:load` - 加载上下文

```bash
/project-optimizer:hierarchy --load src/api

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 加载上下文: src/api

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

正在加载相关文档...

[1/5] .claude/CONTEXT.md
  ✅ 已加载 (1850 tokens)

[2/5] CLAUDE.md (全局)
  ✅ 已加载 (2100 tokens)

[3/5] src/CLAUDE.md (父模块)
  ✅ 已加载 (1600 tokens)

[4/5] src/api/CLAUDE.md (当前模块)
  ✅ 已加载 (1100 tokens)

[5/5] Git Memory (最近10个commits)
  ✅ 已加载 (3200 tokens)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

上下文加载完成！

总Token: 9,850
耗时: 3.2秒
Token预算: 10,000 (剩余: 150)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

现在你可以开始工作了！

[1] ▶️ 开始任务
[2] 📋 查看加载的内容摘要
[3] 🔄 重新加载
```

### `/hierarchy:create` - 创建模块文档

```bash
/project-optimizer:hierarchy --create src/payments/CLAUDE.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 创建模块文档

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

路径: src/payments/CLAUDE.md
层级: Level 3 (Submodule)
父模块: src/CLAUDE.md

正在分析模块...

检测到:
- 文件: 8个 (.ts)
- 导出: PaymentService, processPayment, refund
- 依赖: src/database, src/api

生成文档模板:

```markdown
# Payments Module

## 模块职责
- 处理支付请求
- 退款管理
- 支付状态追踪

## 关键文件
- `service.ts` - PaymentService主服务
- `processor.ts` - 支付处理器
- `refund.ts` - 退款逻辑

## API
- `POST /api/payments` - 创建支付
- `GET /api/payments/:id` - 查询支付状态
- `POST /api/payments/:id/refund` - 退款

## 依赖
- `src/database` - 持久化订单
- `src/api` - 暴露API接口

## 配置
...
```

[1] ✅ 创建文档
[2] 📝 编辑模板
[3] ❌ 取消

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### `/hierarchy:validate` - 验证文档

```bash
/project-optimizer:hierarchy --validate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 验证分层文档

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

检查规则:
✓ 每个CLAUDE.md < 5000行
✓ 每个CLAUDE.md < 3000 tokens
✓ 层级深度 ≤ 3
✓ 所有文档有描述
✓ 无重复内容

扫描中...

[✅] CLAUDE.md (2100 tokens)
[✅] src/CLAUDE.md (1600 tokens)
[✅] src/api/CLAUDE.md (1100 tokens)
[⚠️] src/database/CLAUDE.md (3200 tokens)
     警告: 接近上限，建议拆分

[❌] src/legacy/CLAUDE.md (5500 tokens)
     错误: 超出限制，必须拆分

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

验证结果:
✅ 通过: 3个
⚠️ 警告: 1个
❌ 错误: 1个

建议操作:
1. 拆分 src/legacy/CLAUDE.md
2. 优化 src/database/CLAUDE.md

[1] 📝 查看详细建议
[2] 🔧 自动修复
[3] ❌ 忽略

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### `/hierarchy:index` - 查看文档索引

```bash
/project-optimizer:hierarchy --index

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 文档索引

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌍 Level 1: Global
  CLAUDE.md
    描述: 项目全局规则和约定
    Tokens: 2100
    标签: global, architecture, conventions

📦 Level 2: Modules
  src/CLAUDE.md
    描述: 源代码组织规范
    Tokens: 1600
    标签: source, structure

  tests/CLAUDE.md
    描述: 测试策略和规范
    Tokens: 800
    标签: testing, qa

🔧 Level 3: Submodules
  src/api/CLAUDE.md
    描述: API设计和路由
    Tokens: 1100
    标签: api, routing, auth
    父模块: src/CLAUDE.md

  src/database/CLAUDE.md
    描述: 数据库模型和查询
    Tokens: 1000
    标签: database, models
    父模块: src/CLAUDE.md

  src/auth/CLAUDE.md
    描述: 认证和授权
    Tokens: 900
    标签: auth, jwt, middleware
    父模块: src/CLAUDE.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

总文档: 6个
总Tokens: 7500

[1] 🔍 搜索文档
[2] 📊 查看统计
[3] 🌳 查看树状图

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 文档模板

### Level 1: Global (CLAUDE.md)

```markdown
# {{ProjectName}}

> 版本: {{version}} | 创建: {{date}}

## 项目概述

{{projectDescription}}

## 技术栈

- **语言**: {{language}}
- **框架**: {{framework}}
- **数据库**: {{database}}
- **部署**: {{deployment}}

## 核心约定

### 代码风格
- 命名: {{namingConvention}}
- 格式化: {{formatter}}
- Linter: {{linter}}

### Git规范
- Commit格式: {{commitFormat}}
- 分支策略: {{branchStrategy}}

### 文档规范
- API文档: {{apiDocs}}
- 代码注释: {{commentStyle}}

## 模块结构

本项目采用分层文档系统，每个模块有独立的CLAUDE.md:

- `src/` - 源代码 (见 src/CLAUDE.md)
- `tests/` - 测试 (见 tests/CLAUDE.md)
- `docs/` - 文档 (见 docs/CLAUDE.md)

## 重要链接

- 架构文档: docs/ARCHITECTURE.md
- API文档: docs/API.md
- 部署指南: docs/DEPLOYMENT.md
```

### Level 2: Module (src/CLAUDE.md)

```markdown
# Source Code Module

> 父文档: [CLAUDE.md](../CLAUDE.md)

## 模块职责

此目录包含所有源代码，按功能模块组织。

## 目录结构

```
src/
├── api/        - API接口 (见 api/CLAUDE.md)
├── database/   - 数据层 (见 database/CLAUDE.md)
├── auth/       - 认证 (见 auth/CLAUDE.md)
└── utils/      - 工具函数
```

## 代码组织规范

### 文件命名
- 组件: `PascalCase.tsx`
- 服务: `kebab-case.service.ts`
- 工具: `kebab-case.util.ts`

### 导入顺序
1. 外部依赖
2. 内部模块
3. 类型定义
4. 样式文件

### 导出规范
- 默认导出: 类和组件
- 命名导出: 工具函数

## 依赖管理

- 核心依赖: {{coreDeps}}
- 避免循环依赖
- 使用barrel exports
```

### Level 3: Submodule (src/api/CLAUDE.md)

```markdown
# API Module

> 父文档: [src/CLAUDE.md](../CLAUDE.md)

## 模块职责

- RESTful API设计
- 路由管理
- 请求验证
- 错误处理

## 关键文件

- `routes/` - 路由定义
- `middleware/` - 中间件
- `validators/` - 请求验证
- `errors/` - 错误处理

## API设计规范

### 路由格式
```
/api/v1/{resource}/{id?}/{action?}
```

### 认证
- 所有API需要JWT (除登录/注册)
- Header: `Authorization: Bearer {token}`

### 响应格式
```json
{
  "success": boolean,
  "data": any,
  "error": string | null
}
```

## 依赖的模块

- `src/database` - 数据持久化
- `src/auth` - 认证验证
```

---

## 最佳实践

### 1. 文档大小控制

```
推荐大小:
✅ Level 1 (Global): 1500-2500 tokens
✅ Level 2 (Module): 1000-2000 tokens
✅ Level 3 (Submodule): 800-1500 tokens

避免:
❌ 超过3000 tokens (拆分)
❌ 少于500 tokens (合并)
```

### 2. 层级深度

```
推荐深度: ≤ 3 层

✅ 好的:
project/
├── CLAUDE.md (L1)
├── src/
│   ├── CLAUDE.md (L2)
│   └── api/
│       └── CLAUDE.md (L3)

❌ 避免: 4层或更深
project/
├── CLAUDE.md (L1)
├── src/
│   ├── CLAUDE.md (L2)
│   └── api/
│       ├── CLAUDE.md (L3)
│       └── v1/
│           └── CLAUDE.md (L4) ← 太深了
```

### 3. 内容组织

```
每个CLAUDE.md应包含:
✅ 模块职责
✅ 关键文件
✅ 规范和约定
✅ 依赖关系
✅ 父模块链接

避免:
❌ 重复全局规则
❌ 具体实现细节
❌ 临时信息
```

---

## 性能对比

### 上下文加载

| 方式 | 文档数 | Token | 耗时 |
|------|--------|-------|------|
| 单一CLAUDE.md | 1 | 50K-100K | 30-60s |
| **分层文档** | 3-5 | 5K-10K | <5s |
| **节省** | - | **80-90%** | **90%+** |

### 团队协作

| 场景 | 单一文档 | 分层文档 |
|------|---------|---------|
| 并行编辑 | ❌ 冲突 | ✅ 无冲突 |
| 模块聚焦 | ❌ 混杂 | ✅ 清晰 |
| 上下文切换 | ❌ 慢 | ✅ 快 |

---

## 与其他系统集成

### Git Memory

```
分层文档 + Git记忆:

1. 工作在 src/api/
2. 自动加载:
   - CLAUDE.md (全局)
   - src/CLAUDE.md (模块)
   - src/api/CLAUDE.md (子模块)
   - Git commits (最近10个)
3. 总Token: ~10K
4. 总耗时: <5秒
```

### Maintenance Mode

```
维护模式 + 分层文档:

1. /maintenance --init
2. 自动创建模块级CLAUDE.md
3. 问题修复时只读相关模块
4. 降低Token消耗
```

---

## 相关命令

- `/start` - 自动扫描创建HIERARCHY.json
- `/git-memory:recover` - 配合Git记忆使用
- `/maintenance` - 配合维护模式使用

---

*基于: DocAgent & Augment 最佳实践*
*参考: https://arxiv.org/html/2504.08725v1*
