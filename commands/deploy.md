---
description: Deployment phase - CI/CD, release, and documentation
---

# 部署阶段 (Phase 6/6)

部署配置、发布准备、文档完善。

## 前置检查

读取 `.claude/PROJECT_STATE.json` 确认：
1. 测试阶段 (`test`) 已完成
2. Gate 3 已通过
3. 当前阶段为 `deploy`

**如果未通过 Gate 3，拒绝执行：**
```
🚫 无法进入部署阶段

Gate 3 检查未通过。请先完成测试阶段并通过 Gate 3。

运行 /project-optimizer:gate 查看 Gate 3 检查清单
```

---

## Agent 配置

```
🚀 部署阶段 Agent 配置

## 主要 Agent
🚀 运维 (DevOps)
- 模型: Sonnet
- 职责: 部署配置、CI/CD、发布管理

## 辅助 Agent
💻 开发者 (Developer)
- 模型: Sonnet
- 职责: 修复部署问题、文档编写
```

---

## 部署任务

### 📦 1. 部署配置

```markdown
## 部署配置清单

### 环境变量
- [ ] 创建 .env.example 模板
- [ ] 配置开发环境变量
- [ ] 配置生产环境变量
- [ ] 敏感信息安全存储

### Docker 配置 (可选)
- [ ] 创建 Dockerfile
- [ ] 创建 docker-compose.yml
- [ ] 创建 .dockerignore
- [ ] 多阶段构建优化

### 云服务配置
- [ ] 选择部署平台
- [ ] 配置资源规格
- [ ] 配置网络/域名
- [ ] 配置 SSL 证书
```

### 🔄 2. CI/CD 配置

```markdown
## CI/CD 配置清单

### 持续集成
- [ ] 配置 GitHub Actions / GitLab CI
- [ ] 自动化测试流程
- [ ] 代码质量检查
- [ ] 安全扫描

### 持续部署
- [ ] 配置自动部署
- [ ] 环境区分 (dev/staging/prod)
- [ ] 回滚机制
- [ ] 部署通知

### 示例工作流 (GitHub Actions)
```yaml
name: CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: echo "Deploy to production"
```
```

### 📊 3. 监控配置

```markdown
## 监控配置清单

### 应用监控
- [ ] 错误追踪 (Sentry/Bugsnag)
- [ ] 性能监控 (APM)
- [ ] 日志收集 (ELK/CloudWatch)

### 基础设施监控
- [ ] 服务器资源监控
- [ ] 数据库监控
- [ ] 告警规则配置

### 业务监控
- [ ] 核心指标埋点
- [ ] 用户行为分析
- [ ] 仪表板配置
```

### 📄 4. 文档完善

```markdown
## 文档清单

### README.md
- [ ] 项目介绍
- [ ] 快速开始
- [ ] 安装说明
- [ ] 使用示例
- [ ] API 文档链接

### 技术文档
- [ ] 架构说明 (docs/ARCHITECTURE.md)
- [ ] API 文档 (docs/API.md)
- [ ] 数据库设计 (docs/DATABASE.md)
- [ ] 部署指南 (docs/DEPLOYMENT.md)

### 开发文档
- [ ] 贡献指南 (CONTRIBUTING.md)
- [ ] 开发环境搭建
- [ ] 代码规范说明
- [ ] 测试说明

### 更新日志
- [ ] CHANGELOG.md
- [ ] 版本历史
- [ ] 变更说明
```

### 🚀 5. 发布准备

```markdown
## 发布检查清单

### 代码检查
- [ ] 所有测试通过
- [ ] 代码审查完成
- [ ] 版本号更新
- [ ] 依赖版本锁定

### 配置检查
- [ ] 环境变量配置正确
- [ ] 数据库迁移准备
- [ ] 缓存清理策略
- [ ] 回滚计划准备

### 发布流程
- [ ] 创建 Release Tag
- [ ] 编写 Release Notes
- [ ] 通知相关人员
- [ ] 监控发布状态
```

---

## 部署执行流程

### Step 1: 环境准备

```
🚀 [运维] 准备部署环境

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

检测项目类型: [项目类型]
推荐部署方式: [部署方式]

请选择部署平台:
[1] Vercel (推荐用于 Next.js)
[2] Netlify (推荐用于静态站点)
[3] Railway / Render (推荐用于全栈)
[4] AWS / GCP / Azure
[5] 自托管服务器
[6] Docker 容器

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 2: 配置生成

```
🚀 [运维] 生成部署配置

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

