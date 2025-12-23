# Claude Code Optimizer - 开发中项目

> 项目类型: dev (开发中)
> 版本: 2.0.0
> 作者: michaelyufeng
> 初始化时间: 2025-12-23
> 最后更新: 2025-12-23

## 项目概述

Self-driving Claude Code enhancement - 通过CLAUDE.md中的行为规则实现智能上下文保护、任务管理和进度追踪。

**v2.0 核心变化**：从"显式命令调用"改为"自驱动行为规则"。

## 权限级别

**开发中项目 - 适度限制**

### 可自由操作
- 添加新功能和命令
- 修改文档和模板
- 重构代码结构

### 需确认后操作 (SHOULD)
- 修改核心工作流逻辑 (`commands/` 中的阶段命令)
- 更改插件配置 (`.claude-plugin/`)
- 删除现有功能

### 禁止操作 (MUST NOT)
- 删除已发布的 API 接口
- 破坏向后兼容性
- 提交未测试的代码

## 关键文件 (警告区)

```
.claude-plugin/plugin.json    # 插件元数据 - 谨慎修改
commands/                      # 核心命令 - 修改前确认
templates/                     # 项目模板 - 影响用户体验
```

## 项目结构

```
claude-code-optimizer/
├── .claude-plugin/           # 插件配置
│   ├── plugin.json          # 插件元数据
│   └── marketplace.json     # 市场配置
├── commands/                 # Slash 命令定义
│   ├── init.md              # 初始化命令
│   ├── research.md          # 研究阶段
│   ├── planning.md          # 规划阶段
│   ├── gate1.md             # Gate 1 审核
│   └── ...                  # 更多阶段命令
├── templates/                # CLAUDE.md 模板
├── skills/                   # 技能定义
└── docs/                     # 文档输出目录
```

## 工作流规范

### 强制阶段流程 (新项目)
```
研究 → 规划 → Gate1 → 架构 → 原型 → Gate2 → 后端 → 集成 → 输出
```

### 开发任务流程
1. 使用 `/project-optimizer:plan` 规划任务
2. 创建分支进行开发
3. 使用 `/project-optimizer:review` 审查代码
4. 使用 `/project-optimizer:checkpoint` 保存进度

## 当前状态

- **阶段**: 开发中
- **下一步**: 完善测试和文档

## 规则分层

| 级别 | 标记 | 说明 |
|------|------|------|
| MUST | 硬性规则 | 安全、兼容性相关，不可违反 |
| SHOULD | 软性规则 | 设计规范，变更时询问 |
| PREFER | 偏好规则 | 可自动调整 |

## 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2025-12-23 | 2.0.0 | 重大架构重构：自驱动行为规则、移除预设Agent、简化命令结构 |
| 2025-12-23 | 1.0.1 | 添加智能评估系统、审查标签功能 |
| 2025-12-23 | 1.0.0 | 初始化项目配置 |

---
*由 /project-optimizer:init 自动生成*

<!-- Claude Code Optimizer 审查记录 -->
<!--
  评估时间: 2025-12-23
  评估版本: 1.0.1
  综合评分: 88/100
  评级: ⭐⭐⭐⭐ 优秀
  状态: ✅ 已认证
  演进次数: 1
  下次审查: 当项目有重大变更时运行 /project-optimizer:evolve
-->
