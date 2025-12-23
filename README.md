# Claude Code Optimizer

> 轻量级 Claude Code 增强工具 - 按需使用，快速迭代

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code Plugin](https://img.shields.io/badge/Claude%20Code-Plugin-blue)](https://claude.com/blog/claude-code-plugins)

## 核心理念

```
功能全部保留，按需调用
精简 ≠ 删除，精简 = 改变默认行为
```

**不是更多功能更好，而是恰到好处最好。**

## 三层架构

```
┌─────────────────────────────────────────────────────────────┐
│                    Claude Code Optimizer                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🟢 核心层 (默认启用，最省 Token)                            │
│     • CLAUDE.md (精炼版 ~50行)                              │
│     • /checkpoint (保存进度)                                │
│     • /review (代码审查)                                    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🟡 扩展层 (需要时启用)                                      │
│     • /plan (任务规划)                                      │
│     • /assess (配置评估)                                    │
│     • /evolve (配置演进)                                    │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  🔴 高级层 (大型项目/团队协作)                               │
│     • 完整阶段流程 (可选)                                   │
│     • Gate 质量门禁 (可选)                                  │
│     • 并行 Agents                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 安装

```bash
# 添加 marketplace
/plugin marketplace add michaelyufeng/claude-code-optimizer

# 安装插件
/plugin install project-optimizer
```

## 快速开始

```bash
# 初始化项目
/project-optimizer:init

# 选择模式
🎯 请选择开发模式：

[1] ⚡ 快速模式 (推荐) - 直接开始编码
[2] 📋 标准模式 - 简单规划 + 完整配置
[3] 🏗️ 完整模式 - 大型项目完整流程
```

## 三种开发模式

| 模式 | 适合场景 | CLAUDE.md | Token 消耗 |
|------|----------|-----------|-----------|
| ⚡ 快速 | 个人项目、快速原型 | ~50行 | ~300/次 |
| 📋 标准 | 中型项目、需要规划 | ~100行 | ~500/次 |
| 🏗️ 完整 | 大型项目、团队协作 | ~150行 | ~800/次 |

### ⚡ 快速模式

```bash
/project-optimizer:init
# 选择 [1] 快速模式

# 直接开始编码！

# 需要时：
/project-optimizer:checkpoint  # 保存进度
/project-optimizer:review      # 代码审查 (可选)
```

### 📋 标准模式

```bash
/project-optimizer:init
# 选择 [2] 标准模式
# 回答 3 个简单问题

# 可用命令：
/project-optimizer:plan        # 任务规划
/project-optimizer:checkpoint  # 保存进度
/project-optimizer:review      # 代码审查
/project-optimizer:assess      # 评估配置
```

### 🏗️ 完整模式

```bash
/project-optimizer:init
# 选择 [3] 完整模式
# 选择需要的阶段 (可跳过 Gate)

# 阶段流程 (可选)：
研究 → 规划 → [Gate1] → 架构 → 原型 → [Gate2] → 后端 → 集成 → 输出
```

## 升级路径

从低模式升级到高模式，**不删除现有内容**：

```bash
/project-optimizer:upgrade

# ⚡ 快速 → 📋 标准
# 📋 标准 → 🏗️ 完整
```

## 核心命令

### 🟢 所有模式可用

| 命令 | 说明 | Token |
|------|------|-------|
| `/init` | 初始化项目 | ~500 |
| `/checkpoint` | 保存进度 | ~300 |
| `/review` | 代码审查 | ~800 |
| `/help` | 显示帮助 | ~100 |
| `/upgrade` | 模式升级 | ~300 |

### 🟡 标准模式+

| 命令 | 说明 | Token |
|------|------|-------|
| `/plan` | 任务规划 | ~500 |
| `/assess` | 评估配置 | ~600 |
| `/evolve` | 更新配置 | ~400 |

### 🔴 完整模式

| 命令 | 说明 | Token |
|------|------|-------|
| `/research` | 需求分析 | ~1000 |
| `/architecture` | 架构设计 | ~1000 |
| `/gate1` `/gate2` | 质量门禁 | ~600 |
| `/status` | 阶段状态 | ~200 |

## Token 优化技巧

```markdown
1. 从快速模式开始，需要时再升级
2. 保持 CLAUDE.md 精简 (<100行)
3. 频繁使用 /clear 清理上下文
4. 一次专注一个任务
5. 好的问题描述减少来回
```

## 智能建议

当检测到以下情况时，系统会自动建议：

| 触发条件 | 建议 |
|----------|------|
| 代码文件 > 20 个 | 升级到标准模式 |
| 多人协作 | 启用 Gate 门禁 |
| 频繁报错 | 运行 /review |
| 配置 > 30 天未更新 | 运行 /evolve |

## CLAUDE.md 智能评估

对于已有 CLAUDE.md 的项目：

```
📊 质量评估: 72/100 ⭐⭐⭐

处理方式：
• >= 80: ✅ 认证通过
• 60-79: 🔧 自动优化
• < 60:  🔄 重构完善
```

## 设计理念

**之前**: 强制流程，不能跳过
**现在**: 灵活选择，按需使用

```markdown
✅ 功能全部保留
✅ 遇到问题都能解决
✅ 默认不消耗额外 Token
✅ 需要时随时可用
```

## 相关资源

- [Anthropic 官方最佳实践](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Claude Code 插件文档](https://code.claude.com/docs/en/plugins)
- [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

## 灵感来源

| 项目 | 借鉴特性 |
|------|----------|
| [claude-code-spec-workflow](https://github.com/Pimzino/claude-code-spec-workflow) | Token 优化 |
| [OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows) | 自动审查 |
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 工作流模式 |

## 贡献

欢迎提交 Issue 和 PR！

## License

MIT