已生成配置文件:
✓ .env.example
✓ Dockerfile
✓ docker-compose.yml
✓ .github/workflows/ci.yml

请确认配置是否正确:
[1] ✅ 确认，继续
[2] 🔧 修改配置
[3] 📋 查看配置详情

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 3: 文档生成

```
📄 [运维] 生成项目文档

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

生成文档清单:
✓ README.md (项目说明)
✓ docs/DEPLOYMENT.md (部署指南)
✓ docs/API.md (API 文档)
✓ CHANGELOG.md (更新日志)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] 📋 预览生成的文档
[2] ✅ 确认，继续
[3] ✏️ 手动编辑
```

### Step 4: 发布

```
🚀 [运维] 执行发布

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

发布版本: v1.0.0
发布方式: [发布方式]

## 发布检查

| 检查项 | 状态 |
|--------|------|
| 测试全部通过 | ✅ |
| 代码审查完成 | ✅ |
| 文档已更新 | ✅ |
| 环境变量已配置 | ✅ |

确认发布?
[1] ✅ 确认发布
[2] ⏳ 稍后发布
[3] ❌ 取消

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 部署完成标准

| 检查项 | 状态 |
|--------|------|
| 环境变量配置完成 | ⬜ |
| CI/CD 配置完成 | ⬜ |
| 监控配置完成 | ⬜ |
| 文档完善 | ⬜ |
| 部署验证通过 | ⬜ |

---

## 项目完成

更新 `PROJECT_STATE.json`:
```json
{
  "autopilot": {
    "enabled": false,
    "currentPhase": "completed",
    "phaseProgress": 100,
    "completedAt": "[timestamp]"
  },
  "phases": {
    "research": { "status": "completed", "gate": "passed" },
    "plan": { "status": "completed", "gate": "passed" },
    "arch": { "status": "completed", "gate": "passed" },
    "dev": { "status": "completed", "gate": "passed" },
    "test": { "status": "completed", "gate": "passed" },
    "deploy": { "status": "completed", "gate": "passed" }
  }
}
```

更新 `CLAUDE.md` Memory 区域:
```markdown
### [日期] - 项目完成 v1.0.0
- **完成**: 6 阶段开发流程全部完成
- **产出**: [产出物列表]
- **部署**: [部署地址]
```

生成 `docs/PROJECT_SUMMARY.md`:
```markdown
# 项目总结

## 完成日期
[日期]

## 阶段完成记录
1. ✓ 研究阶段 - [日期]
2. ✓ 规划阶段 - [日期]
3. ✓ 架构阶段 - [日期]
4. ✓ 开发阶段 - [日期]
5. ✓ 测试阶段 - [日期]
6. ✓ 部署阶段 - [日期]

## 产出物清单
- CLAUDE.md
- docs/RESEARCH.md
- docs/PRD.md
- docs/ARCHITECTURE.md
- docs/API.md
- docs/DATABASE.md
- docs/DEPLOYMENT.md
- 源代码
- 测试代码

## 后续计划
[迭代计划]
```

输出：
```
🎉 项目开发流程全部完成！

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✅ 研究] → [✅ 规划] → [✅ 架构] → [✅ 开发] → [✅ 测试] → [✅ 部署]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 项目产出:

文档:
✓ docs/RESEARCH.md - 研究报告
✓ docs/PRD.md - 产品需求文档
✓ docs/ARCHITECTURE.md - 架构设计
✓ docs/API.md - API 文档
✓ docs/DATABASE.md - 数据库设计
✓ docs/DEPLOYMENT.md - 部署指南
✓ docs/PROJECT_SUMMARY.md - 项目总结

代码:
✓ 源代码
✓ 测试代码
✓ CI/CD 配置

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 项目已准备就绪！

后续建议:
1. 使用 /project-optimizer:start --resume 继续迭代
2. 使用 /project-optimizer:diary 记录新功能计划
3. 使用 /project-optimizer:reflect 归档项目经验
```

---

## 注意事项

1. **环境安全** - 敏感信息不要提交到代码库
2. **回滚机制** - 确保有快速回滚的能力
3. **监控告警** - 发布后密切关注监控数据
4. **文档维护** - 保持文档与代码同步更新
