# 项目约束规则 (Project Restrictions)

> 项目: {{projectName}}
> 工作模式: {{workMode}}
> 创建时间: {{timestamp}}

---

## 🚫 核心约束 (Core Restrictions)

### 结构保护 (Structure Preservation)

**状态**: {{preserveStructure}}

```
❌ 禁止修改:
- 现有目录结构 (除非明确需要)
- 已发布的 API 接口签名
- 数据库 schema (需要迁移脚本)
- 公共模块的导出接口

✅ 允许:
- 新增文件和目录
- 扩展现有功能
- 重构内部实现 (保持接口不变)
- 添加新的 API 端点
```

### 向后兼容 (Backward Compatibility)

**状态**: {{backwardCompatibility}}

```
要求:
- 所有公共 API 必须保持兼容
- 废弃功能需要使用 @deprecated 标记并保留至少一个版本
- 配置文件格式变更需要提供迁移工具
- 数据库变更必须支持渐进式迁移
```

### 禁止破坏性变更 (No Breaking Changes)

**状态**: {{noBreakingChanges}}

```
❌ 绝对禁止:
- 删除或重命名公共 API
- 更改现有函数签名 (参数类型、返回值)
- 移除配置选项
- 更改数据库表结构 (无迁移脚本)
- 更改环境变量名称
```

---

## 🔒 代码红线 (Code Redlines)

### 文件级红线

{{#fileRedlines}}
#### `{{filePath}}`

- **保护级别**: {{protectionLevel}}
- **原因**: {{reason}}
- **允许操作**: {{allowedOperations}}
- **禁止操作**: {{forbiddenOperations}}

---

{{/fileRedlines}}

{{#unless fileRedlines}}
*暂无文件级红线*
{{/unless}}

### 模块级红线

{{#moduleRedlines}}
#### {{moduleName}}

- **保护范围**: {{scope}}
- **约束说明**: {{description}}
- **例外情况**: {{exceptions}}

---

{{/moduleRedlines}}

{{#unless moduleRedlines}}
*暂无模块级红线*
{{/unless}}

---

## 📋 功能约束 (Feature Restrictions)

### 已发布功能

{{#releasedFeatures}}
- **{{featureName}}** (v{{version}})
  - API 签名: 不可变更
  - 行为: 保持兼容
  - 文档: 已发布，需同步更新

{{/releasedFeatures}}

### 实验性功能

{{#experimentalFeatures}}
- **{{featureName}}** (实验中)
  - 允许快速迭代
  - 可以破坏性变更
  - 需要明确标记为 `@experimental`

{{/experimentalFeatures}}

---

## 🔧 技术约束 (Technical Restrictions)

### 依赖管理

```
固定依赖 (不可升级主版本):
{{#lockedDependencies}}
- {{name}}: {{version}} (原因: {{reason}})
{{/lockedDependencies}}

禁止引入:
{{#bannedDependencies}}
- {{name}} (原因: {{reason}})
{{/bannedDependencies}}
```

### 架构约束

```
{{#architectureRules}}
- {{rule}}
{{/architectureRules}}
```

---

## 🚦 变更审批流程 (Change Approval Process)

### 需要审批的变更

| 变更类型 | 审批级别 | 审批人 |
|---------|---------|--------|
| API 变更 | 高 | 架构师 + PM |
| 数据库 schema | 高 | 架构师 + DBA |
| 配置格式 | 中 | 技术负责人 |
| 新增依赖 | 中 | 技术负责人 |
| 内部重构 | 低 | 代码审查 |

### 豁免情况

```
以下情况可豁免约束:
1. 安全漏洞修复 (P0/P1)
2. 生产环境紧急修复
3. 用户明确要求的破坏性变更

豁免流程:
1. 记录变更原因
2. 评估影响范围
3. 准备迁移方案
4. 更新文档
```

---

## 📝 变更日志 (Restriction Change Log)

{{#restrictionChanges}}
### {{date}} - {{title}}

**变更内容**: {{change}}
**原因**: {{reason}}
**影响**: {{impact}}

---

{{/restrictionChanges}}

---

## 🔍 约束验证 (Restriction Validation)

### 自动检查

```bash
# Git pre-commit hook 检查
- API 签名变更检测
- 公共接口兼容性检查
- 数据库 schema 变更检测
- 依赖版本合规性检查
```

### 人工检查

```
Code Review 检查项:
□ 是否遵守结构保护规则
□ 是否保持向后兼容
□ 是否触及代码红线
□ 是否需要迁移脚本
□ 是否更新了文档
```

---

## 💡 常见问题 (FAQ)

### Q: 如何请求放宽约束？

A:
1. 在 RESTRICTIONS.md 中记录请求
2. 说明充分的业务原因
3. 评估影响范围和迁移成本
4. 获得相关方批准
5. 更新约束规则

### Q: 如果必须做破坏性变更怎么办？

A:
1. 评估是否真的必要
2. 准备详细的迁移方案
3. 提供自动化迁移工具
4. 充分的文档和公告
5. 至少保留一个版本的过渡期

---

*此文件由 /project-optimizer:scan 自动生成*
*手动修改: 添加/更新约束规则*
*最后更新: {{lastUpdate}}*
