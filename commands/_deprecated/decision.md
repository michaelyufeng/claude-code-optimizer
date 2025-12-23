---
description: Record and manage key project decisions for future reference
---

# 决策记录 (Memory System)

## 功能说明

记录项目中的关键决策，包括技术选型、架构决策、产品决策等，确保决策历史可追溯。

## 决策类型

### 决策分类

```markdown
## 决策类型

### 🔧 技术决策 (tech)
- 编程语言选择
- 框架选择
- 库/工具选择
- 技术栈确定

### 🏗️ 架构决策 (arch)
- 系统架构模式
- API 设计决策
- 数据模型设计
- 部署架构

### 📦 产品决策 (product)
- 功能取舍
- MVP 范围
- 优先级排序
- 用户体验设计

### 🔒 安全决策 (security)
- 认证方案
- 授权策略
- 数据保护
- 合规要求

### 💼 业务决策 (business)
- 商业模式
- 定价策略
- 目标市场
- 运营策略
```

---

## 记录决策

### 交互式记录

```
/project-optimizer:decision

🔑 记录新决策

请提供以下信息：

1. 决策类型:
   [1] 🔧 技术决策
   [2] 🏗️ 架构决策
   [3] 📦 产品决策
   [4] 🔒 安全决策
   [5] 💼 业务决策

2. 决策标题:
   > _______________________

3. 决策内容:
   > _______________________

4. 决策理由:
   > _______________________

5. 考虑过的替代方案 (可选):
   > _______________________

6. 相关文件/代码 (可选):
   > _______________________
```

### 快速记录

```markdown
## 快速记录语法

### 命令行记录
/project-optimizer:decision --type tech --title "使用 JWT 认证" --reason "无状态验证"

### 简写格式
/project-optimizer:decision "使用 PostgreSQL" --type tech

### 带备选方案
/project-optimizer:decision "使用 REST API" --alternatives "GraphQL, gRPC"
```

---

## 决策模板

### 标准决策记录 (ADR)

```markdown
## 决策记录 #[编号]

### 标题
[决策标题]

### 状态
[提议 | 已采纳 | 已弃用 | 已取代]

### 背景
[问题背景和需要做决策的原因]

### 决策
[具体的决策内容]

### 理由
[为什么做出这个决策]

### 考虑过的替代方案
1. [替代方案1] - [为什么没选]
2. [替代方案2] - [为什么没选]

### 影响
- [正面影响]
- [负面影响/权衡]

### 相关
- 文件: [相关文件列表]
- 决策: [相关的其他决策]
- 链接: [参考资料]

### 元信息
- 日期: [YYYY-MM-DD]
- 阶段: [项目阶段]
- 决策者: [谁做的决策]
```

### 决策存储格式

`.claude/PROJECT_MEMORY/decisions/decisions.json`:

```json
{
  "decisions": [
    {
      "id": "dec_001",
      "type": "tech",
      "title": "使用 JWT 进行认证",
      "status": "adopted",
      "context": "需要为 API 选择认证方案",
      "decision": "使用 JWT (JSON Web Token) 进行 API 认证",
      "reasoning": [
        "支持无状态验证",
        "适合微服务架构",
        "减少数据库查询"
      ],
      "alternatives": [
        {
          "option": "Session-based 认证",
          "rejected_reason": "需要服务端存储，不适合无状态架构"
        },
        {
          "option": "OAuth2.0",
          "rejected_reason": "初期 MVP 不需要第三方登录"
        }
      ],
      "consequences": {
        "positive": ["无状态", "可扩展", "性能好"],
        "negative": ["Token 无法主动失效", "需要处理刷新"]
      },
      "relatedFiles": ["docs/API.md", "src/middleware/auth.ts"],
      "relatedDecisions": [],
      "phase": "architecture",
      "madeAt": "2024-12-15T14:30:00Z",
      "madeBy": "user"
    }
  ]
}
```

---

## 查看决策

### 决策列表

