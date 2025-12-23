---
description: Sync CLAUDE.md with codebase changes automatically
---

# 同步系统 (Sync)

自动同步 CLAUDE.md 和项目代码，确保文档与实现一致。

## 自动驾驶行为

自动驾驶模式下，sync 会在以下时机自动触发：

- 阶段完成时
- 代码变更时
- Git 操作后
- 依赖更新后

---

## 同步范围

### 自动同步内容

| 内容类型 | 检测方式 | 更新目标 |
|----------|----------|----------|
| 目录结构 | 扫描 src/ | CLAUDE.md 结构章节 |
| 依赖变化 | package.json diff | CLAUDE.md 技术栈 |
| API 变化 | 路由文件扫描 | docs/API.md |
| 配置变化 | 配置文件 diff | 相关文档 |

### 需确认同步

| 内容类型 | 触发条件 | 确认原因 |
|----------|----------|----------|
| 技术栈描述 | 框架/语言变更 | 影响整体架构 |
| 规则变更 | 新增约束 | 影响开发行为 |
| 架构变更 | 大规模重构 | 需要人工确认 |

---

## 同步检测

### 自动检测

```
🔄 同步检测

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

上次同步: 2 小时前

## 检测到的变化

### 📁 目录结构
+ 新增: src/middleware/auth.ts
+ 新增: src/utils/jwt.ts
~ 移动: src/lib/ → src/utils/

### 📦 依赖
+ 新增: jsonwebtoken@9.0.0
+ 新增: bcrypt@5.1.0
~ 更新: typescript@5.2 → 5.3

### ⚙️ 配置
~ 修改: tsconfig.json (新增路径别名)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

需要更新:
- CLAUDE.md 目录结构章节
- CLAUDE.md 技术栈章节

[1] 🔄 自动同步
[2] 📝 手动确认
[3] ⏭️ 跳过
```

---

## 同步执行

### 自动同步

```
🔄 执行同步

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 自动更新 (3 项)

### CLAUDE.md - 目录结构
+ 添加: src/middleware/
+ 添加: src/utils/jwt.ts

### CLAUDE.md - 技术栈
+ 添加: jsonwebtoken (JWT 认证)
+ 添加: bcrypt (密码加密)

### 状态更新
~ 更新: PROJECT_STATE.json

✅ 自动同步完成

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 需要确认 (1 项)

### 目录重命名
检测到: src/lib/ → src/utils/

这可能影响已有的导入路径，确认同步文档？
[Y/n]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## CLAUDE.md 自动更新

### 阶段完成自动更新

```markdown
## 研究阶段完成后自动添加

## 技术栈

- 语言: TypeScript 5.3
- 框架: Hono 3.x
- ORM: Drizzle
- 数据库: PostgreSQL

## 技术约束

- 必须使用 TypeScript 严格模式
- 优先使用函数式编程
```

```markdown
## 规划阶段完成后自动添加

## 核心功能

### MVP 范围
- [ ] 用户注册/登录
- [ ] [核心功能1]
- [ ] [核心功能2]

## 开发优先级

P0 - 必须完成: 用户系统, 核心功能
P1 - 应该完成: 增强功能
```

```markdown
## 架构阶段完成后自动添加

## 架构规则

### 代码组织
src/
├── routes/       # API 路由
├── services/     # 业务逻辑
├── models/       # 数据模型
└── middleware/   # 中间件

### 命名规范
- 文件: kebab-case
- 类: PascalCase
- 函数: camelCase

## API 规范

- 风格: RESTful
- 认证: JWT
- 前缀: /api/v1/
```

---

## 手动命令

```bash
/project-optimizer:sync              # 执行同步
/project-optimizer:sync --check      # 仅检查不同步
/project-optimizer:sync --force      # 强制全量同步
/project-optimizer:sync --history    # 查看同步历史
```

---

## 同步历史

```
/project-optimizer:sync --history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 同步历史
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

| 时间 | 类型 | 变更数 | 描述 |
|------|------|--------|------|
| 16:30 | 自动 | 3 | 架构阶段完成同步 |
| 14:00 | 自动 | 5 | 依赖更新同步 |
| 10:00 | 手动 | 2 | 目录结构同步 |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Git 集成

### commit 前自动同步

```markdown
## Git 集成规则

1. git add 前
   - 检测 CLAUDE.md 是否需要更新
   - 自动同步未保存的变更

2. git commit 前
   - 触发 /reflect 归档短期记忆
   - 更新 Memory 中的 commit 记录

3. git push 前
   - 确保 CLAUDE.md 和 HISTORY.md 已提交
```

### 示例

```
git commit -m "feat: add user auth"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔄 提交前同步检查
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ CLAUDE.md 已同步
✅ Memory 已更新
✅ HISTORY.md 已归档

继续提交...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 配置

`.claude/sync-config.json`:

```json
{
  "autoSync": {
    "enabled": true,
    "onPhaseComplete": true,
    "onCodeChange": true,
    "onGitCommit": true,
    "onDependencyChange": true
  },
  "exclude": [
    "node_modules/**",
    "dist/**",
    "*.test.ts",
    "__tests__/**"
  ],
  "confirmRequired": [
    "techStack",
    "architecture",
    "rules"
  ]
}
```
