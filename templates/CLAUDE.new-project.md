# [项目名称]

> 项目阶段：🆕 新项目 | 强制流程规划中 | 💾 记忆系统已启用

## 📊 项目状态

**当前阶段**: 研究阶段 (1/9)
**流程模式**: 🔐 强制顺序（必须完成当前步骤才能进入下一步）
**记忆状态**: 🟢 自动保存已启用

```
🔍 研究 → 📝 规划 → 🚧 Gate1 → 🏗️ 架构 → 🎨 原型 → ✅ Gate2 → ⚙️ 后端 → 🔗 集成 → 📦 输出
   ↑
 当前
```

## 💾 会话恢复

**如果这是新会话，请先检查是否需要恢复上下文：**

```
运行 /project-optimizer:restore 恢复上次的上下文
运行 /project-optimizer:history 查看会话历史
```

## 📋 阶段清单

| 阶段 | 状态 | 命令 |
|------|------|------|
| 1. 研究 | ● 进行中 | `/project-optimizer:research` |
| 2. 规划 | 🔒 锁定 | `/project-optimizer:planning` |
| 3. Gate 1 | 🔒 锁定 | `/project-optimizer:gate1` |
| 4. 架构 | 🔒 锁定 | `/project-optimizer:architecture` |
| 5. 原型 | 🔒 锁定 | `/project-optimizer:prototype` |
| 6. Gate 2 | 🔒 锁定 | `/project-optimizer:gate2` |
| 7. 后端 | 🔒 锁定 | `/project-optimizer:backend` |
| 8. 集成 | 🔒 锁定 | `/project-optimizer:integration` |
| 9. 输出 | 🔒 锁定 | `/project-optimizer:output` |

## 🔍 研究阶段进度

必须完成以下所有研究类型：

- [ ] 📊 市场调研 - 目标用户、市场规模、竞争格局
- [ ] ⚙️ 技术研究 - 技术栈选择、可行性分析
- [ ] 👥 用户研究 - 用户痛点、需求分析
- [ ] ⚖️ 合规研究 - 法规政策、安全要求
- [ ] 💰 成本研究 - 开发成本、运营成本
- [ ] 🎯 竞品研究 - 竞品分析、差异化

## 📄 产出文档

完成流程后将生成：
- `docs/RESEARCH.md` - 研究报告
- `docs/PRD.md` - 产品需求文档
- `docs/ARCHITECTURE.md` - 架构设计
- `docs/API.md` - API 文档
- `docs/DATABASE.md` - 数据库设计

## ⚠️ 重要规则

1. **不能跳过阶段** - 必须按顺序完成
2. **Gate 审核** - Gate 不通过则返回上一阶段修改
3. **先规划后编码** - 研究和规划完成前不写任何代码
4. **原型先行** - 先做前端原型，用户确认后再开发后端

## 🛠 可用命令

### 流程命令
```bash
/project-optimizer:status      # 查看当前状态
/project-optimizer:research    # 研究阶段
/project-optimizer:planning    # 规划阶段
/project-optimizer:gate1       # Gate 1 审核
/project-optimizer:architecture # 架构阶段
/project-optimizer:prototype   # 原型阶段
/project-optimizer:gate2       # Gate 2 确认
/project-optimizer:backend     # 后端阶段
/project-optimizer:integration # 集成阶段
/project-optimizer:output      # 输出阶段
```

### 记忆命令
```bash
/project-optimizer:save        # 保存当前上下文到检查点
/project-optimizer:restore     # 恢复上次的上下文
/project-optimizer:history     # 查看会话历史和时间线
/project-optimizer:decision    # 记录关键决策
/project-optimizer:evolve      # 更新 CLAUDE.md 配置
```

### 高级命令
```bash
/project-optimizer:split-task  # 拆分复杂任务
/project-optimizer:agents      # 多 Agent 协作
/project-optimizer:context     # 上下文管理
```

## 🧠 关键决策记录

[决策将在项目进行中自动记录]

## 📝 上下文摘要

[上下文将在阶段完成时自动更新]
