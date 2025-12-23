---
description: Output phase - generate all deliverables and CLAUDE.md
---

# 输出阶段 (Phase 9/9)

## 前置检查

读取 `.claude/PROJECT_STATE.json` 确认：
1. 集成阶段 (`integration`) 已完成
2. 当前阶段为 `output`

## 输出产物生成

### 📄 1. 生成 CLAUDE.md

基于项目实际情况生成最终的 `CLAUDE.md`：

```markdown
# [项目名称]

> 项目阶段：✅ 已完成规划流程

## 📋 项目概述

[从 PRD 中提取的产品描述]

## 🛠 技术栈

[从架构文档中提取]
- 前端: [技术选型]
- 后端: [技术选型]
- 数据库: [技术选型]
- 部署: [技术选型]

## ⚡ 常用命令

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建项目
npm run test         # 运行测试
npm run lint         # 代码检查

# 数据库
npm run db:migrate   # 运行迁移
npm run db:seed      # 填充数据
```

## 📁 项目结构

[从架构文档中提取项目结构]

## ✅ 代码规范

[从项目实际情况总结]

### 必须遵守
- [规范1]
- [规范2]

### 禁止事项
- ❌ [禁止项1]
- ❌ [禁止项2]

## 📚 相关文档

- `docs/RESEARCH.md` - 研究报告
- `docs/PRD.md` - 产品需求文档
- `docs/ARCHITECTURE.md` - 架构设计
- `docs/API.md` - API 文档
- `docs/DATABASE.md` - 数据库设计
- `docs/GATE1_REVIEW.md` - 规划审核报告
- `docs/GATE2_REVIEW.md` - 原型确认报告

## 🔄 开发工作流

### 新功能开发
1. 创建分支
2. 实现功能
3. 编写测试
4. 代码审查
5. 合并主分支

### 完成任务后
1. 运行 lint
2. 运行测试
3. 提交代码
```

---

### 📋 2. 生成文档清单

确保所有文档已生成：

| 文档 | 路径 | 状态 |
|------|------|------|
| 研究报告 | docs/RESEARCH.md | ⬜ |
| 产品需求文档 | docs/PRD.md | ⬜ |
| 架构设计 | docs/ARCHITECTURE.md | ⬜ |
| API 文档 | docs/API.md | ⬜ |
| 数据库设计 | docs/DATABASE.md | ⬜ |
| Gate 1 报告 | docs/GATE1_REVIEW.md | ⬜ |
| Gate 2 报告 | docs/GATE2_REVIEW.md | ⬜ |

---

### 🚀 3. 部署配置

生成部署相关配置：

```markdown
## 部署配置清单

### 环境变量模板
创建 `.env.example`：
- [ ] 数据库连接
- [ ] JWT 密钥
- [ ] 第三方 API 密钥
- [ ] 其他配置

### Docker 配置（可选）
- [ ] Dockerfile
- [ ] docker-compose.yml
- [ ] .dockerignore

### CI/CD 配置
- [ ] GitHub Actions / GitLab CI
- [ ] 部署脚本
```

---

### 📊 4. 项目总结

生成 `docs/PROJECT_SUMMARY.md`：

```markdown
# 项目总结

## 完成日期
[日期]

## 完成阶段
1. ✓ 研究阶段 - [完成日期]
2. ✓ 规划阶段 - [完成日期]
3. ✓ Gate 1 - [完成日期]
4. ✓ 架构阶段 - [完成日期]
5. ✓ 原型阶段 - [完成日期]
6. ✓ Gate 2 - [完成日期]
7. ✓ 后端阶段 - [完成日期]
8. ✓ 集成阶段 - [完成日期]
9. ✓ 输出阶段 - [完成日期]

## 产出物清单
- CLAUDE.md
- docs/RESEARCH.md
- docs/PRD.md
- docs/ARCHITECTURE.md
- docs/API.md
- docs/DATABASE.md
- 前端代码
- 后端代码
- 测试代码

## 经验教训
[记录开发过程中的发现和教训]

## 后续计划
[未来迭代计划]
```

---

## 阶段完成

更新 `PROJECT_STATE.json`:
```json
{
  "projectType": "new",
  "status": "completed",
  "completedAt": "[timestamp]",
  "phases": {
    "research": { "status": "completed" },
    "planning": { "status": "completed" },
    "gate1": { "status": "completed" },
    "architecture": { "status": "completed" },
    "prototype": { "status": "completed" },
    "gate2": { "status": "completed" },
    "backend": { "status": "completed" },
    "integration": { "status": "completed" },
    "output": { "status": "completed" }
  }
}
```

输出：
```
🎉 项目规划流程全部完成！

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 研究 → ✓ 规划 → ✓ Gate1 → ✓ 架构 → ✓ 原型 → ✓ Gate2 → ✓ 后端 → ✓ 集成 → ✓ 输出
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 生成的产出物：
✓ CLAUDE.md - 项目配置文件
✓ docs/RESEARCH.md - 研究报告
✓ docs/PRD.md - 产品需求文档
✓ docs/ARCHITECTURE.md - 架构设计
✓ docs/API.md - API 文档
✓ docs/DATABASE.md - 数据库设计
✓ docs/PROJECT_SUMMARY.md - 项目总结

🚀 项目已准备就绪，可以正式开始迭代开发！

后续开发建议：
1. 继续使用 /project-optimizer:plan 规划新功能
2. 使用 /project-optimizer:review 进行代码审查
3. 使用 /project-optimizer:checkpoint 保存进度
```
