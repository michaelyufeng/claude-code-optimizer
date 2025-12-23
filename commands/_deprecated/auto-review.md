---
description: Automated quality review system for code, design, and security
---

# 自动审查系统 (Auto Review)

## 功能说明

自动化质量审查系统，集成代码审查、设计审查和安全审查。

灵感来源：[OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows)

## 审查类型

### 审查矩阵

| 类型 | 触发方式 | 检查内容 | 严重级别 |
|------|----------|----------|----------|
| 代码审查 | 手动/PR | 语法、风格、Bug | Critical/High/Medium/Low |
| 设计审查 | 手动/原型完成 | UI/UX、无障碍、一致性 | Critical/High/Medium/Low |
| 安全审查 | 手动/提交前 | OWASP Top 10、密钥泄露 | Critical/High/Medium/Low |

---

## 代码审查

### 命令

```
/project-optimizer:auto-review --code
/project-optimizer:auto-review --code [file-pattern]
```

### 检查项

```markdown
## 代码审查检查项

### 🔴 Critical (阻断性)
- [ ] 语法错误
- [ ] 运行时异常
- [ ] 安全漏洞
- [ ] 数据丢失风险

### 🟠 High (重要)
- [ ] 逻辑错误
- [ ] 性能问题
- [ ] 类型错误
- [ ] 未处理的异常

### 🟡 Medium (建议)
- [ ] 代码重复
- [ ] 命名不规范
- [ ] 缺少注释
- [ ] 复杂度过高

### 🟢 Low (优化)
- [ ] 格式问题
- [ ] 导入顺序
- [ ] 未使用变量
```

### 输出格式

```
📋 代码审查报告

文件: src/services/auth.ts
时间: 2024-12-15 14:30

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 发现问题

### 🔴 Critical (1)

**[C001] SQL 注入风险**
位置: L45-48
```typescript
// 当前代码
const query = `SELECT * FROM users WHERE id = ${userId}`

// 建议修复
const query = `SELECT * FROM users WHERE id = ?`
db.query(query, [userId])
```
修复建议: 使用参数化查询

---

### 🟠 High (2)

**[H001] 未处理的 Promise 拒绝**
位置: L23
```typescript
// 当前代码
fetchUser(id).then(user => setUser(user))

// 建议修复
fetchUser(id)
  .then(user => setUser(user))
  .catch(error => handleError(error))
```

**[H002] 缺少类型定义**
位置: L12
修复建议: 添加明确的返回类型

---

### 🟡 Medium (3)
- [M001] L67: 函数过长 (150 行)，建议拆分
- [M002] L89: 命名不规范 `x` → `userCount`
- [M003] L102: 重复代码，可提取为函数

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 统计

| 级别 | 数量 | 状态 |
|------|------|------|
| Critical | 1 | ❌ 需立即修复 |
| High | 2 | ⚠️ 需要修复 |
| Medium | 3 | 💡 建议修复 |
| Low | 0 | ✅ |

**总分: 65/100** (需要改进)
```

---

## 设计审查

### 命令

```
/project-optimizer:auto-review --design
/project-optimizer:auto-review --design [url]
```

### 检查项

```markdown
## 设计审查检查项

### UI/UX 一致性
- [ ] 颜色是否符合设计系统
- [ ] 字体是否统一
- [ ] 间距是否遵循网格
- [ ] 组件样式是否一致

### 无障碍 (WCAG)
- [ ] 颜色对比度 >= 4.5:1
- [ ] 可键盘导航
- [ ] 屏幕阅读器支持
- [ ] 焦点状态可见

### 响应式
- [ ] 移动端适配
- [ ] 平板端适配
- [ ] 断点过渡平滑

### 交互
- [ ] 加载状态
- [ ] 错误状态
- [ ] 空状态
- [ ] 悬停/点击反馈
```

### 输出格式

```
🎨 设计审查报告

页面: /login
时间: 2024-12-15 14:30

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 发现问题

### 🔴 Critical (1)

**[D001] 对比度不足**
元素: 提交按钮文字
当前: 2.1:1
要求: >= 4.5:1 (WCAG AA)
影响: 视障用户无法阅读

修复建议:
```css
/* 当前 */
color: #999;
background: #ddd;

/* 建议 */
color: #333;
background: #ddd;
/* 对比度: 6.3:1 ✓ */
```

---

### 🟠 High (1)

**[D002] 缺少焦点状态**
元素: 输入框
问题: Tab 键导航时无法看到焦点位置
修复建议: 添加 `outline` 或 `box-shadow`

---

### 🟡 Medium (2)
- [D003] 间距不一致: 按钮间距 16px/24px 混用
- [D004] 移动端按钮过小: 40px < 最小 44px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## WCAG 合规性

| 标准 | 状态 |
|------|------|
| 1.4.3 对比度 | ❌ 不通过 |
| 2.1.1 键盘 | ⚠️ 部分通过 |
| 2.4.7 焦点可见 | ❌ 不通过 |
| 4.1.2 名称角色值 | ✅ 通过 |

**合规等级: 未达到 WCAG AA**
```

---

## 安全审查

### 命令

```
/project-optimizer:auto-review --security
```

### 检查项 (OWASP Top 10)

