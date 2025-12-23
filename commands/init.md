---
description: Initialize project with CLAUDE.md memory system
---

# Init - 初始化项目

创建 CLAUDE.md 作为项目的持久记忆系统。

## 执行流程

```
1. 检查是否已存在 CLAUDE.md
   - 存在 → 询问是否更新
   - 不存在 → 继续

2. 收集项目信息
   - 项目名称（默认使用目录名）
   - 简短描述
   - 技术栈（自动检测 + 确认）

3. 创建 CLAUDE.md
   - 使用 templates/CLAUDE.md 模板
   - 替换变量
   - 初始化 Memory 区域

4. 完成提示
```

## 自动检测

从以下文件检测技术栈：

| 文件 | 检测内容 |
|------|----------|
| package.json | Node.js, 框架, 脚本命令 |
| Cargo.toml | Rust |
| go.mod | Go |
| requirements.txt / pyproject.toml | Python |
| *.csproj | .NET |

## 输出示例

```
Claude Code Optimizer - 初始化

检测到项目信息：
  名称: my-project
  语言: TypeScript
  框架: React
  构建: npm run build
  测试: npm test

确认创建 CLAUDE.md？[Y/n]

✓ CLAUDE.md 已创建

下一步：
  - 正常开发
  - 使用 /diary 记录重要节点
  - 使用 /reflect 整理记忆
  - Git commit 作为自然检查点
```

## 已存在 CLAUDE.md

```
检测到已存在 CLAUDE.md

选项：
[1] 跳过 - 保持现有配置
[2] 更新 - 同步技术栈信息
[3] 重置 - 重新初始化（保留 Memory）
```

## 用法

```
/init              # 交互式初始化
/init --force      # 强制重新初始化
```
