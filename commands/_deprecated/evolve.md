---
description: Evolve and update CLAUDE.md as project progresses
---

# 配置演进 (Memory System)

## 功能说明

随着项目进展，自动更新 CLAUDE.md 配置文件，确保配置与项目当前状态同步。

**核心理念**: CLAUDE.md 是一个**活文档**，应该随项目演进持续优化，而不是一次性配置。

## 命令用法

```bash
/project-optimizer:evolve                    # 自动检测并更新
/project-optimizer:evolve --check            # 检查是否需要更新（不修改）
/project-optimizer:evolve --section tech     # 只更新技术栈章节
/project-optimizer:evolve --full             # 完整重新生成
/project-optimizer:evolve --preview          # 预览变更不应用
/project-optimizer:evolve --sync-tag         # 更新审查标签
```

---

## 与审查标签系统集成

### 识别已审查的 CLAUDE.md

演进前会检查审查标签：

```
🔍 检测 CLAUDE.md 状态...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 审查标签信息:
   状态: ✅ 已认证
   评分: 85/100
   上次审查: 2024-12-20
   天数: 3 天前

📊 变更检测:
   CLAUDE.md: 未修改
   代码库: +15 文件, -3 文件, ~28 文件

💡 建议:
   代码库有变更，建议更新 CLAUDE.md 以保持同步

操作选项:
[1] 🔄 智能更新 - 根据代码变更更新相关章节
[2] 📊 重新评估 - 运行完整质量评估
[3] ⏭️ 跳过 - 当前配置仍然有效
```

### 更新审查标签

演进完成后自动更新标签：

```markdown
<!-- Claude Code Optimizer 审查记录 -->
<!--
  评估时间: 2024-12-23
  评估版本: 1.0.1
  综合评分: 88/100 (↑3)
  评级: ⭐⭐⭐⭐ 优秀
  状态: ✅ 已认证
  演进次数: 3
  上次演进: 2024-12-23 - 添加新模块结构
  下次审查: 当项目有重大变更时运行 /project-optimizer:evolve
-->
```

---

## 演进机制

### 配置版本化

```markdown
## CLAUDE.md 版本追踪

每次演进都会：
1. 备份当前版本
2. 更新配置内容
3. 记录变更历史
4. 保持向后兼容
```

### 版本存储

`.claude/PROJECT_MEMORY/claude_versions/`:

```
claude_versions/
├── CLAUDE.md.v1        # 初始版本
├── CLAUDE.md.v2        # 研究完成后
├── CLAUDE.md.v3        # 规划完成后
├── CLAUDE.md.v4        # 架构完成后 (当前)
└── versions.json       # 版本元信息
```

---

## 演进触发

### 自动触发

```markdown
## 自动演进触发条件

1. **阶段完成时**
   - 研究完成 → 添加技术栈信息
   - 规划完成 → 添加功能清单
   - 架构完成 → 添加架构约束
   - 原型完成 → 添加设计规范

2. **Gate 通过时**
   - Gate1 → 确认 PRD 内容
   - Gate2 → 确认原型规范

3. **关键决策时**
   - 技术选型确定 → 更新技术栈
   - 架构确定 → 更新约束规则

4. **文件结构变化时**
   - 新建目录 → 更新项目结构
   - 添加配置文件 → 更新配置说明
```

### 手动触发

```bash
/project-optimizer:evolve                    # 自动检测并更新
/project-optimizer:evolve --section tech     # 只更新技术栈
/project-optimizer:evolve --full             # 完整重新生成
/project-optimizer:evolve --preview          # 预览变更不应用
```

---

## 演进内容

### 研究阶段完成后

```markdown
## 研究阶段演进

### 添加的内容

1. **技术栈确认**
```markdown
## 技术栈

- 语言: TypeScript
- 框架: Hono
- ORM: Drizzle
- 数据库: PostgreSQL
- 部署: Cloudflare Workers
```

2. **约束规则**
```markdown
## 技术约束

- 必须使用 TypeScript 严格模式
- 优先使用函数式编程风格
- 遵循 Hono 最佳实践
```

3. **参考资料**
```markdown
## 参考资料

- Hono 文档: https://hono.dev
- Drizzle 文档: https://orm.drizzle.team
```
```

### 规划阶段完成后

```markdown
## 规划阶段演进

### 添加的内容

1. **功能清单**
```markdown
## 核心功能

### MVP 范围
- [ ] 用户注册登录
- [ ] 个人资料管理
- [ ] 核心业务功能

### 后续版本
- [ ] 社交功能
- [ ] 通知系统
```

2. **优先级指南**
```markdown
## 开发优先级

P0 - 必须完成: 核心功能
P1 - 应该完成: 用户体验优化
P2 - 可以延后: 增强功能
```
```

### 架构阶段完成后

```markdown
## 架构阶段演进

### 添加的内容

1. **架构约束**
```markdown
## 架构规则

### 代码组织
```
src/
├── routes/       # API 路由
├── services/     # 业务逻辑
├── models/       # 数据模型
├── middleware/   # 中间件
└── utils/        # 工具函数
```

