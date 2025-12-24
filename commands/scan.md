---
description: Scan and analyze existing codebase for in-progress projects
---

# 代码扫描 (Code Scan)

扫描和分析已有项目，自动识别项目状态、完成度和工作模式。

## 使用场景

```
适用于:
✅ 接手已有项目，需要快速了解项目状态
✅ 离线工作后，重新进入项目
✅ 切换项目后，恢复上下文
✅ 确定项目的最佳工作模式（new/developing/maintenance）

不适用于:
❌ 全新项目（使用 /start --type new）
❌ 无 Git 历史的项目
```

## 命令格式

```bash
# 基础扫描
/project-optimizer:scan

# 扫描并自动启动工作流
/project-optimizer:scan --auto-start

# 扫描并生成详细报告
/project-optimizer:scan --detailed

# 仅扫描特定方面
/project-optimizer:scan --focus git        # 仅 Git 分析
/project-optimizer:scan --focus structure  # 仅结构分析
/project-optimizer:scan --focus completion # 仅完成度评估
```

---

## 扫描流程 (Scan Process)

### 阶段 1: Git 分析 (30秒)

```
📊 扫描 Git 历史...

✅ 分支检测
   - 当前分支: main
   - 总分支数: 3 (main, feature/auth, hotfix/bug-123)

✅ 提交历史
   - 总提交数: 247
   - 最近 30 天: 45 次提交
   - 提交频率: 1.5 次/天

✅ 贡献者活动
   - 活跃贡献者: 3 人
   - 最后提交: 2 天前
   - 主要开发者: @user (178 commits)

✅ 未提交变更
   - 修改: 3 个文件
   - 新增: 1 个文件
   - 删除: 0 个文件
```

### 阶段 2: 代码结构扫描 (45秒)

```
📂 扫描代码结构...

✅ 项目规模
   - 总文件数: 156
   - 总代码行: 12,450
   - 语言分布: TypeScript (85%), JavaScript (10%), JSON (5%)

✅ 目录结构
   src/
   ├── api/          (23 files, 3,200 lines)
   ├── components/   (45 files, 4,100 lines)
   ├── utils/        (12 files, 1,800 lines)
   ├── types/        (8 files, 600 lines)
   └── config/       (3 files, 150 lines)

   tests/
   ├── unit/         (28 files, 2,100 lines)
   └── integration/  (5 files, 800 lines)

✅ 依赖分析
   - 生产依赖: 15 个
   - 开发依赖: 22 个
   - 过时依赖: 3 个 (需更新)
```

### 阶段 3: 功能完成度评估 (60秒)

```
🎯 评估功能完成度...

✅ 核心功能扫描
   已实现:
   - ✅ 用户认证系统 (100%)
   - ✅ 用户管理 CRUD (100%)
   - ✅ 角色权限系统 (90%)

   进行中:
   - 🔄 数据导出功能 (60%)
   - 🔄 日志审计系统 (40%)

   计划中:
   - 📋 多语言支持 (0%)
   - 📋 高级搜索 (0%)

✅ 测试覆盖率
   - 单元测试: 72%
   - 集成测试: 45%
   - E2E 测试: 0%

✅ 技术债识别
   Critical (2):
   - 缺少错误处理 (src/api/*)
   - 硬编码配置 (src/config/app.ts)

   Important (5):
   - TODO 注释未完成 (8 处)
   - 重复代码块 (3 处)
   - 缺少类型定义 (utils/*.js)
   - 未使用的导入 (12 处)
   - 过大的函数 (>100 行, 4 个)
```

### 阶段 4: 约束识别 (30秒)

```
🔒 识别代码约束...

✅ API 接口分析
   公共 API 端点: 15 个
   → 需保持向后兼容

✅ 数据库 Schema
   表数量: 8 个
   → 变更需要迁移脚本

✅ 配置文件
   环境变量: 23 个
   → 不可删除现有变量

✅ 依赖锁定
   固定版本: react@18.2.0, express@4.18.0
   → 不可升级主版本
```

---

## 扫描结果 (Scan Results)

### 项目快照生成

