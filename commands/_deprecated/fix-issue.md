---
description: Analyze and fix a GitHub issue with full workflow
---

# 修复 GitHub Issue

请分析并修复 GitHub Issue: $ARGUMENTS

## 工作流程

### 1. 获取 Issue 详情
```bash
gh issue view $ARGUMENTS
```

阅读并理解：
- 问题描述
- 复现步骤
- 期望行为
- 实际行为

### 2. 定位问题
- 搜索相关代码文件
- 找到问题根因
- 确认影响范围

### 3. 制定修复方案
输出：
```markdown
## Issue 分析

### 问题定位
- 文件：
- 行号：
- 根因：

### 修复方案
[描述修复思路]

### 影响范围
[列出可能受影响的模块]
```

**等待用户确认后再继续**

### 4. 实现修复
- 修改代码
- 添加必要的测试
- 确保不引入新问题

### 5. 验证修复
```bash
# 运行相关测试
pnpm test -- --related

# 代码检查
pnpm lint
pnpm typecheck
```

### 6. 提交代码
```bash
# 创建分支
git checkout -b fix/issue-$ARGUMENTS

# 提交
git add .
git commit -m "fix: resolve issue #$ARGUMENTS

[详细描述修复内容]

Closes #$ARGUMENTS"

# 推送
git push -u origin fix/issue-$ARGUMENTS
```

### 7. 创建 PR
```bash
gh pr create --title "Fix: Issue #$ARGUMENTS" --body "
## 修复内容
[描述]

## 测试
- [ ] 单元测试通过
- [ ] 手动验证通过

Closes #$ARGUMENTS
"
```

## 注意事项
- 最小化修改范围
- 不要顺便重构其他代码
- 确保测试覆盖