```
/project-optimizer:decision --list

🔑 项目决策记录

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🔧 技术决策 (4)

| # | 决策 | 理由 | 日期 | 状态 |
|---|------|------|------|------|
| 1 | TypeScript | 类型安全 | 12-14 | ✅ |
| 2 | Hono 框架 | 轻量快速 | 12-14 | ✅ |
| 3 | Drizzle ORM | 类型安全 | 12-14 | ✅ |
| 4 | JWT 认证 | 无状态验证 | 12-15 | ✅ |

## 🏗️ 架构决策 (2)

| # | 决策 | 理由 | 日期 | 状态 |
|---|------|------|------|------|
| 1 | 单体架构 | 初期简单 | 12-15 | ✅ |
| 2 | REST API | 简单直接 | 12-15 | ✅ |

## 📦 产品决策 (2)

| # | 决策 | 理由 | 日期 | 状态 |
|---|------|------|------|------|
| 1 | MVP 核心功能 | 快速验证 | 12-15 | ✅ |
| 2 | 移动端优先 | 用户习惯 | 12-15 | ✅ |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
总计: 8 个决策 | 最近: 2024-12-15
```

### 决策详情

```
/project-optimizer:decision --show dec_001

🔑 决策详情 #dec_001

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 使用 JWT 进行认证

类型: 🔧 技术决策
状态: ✅ 已采纳
日期: 2024-12-15
阶段: 架构阶段

### 背景
需要为 API 选择认证方案

### 决策
使用 JWT (JSON Web Token) 进行 API 认证

### 理由
1. 支持无状态验证
2. 适合微服务架构
3. 减少数据库查询

### 考虑过的替代方案
❌ Session-based 认证
   → 需要服务端存储，不适合无状态架构

❌ OAuth2.0
   → 初期 MVP 不需要第三方登录

### 影响
✅ 正面: 无状态、可扩展、性能好
⚠️ 权衡: Token 无法主动失效、需要处理刷新

### 相关文件
- docs/API.md
- src/middleware/auth.ts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 决策管理

### 更新决策状态

```markdown
## 状态变更

### 弃用决策
/project-optimizer:decision --deprecate dec_001 --reason "改用 OAuth2.0"

### 取代决策
/project-optimizer:decision --supersede dec_001 --by dec_005

### 恢复决策
/project-optimizer:decision --restore dec_001
```

### 决策关联

```markdown
## 关联管理

### 添加关联文件
/project-optimizer:decision --link dec_001 --file src/auth/jwt.ts

### 添加关联决策
/project-optimizer:decision --link dec_001 --decision dec_003

### 添加参考链接
/project-optimizer:decision --link dec_001 --url "https://jwt.io"
```

---

## 自动记录

### 自动检测决策

```markdown
## 自动决策检测

系统会在以下情况自动提示记录决策：

1. **技术选型讨论**
   - 当讨论框架、库、工具选择时
   - 当确定技术栈时

2. **架构设计**
   - 当设计系统架构时
   - 当确定 API 设计时

3. **取舍讨论**
   - 当讨论功能取舍时
   - 当权衡方案优缺点时

4. **确认性语句**
   - "决定使用 X"
   - "选择 X 方案"
   - "确定采用 X"
```

### 自动提示示例

```
💡 检测到可能的技术决策！

您提到 "决定使用 Hono 框架"

是否记录此决策？
[1] ✅ 记录决策
[2] 📝 记录并添加详情
[3] ⏭️ 跳过
```

---

## 导出和报告

### 导出格式

```markdown
## 导出决策

### 导出为 Markdown
/project-optimizer:decision --export markdown > DECISIONS.md

### 导出为 JSON
/project-optimizer:decision --export json > decisions.json

### 生成决策报告
/project-optimizer:decision --report
```

### 决策报告

```markdown
# 项目决策报告

生成时间: 2024-12-15
项目阶段: 架构阶段 (4/9)

## 决策概览

- 总决策数: 8
- 技术决策: 4
- 架构决策: 2
- 产品决策: 2

## 关键决策

### 技术栈
- 语言: TypeScript
- 框架: Hono
- ORM: Drizzle
- 数据库: PostgreSQL

### 架构
- 模式: 单体架构
- API: REST
- 认证: JWT

### 产品
- 策略: MVP 优先
- 重点: 核心功能
- 目标: 快速验证

## 决策时间线

[时间线图...]

## 待决策事项

1. OAuth2.0 支持范围
2. Token 过期策略
3. 缓存方案选择
```