```markdown
## 安全审查检查项

### A01: 访问控制
- [ ] 权限检查完整
- [ ] 敏感操作验证身份

### A02: 加密失败
- [ ] 敏感数据加密
- [ ] 使用安全算法

### A03: 注入
- [ ] SQL 参数化
- [ ] XSS 防护
- [ ] 命令注入防护

### A04: 不安全设计
- [ ] 业务逻辑校验
- [ ] 限流机制

### A05: 安全配置错误
- [ ] 默认密码已更改
- [ ] 调试模式关闭
- [ ] 错误信息不泄露

### A06: 易受攻击组件
- [ ] 依赖无已知漏洞
- [ ] 及时更新

### A07: 认证失败
- [ ] 密码策略
- [ ] 会话管理

### A08: 数据完整性
- [ ] CSRF 防护
- [ ] 签名验证

### A09: 日志监控
- [ ] 敏感操作记录
- [ ] 异常告警

### A10: SSRF
- [ ] URL 验证
- [ ] 白名单机制
```

### 输出格式

```
🔒 安全审查报告

范围: 全项目
时间: 2024-12-15 14:30

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 发现问题

### 🔴 Critical (2)

**[S001] API 密钥泄露**
文件: .env
问题: .env 文件未加入 .gitignore
风险: 密钥可能被推送到公开仓库

修复:
```bash
echo ".env" >> .gitignore
# 如已推送，需要撤销密钥
```

**[S002] SQL 注入**
文件: src/api/users.ts:45
风险: 用户输入直接拼接 SQL
修复: 使用参数化查询

---

### 🟠 High (1)

**[S003] 缺少 CSRF 保护**
位置: POST /api/transfer
风险: 跨站请求伪造攻击
修复: 添加 CSRF Token 验证

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## OWASP Top 10 覆盖

| 类别 | 状态 |
|------|------|
| A01 访问控制 | ⚠️ 需检查 |
| A02 加密失败 | ✅ 通过 |
| A03 注入 | ❌ 发现问题 |
| A04 不安全设计 | ✅ 通过 |
| A05 配置错误 | ❌ 发现问题 |
| A06 易受攻击组件 | ✅ 通过 |
| A07 认证失败 | ✅ 通过 |
| A08 数据完整性 | ⚠️ 需检查 |
| A09 日志监控 | ✅ 通过 |
| A10 SSRF | ✅ 通过 |

**安全评分: 60/100** (需要修复)
```

---

## 综合审查

### 一键全面审查

```
/project-optimizer:auto-review --all
```

### 输出

```
📊 综合审查报告

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 审查摘要

| 类型 | Critical | High | Medium | Low | 得分 |
|------|----------|------|--------|-----|------|
| 代码 | 1 | 2 | 3 | 0 | 65/100 |
| 设计 | 1 | 1 | 2 | 0 | 70/100 |
| 安全 | 2 | 1 | 0 | 0 | 60/100 |
| **总计** | **4** | **4** | **5** | **0** | **65/100** |

## 优先修复

1. 🔴 [S001] API 密钥泄露 - 立即处理
2. 🔴 [S002] SQL 注入 - 立即处理
3. 🔴 [C001] SQL 注入风险 - 立即处理
4. 🔴 [D001] 对比度不足 - 高优先级

## 建议

项目当前有 4 个严重问题需要立即修复。
建议在提交前完成所有 Critical 和 High 级别的修复。

运行 `/project-optimizer:auto-review --fix` 查看自动修复建议
```

---

## 自动修复

### 查看修复建议

```
/project-optimizer:auto-review --fix
```

### 输出

```
🔧 自动修复建议

可自动修复的问题 (5):

[1] [C001] SQL 注入风险
    自动修复: ✅ 可以
    操作: 将字符串拼接改为参数化查询

[2] [M002] 命名不规范
    自动修复: ✅ 可以
    操作: 重命名变量 x → userCount

[3] [D003] 间距不一致
    自动修复: ✅ 可以
    操作: 统一为 16px

...

需要手动修复的问题 (3):

[1] [H001] 未处理的 Promise 拒绝
    原因: 需要定义错误处理策略

[2] [D002] 缺少焦点状态
    原因: 需要设计确认样式

...

执行自动修复？
[1] 全部修复
[2] 选择性修复
[3] 仅预览
```

---

## 与 Gate 集成

### Gate 1 自动触发代码审查

```markdown
Gate 1 审核时自动执行：
- /project-optimizer:auto-review --code
- 如果有 Critical 问题，Gate 不通过
```

### Gate 2 自动触发设计审查

```markdown
Gate 2 审核时自动执行：
- /project-optimizer:auto-review --design
- 检查无障碍合规性
- 如果有 Critical 问题，Gate 不通过
```

---

## 配置

### 审查规则配置

`.claude/PROJECT_MEMORY/review-config.json`:

```json
{
  "code": {
    "enabled": true,
    "blockOnCritical": true,
    "ignorePatterns": ["*.test.ts", "*.spec.ts"]
  },
  "design": {
    "enabled": true,
    "wcagLevel": "AA",
    "checkResponsive": true
  },
  "security": {
    "enabled": true,
    "owaspChecks": ["A01", "A02", "A03", "A07"],
    "blockOnCritical": true
  }
}
```
