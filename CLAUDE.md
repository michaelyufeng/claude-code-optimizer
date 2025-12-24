# Claude Code Optimizer

> 初始化: 2025-12-23 | 版本: 1.0.5

## 项目概述

Claude Code 自动驾驶开发插件。一次启动，全程跟踪项目开发。

核心特性：
- 6 阶段流程：研究 → 规划 → 架构 → 开发 → 测试 → 部署
- 3 道 Gate 门控：Gate 1 (规划→架构)、Gate 2 (开发→测试)、Gate 3 (测试→部署)
- 灵活模式：支持 --phase 阶段跳转、--type 项目类型预设
- 全自动 Agent 分配
- 任务自动分割
- 双记忆系统（短期 + 长期）
- 选项驱动（禁止无方向编码）

## 技术栈

- 类型: Claude Code Plugin
- 语言: Markdown (命令定义)
- 仓库: https://github.com/michaelyufeng/claude-code-optimizer

## 目录结构

```
claude-code-optimizer/
├── .claude-plugin/       # 插件配置
│   ├── plugin.json
│   └── marketplace.json
├── commands/             # 16 个核心命令
│   ├── start.md         # 自动驾驶入口 (--phase, --type, --resume)
│   ├── status.md        # 状态查看 (含变更提示)
│   ├── detect.md        # 变更检测
│   ├── research.md      # 研究阶段
│   ├── plan.md          # 规划阶段
│   ├── arch.md          # 架构阶段
│   ├── dev.md           # 开发阶段
│   ├── test.md          # 测试阶段 (新增)
│   ├── deploy.md        # 部署阶段 (新增)
│   ├── gate.md          # 阶段门控 (3 道 Gate)
│   ├── agents.md        # Agent 管理
│   ├── split.md         # 任务分割
│   ├── diary.md         # 短期记忆 → TASKS.md
│   ├── reflect.md       # 长期记忆
│   ├── sync.md          # 同步系统 (含离线检测)
│   └── help.md          # 帮助
├── templates/
│   ├── CLAUDE.md        # 项目配置模板
│   ├── TASKS.md         # 任务追踪模板
│   └── LAST_SYNC.json   # 同步追踪模板 (新增)
└── README.md

# 使用时生成的文件结构
project/
├── .claude/
│   ├── PROJECT_STATE.json   # 阶段状态、Agent
│   ├── TASKS.md             # 任务追踪、会话日志
│   └── LAST_SYNC.json       # 同步追踪 (新增)
├── CLAUDE.md                # 项目规则、重大决策
└── docs/
    └── HISTORY.md           # 长期记忆归档
```

## 命令一览

### 自动驾驶
- `/start` - 启动自动驾驶
- `/start --resume` - 恢复 (含自动检测)
- `/start --phase [阶段]` - 从指定阶段开始
- `/start --type [类型]` - 项目类型预设 (new/existing/maintenance)
- `/status` - 查看状态 (含变更提示)
- `/detect` - 检测离线变更

### 阶段流程 (6 阶段)
- `/research` - 研究阶段
- `/plan` - 规划阶段
- `/arch` - 架构阶段
- `/dev` - 开发阶段
- `/test` - 测试阶段
- `/deploy` - 部署阶段
- `/gate` - 门控检查 (Gate 1/2/3)

### Agent 与任务
- `/agents` - Agent 管理
- `/split` - 任务分割

### 记忆系统
- `/diary` - 短期记忆
- `/reflect` - 长期记忆
- `/sync` - 同步系统

## 约定

### 自动驾驶规则
- 必须通过 Gate 才能进入下一阶段
- 可通过 --phase 或 --type 灵活跳转阶段
- 禁止无方向编码
- 所有决策必须提供选项

### Gate 检查点
- Gate 1 (规划→架构): PRD 完整性、需求可行性
- Gate 2 (开发→测试): 代码质量、功能完整性
- Gate 3 (测试→部署): 测试覆盖率 ≥ 80%、安全审计

### 记忆规则
- 短期记忆最多 10 条
- 超出自动 reflect 到长期记忆
- Git commit 前自动归档

---

## 任务追踪

**详见**: `.claude/TASKS.md` (独立任务追踪文件)

此文件仅记录影响全局的重大决策。

---

## Memory

### 2025-12-24 12:30 - v1.0.5 6 阶段 + 灵活模式
- **完成**: 重构为 6 阶段流程，添加灵活模式
- **背景**: 对比旧版 9 阶段、行业 SDLC 标准、GitHub AI Agent 最佳实践
- **新增**:
  - `commands/test.md` - 独立测试阶段
  - `commands/deploy.md` - 独立部署阶段
  - `--phase` 参数 - 阶段跳转 (research/plan/arch/dev/test/deploy)
  - `--type` 参数 - 项目类型预设 (new/existing/maintenance)
  - 3 道 Gate 门控 (规划→架构、开发→测试、测试→部署)
- **修改文件**:
  - `commands/start.md` - 添加 --phase, --type 参数
  - `commands/gate.md` - 3 道 Gate 检查
  - `commands/status.md` - 适配 6 阶段
  - `commands/help.md` - 更新命令列表
- **设计原则**:
  - 新项目: 完整 6 阶段
  - 已有项目: 可跳过早期阶段
  - 维护项目: 直接从开发或测试开始

### 2025-12-24 11:00 - v1.0.4 自动检测机制
- **完成**: Phase 2 自动检测用户离线变更
- **新增**:
  - `commands/detect.md` - 变更检测命令
  - `templates/LAST_SYNC.json` - 同步追踪模板
  - `/start --resume` 自动检测离线变更
  - `/status` 显示未同步变更警告
- **修改文件**:
  - `commands/start.md` - 添加恢复时自动检测
  - `commands/sync.md` - 添加离线变更检测
  - `commands/status.md` - 添加变更提示
- **设计原则**: 即使用户绕过工作流，Claude 也能感知变更

### 2025-12-24 10:30 - v1.0.3 任务分离架构
- **完成**: Phase 1 任务文件分离
- **新增**:
  - `.claude/TASKS.md` - 独立任务追踪文件
  - 任务状态、会话日志、问题追踪分离到 TASKS.md
  - CLAUDE.md 只保留项目规则和重大决策
- **设计原则**: 文件职责分离，任务追踪独立

### 2025-12-23 23:00 - v1.0.2 完整重构
- **完成**: 从 v3.0 极简版恢复为 v1.0.2 完整版
- **新增**:
  - 4 阶段自动驾驶流程
  - 全自动 Agent 分配
  - 任务自动分割
  - 双记忆系统
  - Gate 质量门控
  - 选项驱动开发
- **命令数**: 6 → 12 个

### 2025-12-23 21:00 - v3.0 极简版
- **问题**: 精简过度，失去项目开发意义
- **结论**: 回退到完整版设计

### 2025-12-23 - 初始化
- **创建**: 项目初始化 v1.0.0
- **功能**: 强制阶段工作流、智能评估系统

---
*由 /project-optimizer:start 启动 | 任务追踪: .claude/TASKS.md | 长期记忆: docs/HISTORY.md*