```
📄 生成项目快照...

✅ 已创建: .claude/PROJECT_SNAPSHOT.json
   - 项目规模: 156 files, 12,450 lines
   - 完成度: 约 65%
   - Git 状态: 247 commits, 3 branches
   - 依赖: 37 packages

✅ 已创建: .claude/RESTRICTIONS.md
   - 文件级红线: 5 个
   - 模块级红线: 2 个
   - API 约束: 15 个端点
   - 依赖约束: 2 个固定版本
```

### 工作模式推荐

```
🎯 推荐工作模式分析...

项目特征:
- Git 历史: 247 commits (成熟项目)
- 代码规模: 12,450 lines (中型)
- 完成度: 65% (开发中)
- 最近活动: 2 天前 (活跃)
- 测试覆盖: 72% (良好)

┌─────────────────────────────────────────┐
│  推荐工作模式: 🔧 DEVELOPING           │
│                                         │
│  理由:                                  │
│  ✅ 项目有一定基础 (>100 commits)       │
│  ✅ 核心功能部分完成 (60-80%)           │
│  ✅ 活跃开发中 (近期有提交)             │
│  ✅ 有测试覆盖 (>50%)                   │
│                                         │
│  建议阶段: arch (架构审查)              │
│                                         │
│  替代方案:                              │
│  - maintenance: 如仅需修复 bug         │
│  - new: 如需大规模重构                  │
└─────────────────────────────────────────┘
```

### 下一步行动建议

```
📋 建议工作流...

基于扫描结果，推荐以下工作流:

1️⃣ 使用 developing 模式启动
   /project-optimizer:start --type developing

   将执行:
   - analyze: 详细架构分析 (30分钟)
   - update-plan: 更新开发计划 (20分钟)
   - gate1: 架构检查
   - continue-dev: 继续开发 (增量模式)
   - gate2: 质量检查
   - output: 交付

2️⃣ 立即处理技术债
   - 修复 2 个 Critical 问题
   - 完成 8 个 TODO 注释
   - 添加缺失的类型定义

3️⃣ 提升测试覆盖率
   - 单元测试: 72% → 80%
   - 集成测试: 45% → 60%
   - 添加 E2E 测试

4️⃣ 完成进行中的功能
   - 数据导出功能 (60% → 100%)
   - 日志审计系统 (40% → 100%)
```

---

## 自动启动模式

```bash
/project-optimizer:scan --auto-start
```

扫描完成后自动启动推荐的工作流，等同于:

```bash
# 1. 扫描
/project-optimizer:scan

# 2. 基于推荐自动执行
/project-optimizer:start --type developing --phase arch
```

---

## 详细报告模式

```bash
/project-optimizer:scan --detailed
```

生成完整的扫描报告: `docs/SCAN_REPORT.md`

```markdown
# 项目扫描报告

生成时间: 2025-12-24 13:00:00

## 执行摘要
- 项目名称: my-app
- 工作模式: developing
- 完成度: 65%
- 推荐阶段: arch

## 详细分析
### 1. Git 分析
[详细的 Git 历史分析...]

### 2. 代码结构
[详细的目录和文件分析...]

### 3. 功能完成度
[详细的功能清单和完成状态...]

### 4. 质量评估
[详细的代码质量指标...]

### 5. 技术债清单
[完整的技术债列表和优先级...]

## 行动计划
[具体的下一步行动建议...]
```

---

## 聚焦模式

### Git 聚焦

```bash
/project-optimizer:scan --focus git
```

仅分析 Git 历史，快速了解项目活跃度和贡献情况。

### 结构聚焦

```bash
/project-optimizer:scan --focus structure
```

仅分析代码结构，了解项目规模和组织方式。

### 完成度聚焦

```bash
/project-optimizer:scan --focus completion
```

仅评估功能完成度，了解项目进度。

---

## 扫描缓存

```
💡 扫描结果会缓存到 PROJECT_SNAPSHOT.json

重新扫描:
/project-optimizer:scan --force

查看上次扫描:
/project-optimizer:scan --show-cache

清除缓存:
/project-optimizer:scan --clear-cache
```

---

