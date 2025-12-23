# [项目名称]

> 项目阶段：🆕 新项目 | 需要完整规划

## 📋 项目概述

[简述项目目标和核心功能]

## 🛠 技术栈

- Runtime: Node.js 20+ / Python 3.11+
- Framework: [Next.js / FastAPI / ...]
- Database: [PostgreSQL / MongoDB / ...]
- 包管理: [pnpm / npm / uv]

## ⚡ 常用命令

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建项目
pnpm test         # 运行测试
pnpm lint         # 代码检查
pnpm typecheck    # 类型检查

# Git
git status        # 查看状态
git diff          # 查看变更
```

## 📁 项目结构

```
src/
├── components/   # UI 组件
├── pages/        # 页面
├── api/          # API 路由
├── lib/          # 工具函数
└── types/        # 类型定义
```

## ✅ 代码规范

### 必须遵守
- 使用 TypeScript，避免 `any`
- 组件使用函数式写法
- 解构导入 `import { x } from 'y'`
- 每个函数必须有注释说明用途

### 禁止事项
- ❌ 不要在组件中写业务逻辑
- ❌ 不要直接操作 DOM
- ❌ 不要 hard-code 配置值
- ❌ 不要忽略 TypeScript 错误

## 🔄 开发工作流

### 开始任务前
1. 先读取相关文件，理解现有代码
2. 制定计划，**不要直接写代码**
3. 计划确认后再开始实现

### 完成任务后 (IMPORTANT)
1. `pnpm lint` - 检查代码规范
2. `pnpm typecheck` - 检查类型
3. `pnpm test` - 运行相关测试
4. 如有问题，修复后再提交

## 📝 任务记录

### 当前任务
- [ ] 待填写

### 已完成
- [x] 项目初始化

## ⚠️ 注意事项

- 大改动前先问用户确认
- 不确定的地方先搜索再实现
- 参考 `docs/` 目录下的文档

## 📚 相关文档

- `docs/API.md` - API 文档
- `docs/ARCHITECTURE.md` - 架构设计
- `docs/DISCOVERIES.md` - 开发中的发现
