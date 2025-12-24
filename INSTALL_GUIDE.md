# Claude Code Optimizer v1.0.7 安装/更新指南

## 方法 1: 从 GitHub 安装（推荐）

### 在 Claude Code 中执行

```bash
/plugin install michaelyufeng/claude-code-optimizer
```

或在终端中执行:

```bash
claude /plugin install michaelyufeng/claude-code-optimizer
```

### 验证安装

```bash
/project-optimizer:help
```

应该显示 v1.0.7 版本信息。

---

## 方法 2: 从本地目录安装

### 1. 进入插件目录

```bash
cd /Users/zhuyufeng/Documents/claude-code-optimizer
```

### 2. 在 Claude Code 中安装

```bash
/plugin install .
```

或在终端中:

```bash
claude /plugin install .
```

---

## 方法 3: 手动复制（备用方案）

### 1. 检查插件缓存目录

```bash
ls -la ~/.claude/plugins/cache/
```

### 2. 手动复制插件文件

```bash
# 创建插件目录
mkdir -p ~/.claude/plugins/cache/claude-code-optimizer/project-optimizer/1.0.7

# 复制插件文件
cp -r /Users/zhuyufeng/Documents/claude-code-optimizer/* \
  ~/.claude/plugins/cache/claude-code-optimizer/project-optimizer/1.0.7/
```

### 3. 重启 Claude Code

退出并重新打开 Claude Code。

---

## 验证安装成功

### 方法 1: 检查版本

在 Claude Code 中执行:

```bash
/project-optimizer:help
```

应该看到:

```
Claude Code Optimizer v1.0.7

特性:
- 6 阶段自动驾驶流程
- 3 道 Gate 门控
- 智能模型选择
- Sprint 管理 ⭐ v1.0.7
- 代码扫描 ⭐ v1.0.7
- 开发中模式 ⭐ v1.0.7

命令数: 21 个 (v1.0.7: +4 个新命令)
```

### 方法 2: 测试新命令

```bash
# 测试扫描命令
/project-optimizer:scan

# 测试 Sprint 命令
/project-optimizer:sprint --help

# 测试 developing 模式
/project-optimizer:start --type developing
```

---

## 卸载旧版本（如需要）

### 1. 查看已安装插件

```bash
cat ~/.claude/plugins/installed_plugins.json
```

### 2. 清除缓存

```bash
rm -rf ~/.claude/plugins/cache/claude-code-optimizer
```

### 3. 重新安装

```bash
claude /plugin install michaelyufeng/claude-code-optimizer
```

---

## 常见问题

### Q: 安装后看不到新命令？

A: 尝试以下步骤:
1. 重启 Claude Code
2. 清除插件缓存: `rm -rf ~/.claude/plugins/cache/claude-code-optimizer`
3. 重新安装插件
4. 确认版本: `/project-optimizer:help`

### Q: 提示 "plugin not found"？

A: 检查:
1. 插件是否在缓存中: `ls ~/.claude/plugins/cache/`
2. GitHub 仓库是否可访问
3. 尝试从本地目录安装: `cd <plugin-dir> && claude /plugin install .`

### Q: 版本显示还是 1.0.6？

A:
1. 确认 GitHub 最新版本已推送: `git log origin/main -3`
2. 清除本地缓存后重新安装
3. 等待几分钟让 GitHub 同步

---

## 当前版本信息

```json
{
  "name": "project-optimizer",
  "version": "1.0.7",
  "repository": "https://github.com/michaelyufeng/claude-code-optimizer",
  "release_date": "2025-12-24",
  "new_features": [
    "/scan - 代码扫描与项目分析",
    "/sprint - Sprint 管理",
    "/developing - 开发中项目模式",
    "--type developing - 增量开发工作流"
  ]
}
```

---

## 联系方式

- GitHub: https://github.com/michaelyufeng/claude-code-optimizer
- Issues: https://github.com/michaelyufeng/claude-code-optimizer/issues

---

*最后更新: 2025-12-24*
