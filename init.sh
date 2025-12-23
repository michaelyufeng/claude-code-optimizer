#!/bin/bash

# Claude Code Optimizer 初始化脚本
# 用法: ./init.sh [new|dev|prod] [项目路径]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_TYPE="${1:-new}"
TARGET_DIR="${2:-.}"

echo "🚀 Claude Code Optimizer 初始化"
echo "================================"
echo "项目类型: $PROJECT_TYPE"
echo "目标目录: $TARGET_DIR"
echo ""

# 创建目录结构
mkdir -p "$TARGET_DIR/.claude/commands"
mkdir -p "$TARGET_DIR/docs"

# 复制 CLAUDE.md 模板
case "$PROJECT_TYPE" in
  "new")
    echo "📝 使用新项目模板..."
    cp "$SCRIPT_DIR/templates/CLAUDE.new-project.md" "$TARGET_DIR/CLAUDE.md"
    ;;
  "dev"|"developing")
    echo "📝 使用开发中项目模板..."
    cp "$SCRIPT_DIR/templates/CLAUDE.developing.md" "$TARGET_DIR/CLAUDE.md"
    ;;
  "prod"|"production")
    echo "📝 使用生产环境模板（严格红线）..."
    cp "$SCRIPT_DIR/templates/CLAUDE.production.md" "$TARGET_DIR/CLAUDE.md"
    ;;
  *)
    echo "❌ 未知项目类型: $PROJECT_TYPE"
    echo "支持的类型: new, dev, prod"
    exit 1
    ;;
esac

# 复制斜杠命令
echo "📂 安装斜杠命令..."
cp "$SCRIPT_DIR/commands/"*.md "$TARGET_DIR/.claude/commands/"

# 复制权限配置
echo "🔒 配置权限..."
case "$PROJECT_TYPE" in
  "new")
    cp "$SCRIPT_DIR/templates/settings.new-project.json" "$TARGET_DIR/.claude/settings.json"
    ;;
  "dev"|"developing")
    cp "$SCRIPT_DIR/templates/settings.developing.json" "$TARGET_DIR/.claude/settings.json"
    ;;
  "prod"|"production")
    cp "$SCRIPT_DIR/templates/settings.production.json" "$TARGET_DIR/.claude/settings.json"
    ;;
esac

# 创建 DISCOVERIES.md
if [ ! -f "$TARGET_DIR/docs/DISCOVERIES.md" ]; then
  echo "📝 创建 DISCOVERIES.md..."
  cat > "$TARGET_DIR/docs/DISCOVERIES.md" << 'EOF'
# 开发发现和教训

> 记录开发过程中的发现、问题和解决方案，避免重复犯错

## 模板

### [日期] 发现标题

**问题描述：**
[描述遇到的问题]

**根本原因：**
[分析原因]

**解决方案：**
[如何解决]

**教训：**
[未来如何避免]

---

## 记录
EOF
fi

# 创建或更新 .gitignore
echo "📝 配置 .gitignore..."
if [ ! -f "$TARGET_DIR/.gitignore" ]; then
  # 创建新的 .gitignore
  cat > "$TARGET_DIR/.gitignore" << 'EOF'
# Claude Code 本地配置
CLAUDE.local.md
CHECKPOINT.md
EOF
else
  # 更新现有 .gitignore
  if ! grep -q "CLAUDE.local.md" "$TARGET_DIR/.gitignore"; then
    echo "" >> "$TARGET_DIR/.gitignore"
    echo "# Claude Code 本地配置" >> "$TARGET_DIR/.gitignore"
    echo "CLAUDE.local.md" >> "$TARGET_DIR/.gitignore"
    echo "CHECKPOINT.md" >> "$TARGET_DIR/.gitignore"
  fi
fi

echo ""
echo "✅ 初始化完成！"
echo ""
echo "已创建："
echo "  - CLAUDE.md (项目配置)"
echo "  - .claude/commands/ (斜杠命令)"
echo "  - .claude/settings.json (权限配置)"
echo "  - docs/DISCOVERIES.md (发现记录)"
echo "  - .gitignore (已更新)"
echo ""
echo "📌 下一步："
echo "  1. 编辑 CLAUDE.md，填写项目具体信息"
echo "  2. cd $TARGET_DIR && claude 启动 Claude Code"
echo "  3. 使用 /project:plan 开始规划任务"
echo ""
echo "可用命令："
echo "  /project:plan [任务描述]      - 规划任务"
echo "  /project:review [文件/范围]   - 代码审查"
echo "  /project:fix-issue [issue号]  - 修复 GitHub Issue"
echo "  /project:checkpoint [描述]    - 保存进度检查点"
