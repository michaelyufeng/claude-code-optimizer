---
description: Update CLAUDE.md memory by analyzing diary entries
---

# Reflect - 反思更新

分析 Memory 中的日记条目，提炼关键信息更新到 CLAUDE.md 的持久化区域。

## 使用场景

- 项目达到重要里程碑
- Memory 条目超过 5 条
- 发现需要长期记住的模式
- 准备开始新的大任务前

## 执行流程

```
1. 读取 Memory 区域的日记条目

2. 分析提炼：
   - 哪些决策需要成为项目规则？
   - 哪些发现需要更新到项目概述？
   - 哪些模式需要记录为约定？
   - 哪些问题需要添加为注意事项？

3. 更新 CLAUDE.md：
   - 更新 ## 项目概述（如有新理解）
   - 更新 ## 约定（如有新模式）
   - 更新 ## 注意事项（如有新问题）
   - 压缩 Memory（保留摘要，移除细节）

4. 归档旧条目到 docs/HISTORY.md
```

## 更新示例

**Before (Memory 有多条记录):**
```markdown
## Memory

### 2024-12-23 15:30 - 实现用户认证
- **决策**: 使用 JWT 而非 session

### 2024-12-23 17:00 - 添加权限系统
- **决策**: 基于角色的访问控制(RBAC)
- **发现**: 需要在每个路由添加权限检查
```

**After (reflect 后):**
```markdown
## 约定

### 认证与授权
- 使用 JWT 无状态认证
- RBAC 权限模型
- 所有 API 路由需添加权限中间件

## Memory

### 总结 - 认证系统 v1.0 完成
基于 JWT + RBAC 的认证授权系统已实现。
详细历史见 docs/HISTORY.md
```

## 自动触发条件

当以下条件满足时，Claude 应主动建议运行 /reflect：
- Memory 条目 >= 5 条
- 距上次 reflect 超过 3 天
- 即将开始全新的大任务

## 快捷用法

```
/reflect              # 分析并更新
/reflect --dry-run    # 仅预览变更，不实际修改
```
