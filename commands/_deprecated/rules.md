---
description: Manage CLAUDE.md rules with enforcement levels and smart conflict detection
---

# 规则管理 (Rules System)

## 功能说明

管理 CLAUDE.md 中的设计规则、技术约束和项目规范，支持规则分层和智能冲突检测。

## 规则分层

### 规则级别

```markdown
## 规则分类

### 🔴 MUST (硬性规则)
- 安全规则、合规要求
- 不询问，直接执行
- 违反时阻止并警告

### 🟡 SHOULD (软性规则)
- 设计规范、代码风格
- 变更时询问用户
- 可以被用户覆盖

### 🟢 PREFER (偏好规则)
- 个人偏好、优化建议
- 可自动调整
- 低优先级
```

---

## 规则检测流程

### 任务开始时

```markdown
## 规则检测

当用户提出任务时，自动检测可能涉及的规则：

1. **解析任务意图**
   - 识别任务类型（设计/开发/修复）
   - 识别影响范围（前端/后端/全栈）

2. **匹配相关规则**
   - 从 CLAUDE.md 提取相关规则
   - 识别规则级别

3. **冲突检测**
   - 检查任务是否与现有规则冲突
   - 分类冲突严重程度

4. **决定行动**
   - MUST 规则：直接遵守
   - SHOULD 规则：询问用户
   - PREFER 规则：智能处理
```

### 冲突处理示例

```
用户: 重新设计前端页面

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 检测到相关设计规则
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 MUST (将强制遵守):
- 无障碍标准 WCAG AA
- 响应式设计 (移动优先)

🟡 SHOULD (需要确认):
- 配色方案: 深色主题 (黑色为主)
- 字体: Inter / Noto Sans SC
- 设计风格: 极简主义

🟢 PREFER (可灵活调整):
- 动画时长: 200-300ms
- 圆角: 8px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

请选择设计范围：

[1] 🔄 在现有规则内重新设计
    → 保持深色主题和极简风格

[2] 🎨 修改部分规则后重新设计
    → 告诉我你想调整哪些规则

[3] 🆕 完全重新定义设计规则
    → 我会引导你重新设定设计规范

[4] 📋 查看当前所有规则详情
```

---

## 规则定义格式

### CLAUDE.md 中的规则格式

```markdown
## 🎨 设计规则

### 配色方案 [SHOULD]
- 主题: 深色
- 主色: #1a1a1a
- 强调色: #3B82F6
- 说明: 品牌统一性，可根据用户需求调整

### 无障碍标准 [MUST]
- 标准: WCAG AA
- 对比度: 最低 4.5:1
- 说明: 法规要求，不可违反

### 动画效果 [PREFER]
- 时长: 200-300ms
- 缓动: ease-out
- 说明: 用户体验优化，可根据场景调整
```

### 规则 JSON 格式

`.claude/PROJECT_MEMORY/rules.json`:

```json
{
  "rules": [
    {
      "id": "design-color-scheme",
      "name": "配色方案",
      "category": "design",
      "level": "SHOULD",
      "value": {
        "theme": "dark",
        "primary": "#1a1a1a",
        "accent": "#3B82F6"
      },
      "description": "深色主题，黑色为主",
      "reason": "品牌统一性",
      "canOverride": true,
      "overrideHistory": []
    },
    {
      "id": "accessibility-wcag",
      "name": "无障碍标准",
      "category": "accessibility",
      "level": "MUST",
      "value": {
        "standard": "WCAG AA",
        "minContrast": 4.5
      },
      "description": "符合 WCAG AA 标准",
      "reason": "法规要求",
      "canOverride": false
    }
  ]
}
```

---

## 规则管理命令

### 查看规则

```
/project-optimizer:rules

📋 项目规则概览

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 MUST 规则 (3)
├── 无障碍标准: WCAG AA
├── 安全规则: XSS/CSRF 防护
└── 响应式: 移动优先

🟡 SHOULD 规则 (5)
├── 配色方案: 深色主题
├── 字体: Inter / Noto Sans SC
├── 设计风格: 极简主义
├── 代码风格: TypeScript 严格模式
└── 命名规范: kebab-case

🟢 PREFER 规则 (3)
├── 动画时长: 200-300ms
├── 圆角: 8px
└── 间距网格: 8px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

使用 /project-optimizer:rules --show [id] 查看详情
使用 /project-optimizer:rules --edit [id] 修改规则
```

### 修改规则

```
/project-optimizer:rules --edit design-color-scheme

📝 修改规则: 配色方案

当前值:
- 主题: dark
- 主色: #1a1a1a
- 强调色: #3B82F6

请输入新值 (或输入 'keep' 保持不变):

主题 [dark]: > light
主色 [#1a1a1a]: > #ffffff
强调色 [#3B82F6]: > keep

确认修改？
[1] ✅ 确认并更新 CLAUDE.md
[2] 📝 继续编辑
[3] ❌ 取消
```

### 添加规则

```
/project-optimizer:rules --add

➕ 添加新规则

1. 规则名称: > 按钮样式
2. 规则类别:
   [1] design
   [2] code
   [3] accessibility
   [4] security
   > 1

3. 规则级别:
   [1] 🔴 MUST - 强制执行
   [2] 🟡 SHOULD - 询问后执行
   [3] 🟢 PREFER - 灵活处理
   > 2

4. 规则内容: > 圆角按钮，渐变背景

5. 规则原因: > 品牌一致性

✅ 规则已添加！
```

---

## 规则冲突记录

### 记录用户覆盖

当用户选择覆盖 SHOULD 规则时，记录决策：

```json
{
  "ruleId": "design-color-scheme",
  "overrideHistory": [
    {
      "timestamp": "2024-12-15T10:30:00Z",
      "previousValue": { "theme": "dark" },
      "newValue": { "theme": "light" },
      "reason": "用户要求改为浅色主题",
      "task": "重新设计登录页面"
    }
  ]
}
```

### 查看覆盖历史

```
/project-optimizer:rules --history design-color-scheme

📋 规则变更历史: 配色方案

| 时间 | 变更 | 原因 | 任务 |
|------|------|------|------|
| 12-15 10:30 | dark → light | 用户要求 | 重设计登录页 |
| 12-10 14:00 | 初始设置 | 项目初始化 | - |

当前值: light 主题
```

---

## 智能规则建议

### 基于项目类型

```markdown
## 规则建议

根据项目类型自动建议规则：

### 企业应用
🔴 MUST: 无障碍、安全、数据保护
🟡 SHOULD: 品牌规范、UI一致性
🟢 PREFER: 性能优化

### 个人项目
🔴 MUST: 基础安全
🟡 SHOULD: 代码质量
🟢 PREFER: 风格偏好

### MVP 原型
🔴 MUST: 核心安全
🟡 SHOULD: 快速迭代
🟢 PREFER: 可选功能
```

---

## 输出格式

### 规则检测提示

```
💡 规则提示

检测到你的请求可能涉及以下规则：

🟡 配色方案 [SHOULD]
   当前: 深色主题

   你可以：
   [A] 保持现有规则
   [B] 本次任务临时覆盖
   [C] 永久修改规则

选择 (A/B/C):
```

### 规则遵守报告

```
✅ 任务完成！

📋 规则遵守情况：
- 🔴 MUST 规则: 3/3 遵守
- 🟡 SHOULD 规则: 4/5 遵守
  - ⚠️ 配色方案: 用户覆盖 (dark → light)
- 🟢 PREFER 规则: 3/3 遵守

💾 已记录规则覆盖到决策历史
```