## 与其他命令集成

### 扫描 + 启动

```bash
# 推荐: 扫描后自动启动
/project-optimizer:scan --auto-start

# 等同于
/project-optimizer:scan
# [查看推荐]
/project-optimizer:start --type developing
```

### 扫描 + 恢复

```bash
# 恢复项目时先扫描
/project-optimizer:start --resume

# 内部会自动执行扫描
# 检测离线变更
# 更新 PROJECT_SNAPSHOT
# 推荐下一步行动
```

### 扫描 + Sprint

```bash
# 扫描后创建 Sprint
/project-optimizer:scan
/project-optimizer:sprint --create

# 基于扫描结果的任务清单创建 Sprint
```

---

## 扫描输出文件

```
.claude/
├── PROJECT_SNAPSHOT.json    # 项目快照（自动生成）
│   ├── codebaseAnalysis     # 代码统计
│   ├── functionalCompleteness # 完成度
│   ├── gitAnalysis          # Git 分析
│   └── recommendedWorkflow  # 推荐工作流
│
├── RESTRICTIONS.md          # 代码约束（自动生成）
│   ├── fileRedlines         # 文件级红线
│   ├── moduleRedlines       # 模块级红线
│   └── architectureRules    # 架构约束
│
└── docs/
    └── SCAN_REPORT.md       # 详细报告（--detailed）
```

---

## 工作模式决策树

```
扫描项目
    │
    ├─ Git commits < 10
    │  └─ 推荐: new (新项目)
    │
    ├─ Git commits 10-100
    │  ├─ 完成度 < 30%
    │  │  └─ 推荐: new (早期项目)
    │  │
    │  └─ 完成度 30-80%
    │     └─ 推荐: developing (开发中)
    │
    └─ Git commits > 100
       ├─ 最近 30 天提交 > 10
       │  ├─ 完成度 > 80%
       │  │  └─ 推荐: maintenance (维护)
       │  │
       │  └─ 完成度 50-80%
       │     └─ 推荐: developing (开发中)
       │
       └─ 最近 30 天提交 < 10
          └─ 推荐: maintenance (低频维护)
```

---

## 常见问题

### Q: 扫描需要多长时间？

A: 取决于项目规模
- 小型项目 (<1000 行): ~30秒
- 中型项目 (1000-10000 行): ~1-2分钟
- 大型项目 (>10000 行): ~3-5分钟

### Q: 扫描会修改代码吗？

A: **不会**。扫描是只读操作，仅生成分析文件：
- `.claude/PROJECT_SNAPSHOT.json`
- `.claude/RESTRICTIONS.md`
- `docs/SCAN_REPORT.md` (可选)

### Q: 多久应该重新扫描？

A: 建议场景：
- 每周一次 (定期更新快照)
- 重大功能完成后
- 离线工作后重新进入项目
- 团队成员切换后

### Q: 扫描不准确怎么办？

A: 可以手动调整：
1. 编辑 `.claude/PROJECT_SNAPSHOT.json`
2. 修正 `functionalCompleteness.estimatedCompletion`
3. 更新 `recommendedWorkflow`
4. 重新启动工作流

---

## 与 project-planner-pro 对比

| 特性 | project-planner-pro | /scan |
|------|---------------------|-------|
| 项目类型检测 | ✅ 三种模式 (new/developing/production) | ✅ 三种模式 + 自动推荐 |
| 代码扫描 | ❌ 手动配置 | ✅ 自动扫描 |
| Git 分析 | ⚠️ 基础分析 | ✅ 深度分析（提交频率、贡献者）|
| 约束识别 | ⚠️ 手动定义 redlines | ✅ 自动识别 + 手动补充 |
| 完成度评估 | ❌ 无 | ✅ 自动评估 + TODO 检测 |
| 技术债识别 | ❌ 无 | ✅ 自动识别 Critical/Important |
| 工作流推荐 | ⚠️ 基于类型 | ✅ 基于扫描结果动态推荐 |

---

*此命令对应 project-planner-pro 的 analyze 阶段*
*参考: docs/V1.0.7_UPGRADE_PLAN.md*
