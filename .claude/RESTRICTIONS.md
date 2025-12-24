# 项目约束规则 (Project Restrictions)

> 项目: claude-code-optimizer
> 工作模式: maintenance
> 创建时间: 2025-12-24T12:06:00Z

---

## 🚫 核心约束 (Core Restrictions)

### 结构保护 (Structure Preservation)

**状态**: ✅ 启用

```
❌ 禁止修改:
- 插件配置结构 (.claude-plugin/plugin.json, marketplace.json)
- 命令文件 frontmatter 格式 (YAML front matter)
- 模板变量语法 ({{mustache}} syntax)
- 命令命名规范 (/project-optimizer:*)

✅ 允许:
- 新增命令文件 (commands/*.md)
- 新增模板文件 (templates/*.md, *.json)
- 扩展现有命令功能 (保持格式)
- 更新文档内容
```

### 向后兼容 (Backward Compatibility)

**状态**: ✅ 启用

```
要求:
- 所有现有命令必须保持可用
- 命令参数不可删除或改变语义
- 模板变量名称不可更改
- 输出文件格式保持稳定

废弃流程:
- 使用 ⚠️ 标记废弃功能
- 在文档中说明替代方案
- 至少保留一个版本周期
```

### 禁止破坏性变更 (No Breaking Changes)

**状态**: ✅ 启用

```
❌ 绝对禁止:
- 删除或重命名现有命令
- 更改命令调用方式 (/project-optimizer:xxx)
- 删除模板文件
- 更改插件名称
- 修改核心工作流逻辑（6阶段、3 Gate）
```

---

## 🔒 代码红线 (Code Redlines)

### 文件级红线

#### `.claude-plugin/plugin.json`

- **保护级别**: 🔴 Critical
- **原因**: 插件注册配置，Claude Code 依赖此文件识别插件
- **允许操作**: 仅允许更新 version 字段
- **禁止操作**: 修改 name, description, keywords 结构

---

#### `.claude-plugin/marketplace.json`

- **保护级别**: 🔴 Critical
- **原因**: Marketplace 发布配置
- **允许操作**: 更新 version, 添加 keywords
- **禁止操作**: 修改插件标识符、所有者信息

---

#### `commands/*.md` (所有命令文件)

- **保护级别**: 🟡 Important
- **原因**: 命令定义，用户依赖现有命令
- **允许操作**:
  - 扩展命令功能
  - 添加新的参数（可选参数）
  - 更新文档和示例
- **禁止操作**:
  - 删除现有参数
  - 更改命令名称
  - 删除 YAML frontmatter

---

#### `templates/*.json` (JSON 模板)

- **保护级别**: 🟡 Important
- **原因**: 项目初始化依赖这些模板
- **允许操作**: 添加新字段（可选）
- **禁止操作**: 删除现有字段、更改字段类型

---

### 模块级红线

#### 6 阶段工作流

- **保护范围**: research → plan → arch → dev → test → deploy
- **约束说明**: 核心工作流逻辑不可更改
- **允许**: 添加新的工作模式（如 developing）
- **禁止**: 删除或重命名现有阶段

---

#### 3 道 Gate 检查

- **保护范围**: Gate 1 (plan→arch), Gate 2 (dev→test), Gate 3 (test→deploy)
- **约束说明**: 质量门控机制
- **允许**: 调整检查标准
- **禁止**: 移除 Gate 检查

---

## 📋 功能约束 (Feature Restrictions)

### 已发布功能

- **/start** (v1.0.0)
  - API 签名: 不可变更
  - 参数: --resume, --phase, --type 必须保持
  - 文档: 已发布，需同步更新

- **/scan** (v1.0.7) ⭐
  - API 签名: 不可变更
  - 输出格式: PROJECT_SNAPSHOT.json, RESTRICTIONS.md
  - 文档: 新功能，需保持一致

- **/sprint** (v1.0.7) ⭐
  - API 签名: 不可变更
  - 参数: --create, --status, --update, --complete, --retrospective
  - 文档: 新功能，需保持一致

### 实验性功能

*当前无实验性功能*

---

## 🔧 技术约束 (Technical Restrictions)

### 依赖管理

```
固定依赖 (不可升级主版本):
- 无外部运行时依赖（纯 Markdown + JSON 插件）

禁止引入:
- 不允许引入需要编译的依赖
- 不允许引入需要网络请求的依赖（保持离线可用）
```

### 架构约束

```
1. 所有命令必须是独立的 Markdown 文件
2. 模板必须使用 Mustache 语法 ({{variable}})
3. 配置文件必须是有效的 JSON
4. 文档必须使用 GitHub Flavored Markdown
5. 所有路径必须是 POSIX 兼容的
```

---

## 🚦 变更审批流程 (Change Approval Process)

### 需要审批的变更

| 变更类型 | 审批级别 | 审批人 |
|---------|---------|--------|
| 命令签名变更 | 高 | 项目维护者 |
| 模板格式变更 | 高 | 项目维护者 |
| 新增核心功能 | 中 | 项目维护者 |
| 文档更新 | 低 | 任何贡献者 |
| Bug 修复 | 低 | 任何贡献者 |

### 豁免情况

```
以下情况可豁免约束:
1. 安全漏洞修复 (P0)
2. Claude Code API 重大更新适配
3. 用户明确要求的破坏性变更

豁免流程:
1. 在 GitHub Issue 中记录变更原因
2. 评估影响范围
3. 准备迁移指南
4. 更新 CHANGELOG
5. 发布 Major 版本（2.0.0+）
```

---

## 📝 变更日志 (Restriction Change Log)

### 2025-12-24 - v1.0.7 约束初始化

**变更内容**: 首次创建项目约束文档
**原因**: 规范化项目开发流程，保护现有用户
**影响**: 所有后续变更必须遵守此约束

---

## 🔍 约束验证 (Restriction Validation)

### 自动检查

```bash
# 插件配置验证
python3 -c "import json; json.load(open('.claude-plugin/plugin.json'))"

# 模板语法验证
grep -r "{{[^}]*}}" templates/

# 命令格式验证
head -5 commands/*.md | grep -E "^(---|description:)"
```

### 人工检查

```
发布前检查清单:
□ 所有命令文件包含 YAML frontmatter
□ 所有 JSON 文件语法有效
□ version 字段已更新
□ README 和 CHANGELOG 已更新
□ 无破坏性变更（或已记录在 CHANGELOG）
□ 所有现有命令可正常工作
```

---

## 💡 常见问题 (FAQ)

### Q: 如何添加新命令？

A:
1. 在 `commands/` 目录创建新的 `.md` 文件
2. 添加 YAML frontmatter (description)
3. 使用 `/project-optimizer:xxx` 命名规范
4. 更新 `commands/help.md` 添加命令文档
5. 提交 PR 并请求审查

### Q: 如何修改现有命令？

A:
1. 确认修改不会破坏现有用户使用
2. 只添加新功能，不删除旧功能
3. 如需废弃功能，使用废弃标记
4. 更新相关文档
5. 更新版本号（minor 版本）

### Q: 如何处理用户反馈的破坏性需求？

A:
1. 评估是否可以通过向后兼容方式实现
2. 如果必须破坏性变更，规划 Major 版本升级（2.0.0）
3. 提供详细的迁移指南
4. 在 GitHub 中充分讨论
5. 至少保留一个版本的过渡期

---

*此文件由 /project-optimizer:scan 自动生成*
*手动修改: 欢迎补充约束规则*
*最后更新: 2025-12-24T12:06:00Z*
