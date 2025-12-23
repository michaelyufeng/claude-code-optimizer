# Claude Code Optimizer

> 极简 Claude Code 增强 - 通过 CLAUDE.md 日记系统实现持久记忆

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)

## 核心理念

```
CLAUDE.md = 持久记忆
Git commit = 自然检查点
6 个命令 = 够用就好
```

## 为什么极简？

研究发现的问题：
- 复杂工作流 → 用户不执行 → 功能失效
- 预定义 Agent 角色 → 上下文截断 → 信息丢失
- 多模式选择 → 决策疲劳 → 放弃使用

极简方案：
- **CLAUDE.md 自动加载** = 每次会话自动恢复记忆
- **Git commit** = 天然的检查点，无需额外系统
- **6 个命令** = 必要且充分

## 安装

```bash
/plugin install project-optimizer
```

## 快速开始

```bash
# 1. 初始化项目
/project-optimizer:init

# 2. 正常开发...

# 3. 重要节点时记录
/project-optimizer:diary

# 4. 定期整理记忆
/project-optimizer:reflect
```

## 工作原理

```
┌─────────────────────────────────────────────────────┐
│                    CLAUDE.md                         │
│                                                      │
│  ## 项目概述        ← 项目基本信息                   │
│  ## 约定            ← 从经验中提炼的规则             │
│  ## 注意事项        ← 发现的问题和解决方案           │
│  ## Memory          ← 最近会话的日记条目             │
│                                                      │
└─────────────────────────────────────────────────────┘
        ↑                              ↑
        │                              │
   /reflect                        /diary
   (整理提炼)                     (记录会话)
```

## 6 个命令

| 命令 | 说明 |
|------|------|
| `/project-optimizer:init` | 初始化项目，创建 CLAUDE.md |
| `/project-optimizer:diary` | 记录当前会话的关键信息到 Memory |
| `/project-optimizer:reflect` | 分析 Memory，提炼更新到 CLAUDE.md |
| `/project-optimizer:plan` | 规划任务（使用 checklist） |
| `/project-optimizer:review` | 代码审查 |
| `/project-optimizer:help` | 帮助信息 |

## /diary - 记录会话

在会话结束或重要节点时使用：

```bash
/diary                    # 自动分析并记录
/diary "完成了用户认证"   # 指定内容
```

记录格式：
```markdown
### 2024-12-23 15:30 - 实现用户认证
- **完成**: 设计数据模型，实现注册接口
- **决策**: 使用 JWT（无状态，易扩展）
- **待办**: 实现登录接口
```

## /reflect - 整理记忆

当 Memory 条目较多时使用：

```bash
/reflect              # 分析并更新 CLAUDE.md
/reflect --dry-run    # 仅预览变更
```

功能：
- 将重复出现的模式提炼为「约定」
- 将重要发现更新到「注意事项」
- 压缩旧条目，保持 Memory 简洁
- 归档历史到 `docs/HISTORY.md`

## Git 作为检查点

无需额外的 checkpoint 系统：

```bash
# 完成功能后正常提交
git add .
git commit -m "feat: 实现用户注册"

# 每个 commit = 一个检查点
# commit message = 任务记录
```

恢复方式：
```bash
git log --oneline        # 查看历史
git checkout <commit>    # 恢复到某个点
```

## CLAUDE.md 模板

```markdown
# 项目名称

> 初始化: 2024-12-23

## 项目概述
[项目描述]

## 技术栈
- 语言: TypeScript
- 框架: React

## 约定
[从经验中提炼的规则]

## 注意事项
[发现的问题和解决方案]

---

## Memory
[最近会话的日记条目]
```

## 设计原则

1. **CLAUDE.md 自动加载** - Claude Code 每次启动自动读取
2. **让 Agent 决定** - 不强制工作流，提供工具即可
3. **Git 是天然检查点** - 不重复造轮子
4. **Memory 区域** - 短期记忆，定期整理
5. **约定区域** - 长期记忆，持久生效

## 从 v2.0 迁移

v3.0 大幅简化：
- 29 个命令 → 6 个命令
- 3 种模式 → 统一模式
- state.json → 仅 CLAUDE.md
- checkpoint 系统 → Git commit

旧命令已移至 `commands/_deprecated/`，需要时可恢复。

## License

MIT