### 命名规范
- 路由文件: kebab-case
- 服务文件: camelCase
- 模型文件: PascalCase
```

2. **API 规范**
```markdown
## API 规范

- RESTful 风格
- 统一错误响应格式
- 分页使用 cursor
```

3. **安全规则**
```markdown
## 安全规则

- 所有接口需要认证 (除登录注册)
- 使用 JWT 进行认证
- 敏感数据加密存储
```
```

### 原型阶段完成后

```markdown
## 原型阶段演进

### 添加的内容

1. **设计规范**
```markdown
## UI/UX 规范

### 颜色
- 主色: #3B82F6
- 辅助色: #10B981
- 背景: #F9FAFB

### 组件库
- 使用 Tailwind CSS
- 组件遵循设计系统
```

2. **交互规范**
```markdown
## 交互规范

- 按钮点击反馈 < 100ms
- 页面加载 < 3s
- 错误提示清晰友好
```
```

---

## 演进预览

### 预览命令

```
/project-optimizer:evolve --preview

📋 CLAUDE.md 演进预览

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

当前版本: v3
目标版本: v4
触发原因: 架构阶段完成

### 将添加的内容

+ ## 架构规则
+
+ ### 代码组织
+ src/
+ ├── routes/       # API 路由
+ ├── services/     # 业务逻辑
+ ...

+ ## API 规范
+
+ - RESTful 风格
+ - 统一错误响应格式
+ ...

+ ## 安全规则
+
+ - 所有接口需要认证
+ - 使用 JWT 进行认证
+ ...

### 将修改的内容

~ ## 项目状态
~
~ 当前阶段: 规划阶段 (2/9)  →  架构阶段 (4/9)
~ 阶段进度: 100%  →  0%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

应用这些变更？
[1] ✅ 应用变更
[2] 📝 修改后应用
[3] ❌ 取消
```

---

## 演进历史

### 查看历史

```
/project-optimizer:evolve --history

📋 CLAUDE.md 演进历史

| 版本 | 日期 | 触发 | 变更摘要 |
|------|------|------|----------|
| v4 | 12-15 14:30 | 架构完成 | +架构规则, +API规范, +安全规则 |
| v3 | 12-15 12:00 | 规划完成 | +功能清单, +优先级指南 |
| v2 | 12-14 18:00 | 研究完成 | +技术栈, +约束规则 |
| v1 | 12-14 10:00 | 初始化 | 初始模板 |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

查看特定版本: /project-optimizer:evolve --show v2
比较版本: /project-optimizer:evolve --diff v2 v4
恢复版本: /project-optimizer:evolve --restore v2
```

### 版本比较

```
/project-optimizer:evolve --diff v2 v4

📋 版本比较: v2 → v4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 添加的内容 (+)

+ ## 核心功能 (v3)
+ ## 开发优先级 (v3)
+ ## 架构规则 (v4)
+ ## API 规范 (v4)
+ ## 安全规则 (v4)

## 修改的内容 (~)

~ 项目状态: 研究阶段 → 架构阶段

## 删除的内容 (-)

(无)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 自定义演进

### 手动添加内容

```
/project-optimizer:evolve --add-section

📝 添加自定义段落

请选择要添加的内容类型：
[1] 技术规范
[2] 开发约束
[3] 最佳实践
[4] 自定义段落

段落标题: > _______________
段落内容: > _______________
```

### 编辑规则

```
/project-optimizer:evolve --edit-rules

📝 编辑演进规则

当前规则：
1. ✅ 阶段完成时自动更新
2. ✅ Gate 通过时自动更新
3. ✅ 关键决策时提示更新
4. ❌ 文件变化时自动更新

修改规则？
[1] 启用/禁用规则
[2] 添加自定义触发
[3] 设置更新频率
```

---

## 输出格式

### 演进成功

```
✅ CLAUDE.md 已更新！

📋 演进信息：
- 版本: v3 → v4
- 触发: 架构阶段完成
- 时间: 2024-12-15 14:30

📝 变更摘要：
+ 添加: 架构规则、API 规范、安全规则
~ 修改: 项目状态
- 删除: 无

💾 备份：
- 旧版本已保存: .claude/PROJECT_MEMORY/claude_versions/CLAUDE.md.v3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 提示：
- 查看历史: /project-optimizer:evolve --history
- 恢复版本: /project-optimizer:evolve --restore v3
```

---

## 配置模板

### 完整 CLAUDE.md 结构

```markdown
# [项目名称]

> 项目阶段：[阶段图标] [阶段名称] | [模式说明]

## 项目状态
[动态更新]

## 技术栈
[研究阶段后添加]

## 核心功能
[规划阶段后添加]

## 架构规则
[架构阶段后添加]

## API 规范
[架构阶段后添加]

## UI/UX 规范
[原型阶段后添加]

## 安全规则
[架构阶段后添加]

## 开发约束
[持续更新]

## 关键决策
[自动从决策记录同步]

## 命令清单
[根据项目类型显示]
```
