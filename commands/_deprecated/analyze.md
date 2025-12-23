---
description: Analyze existing codebase for developing projects
---

# 分析现状 (开发中项目 - Phase 1/5)

## 适用场景

项目已有代码框架，需要分析现状后继续开发。

## 前置检查

确认 `PROJECT_STATE.json` 中 `projectType` 为 `developing`。

## 分析任务

### 📁 1. 项目结构分析

```markdown
## 项目结构

### 目录结构
[自动扫描并展示目录树]

### 主要模块
| 模块 | 路径 | 文件数 | 行数 | 说明 |
|------|------|--------|------|------|
| | | | | |

### 入口文件
- 前端入口: [path]
- 后端入口: [path]
- 配置文件: [list]
```

### 🔧 2. 技术栈识别

```markdown
## 技术栈分析

### 依赖分析
从 package.json / requirements.txt 等提取：

**运行时**
- [runtime]: [version]

**框架**
- [framework]: [version]

**主要依赖**
| 依赖 | 版本 | 用途 | 是否过时 |
|------|------|------|----------|
| | | | |

### 配置文件
- tsconfig.json: [发现的配置]
- .eslintrc: [发现的配置]
- [其他配置文件]
```

### 📊 3. 代码质量评估

```markdown
## 代码质量

### 代码统计
- 总文件数: X
- 总代码行数: X
- 测试覆盖率: X% (如有)

### 代码规范
- [ ] 使用 TypeScript
- [ ] 有 ESLint 配置
- [ ] 有 Prettier 配置
- [ ] 有 Git hooks

### 潜在问题
| 问题类型 | 数量 | 严重程度 | 示例 |
|----------|------|----------|------|
| TODO/FIXME | | | |
| console.log | | | |
| any 类型 | | | |
| 未使用导入 | | | |
```

### 🔍 4. 功能完成度

```markdown
## 功能完成度

### 已完成功能
- [x] [功能1]
- [x] [功能2]

### 部分完成
- [ ] [功能3] - 完成度 60%
- [ ] [功能4] - 完成度 30%

### 未开始
- [ ] [功能5]
- [ ] [功能6]

### 功能地图
[根据代码分析生成功能与文件的映射]
```

### 🐛 5. 已知问题

```markdown
## 已知问题

### 从代码中发现
| ID | 问题 | 位置 | 严重程度 |
|----|------|------|----------|
| | | | |

### 从 TODO/FIXME 中发现
| ID | 内容 | 位置 |
|----|------|------|
| | | |

### 从 Git Issues 中发现 (如有)
| ID | 标题 | 状态 |
|----|------|------|
| | | |
```

---

## 输出产物

生成 `docs/ANALYSIS.md` 包含所有分析结果。

更新 `PROJECT_STATE.json`:
```json
{
  "projectType": "developing",
  "currentPhase": 2,
  "phases": {
    "analyze": { "status": "completed", "completedAt": "[timestamp]" },
    "update-plan": { "status": "in_progress" }
  },
  "analysis": {
    "totalFiles": X,
    "totalLines": X,
    "techStack": {},
    "completedFeatures": [],
    "pendingFeatures": [],
    "issues": []
  }
}
```

输出：
```
✅ 现状分析完成！

📊 分析摘要：
- 总文件数: X
- 代码行数: X
- 已完成功能: X 个
- 待完成功能: X 个
- 发现问题: X 个

📄 详细报告: docs/ANALYSIS.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 开发中项目流程:
✓ 分析 → 📋 更新计划 → 🚧 Gate → 💻 继续开发 → 📦 输出
           ↑
         下一步
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

下一步：运行 /project-optimizer:update-plan 更新开发计划
```
