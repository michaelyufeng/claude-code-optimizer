---
description: Upgrade project mode from quick to standard or full
---

# 模式升级

从当前模式升级到更高级模式，不删除现有内容。

## 命令用法

```bash
/project-optimizer:upgrade              # 交互式选择升级目标
/project-optimizer:upgrade standard     # 升级到标准模式
/project-optimizer:upgrade full         # 升级到完整模式
```

---

## 升级流程

### 第一步：检测当前模式

读取 CLAUDE.md 中的模式标记：

```markdown
<!-- ⚡ 快速模式 -->     → 当前是快速模式
<!-- 📋 标准模式 -->     → 当前是标准模式
<!-- 🏗️ 完整模式 -->     → 已是最高级，无需升级
```

### 第二步：显示升级选项

```
⬆️ 模式升级

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

当前模式: ⚡ 快速模式
CLAUDE.md: 52 行

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

可升级到：

[1] 📋 标准模式
    新增功能：
    + /plan 任务规划
    + /assess 配置评估
    + 扩展 CLAUDE.md (~100行)
    + .claude/settings.json

    Token 变化: +200/次

[2] 🏗️ 完整模式
    新增功能：
    + 完整阶段流程 (可选)
    + Gate 门禁 (可选)
    + 所有高级命令
    + docs/DISCOVERIES.md

    Token 变化: +500/次

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

选择升级目标: [1/2]
```

---

## 升级内容

### 快速 → 标准

**新增文件**：
```
+ .claude/settings.json
+ .claude/commands/plan.md
+ .claude/commands/assess.md
```

**CLAUDE.md 变更**：
```markdown
# 新增章节

+ ## 项目结构
+ ## Git 规范
+ ## 规则分层 (MUST/SHOULD/PREFER)

# 更新标记
- <!-- ⚡ 快速模式 -->
+ <!-- 📋 标准模式 -->
```

### 快速/标准 → 完整

**新增文件**：
```
+ .claude/PROJECT_STATE.json
+ .claude/commands/ (所有阶段命令)
+ docs/DISCOVERIES.md
```

**CLAUDE.md 变更**：
```markdown
# 新增章节

+ ## 项目状态 (阶段追踪)
+ ## 阶段规划
+ ## 关键决策
+ ## 变更记录

# 更新标记
- <!-- 📋 标准模式 -->
+ <!-- 🏗️ 完整模式 -->
```

---

## 升级确认

```
⬆️ 升级确认

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

升级: ⚡ 快速模式 → 📋 标准模式

将执行的操作：

[1] 📝 扩展 CLAUDE.md
    + 添加项目结构章节
    + 添加规则分层章节
    + 更新模式标记

[2] 📁 创建新文件
    + .claude/settings.json
    + .claude/commands/plan.md
    + .claude/commands/assess.md

[3] ⚙️ 更新配置
    + 启用标准模式功能

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ 注意：
• 现有内容将被保留
• 新内容将追加到合适位置
• 建议先提交当前更改

确认升级？ [Y/n]
```

---

## 升级完成

```
✅ 升级完成！

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ 快速模式 → 📋 标准模式

📁 新增文件：
   ✓ .claude/settings.json
   ✓ .claude/commands/plan.md
   ✓ .claude/commands/assess.md

📝 CLAUDE.md 更新：
   ✓ 添加项目结构章节
   ✓ 添加规则分层章节
   ✓ 52行 → 98行

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 新增命令：
   /project-optimizer:plan    - 任务规划
   /project-optimizer:assess  - 配置评估

💡 建议：
   运行 /plan 规划你的下一个任务
```

---

## 降级说明

**不支持自动降级**，但可以手动：

1. 删除不需要的 `.claude/commands/` 文件
2. 精简 CLAUDE.md 内容
3. 更新模式标记

```bash
# 如果想回到快速模式
# 手动编辑 CLAUDE.md，删除不需要的章节
# 更新底部标记为: <!-- ⚡ 快速模式 -->
```
