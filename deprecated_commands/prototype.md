---
description: Prototype phase - frontend only with mock data (low cost to redo)
---

# 原型阶段 (Phase 5/9)

## 前置检查

读取 `.claude/PROJECT_STATE.json` 确认：
1. 架构阶段 (`architecture`) 已完成
2. 当前阶段为 `prototype`

## 原型阶段原则

```
🎨 原型阶段 CLAUDE.md 配置

## 核心原则
- 只做前端，不写后端
- 所有数据用 Mock
- 快速迭代，不要过度设计
- 重做成本极低

## 允许
- 创建组件和页面
- 使用 Mock 数据
- 快速验证用户体验

## 禁止
- 不要创建数据库
- 不要实现真实 API
- 不要做复杂的状态管理
- 不要过早优化
```

---

## 原型开发任务

### 📋 1. 初始化项目

根据架构阶段选定的技术栈初始化前端项目：

```bash
# 示例：使用 Next.js
npx create-next-app@latest web --typescript --tailwind --app

# 或 Vite + React
npm create vite@latest web -- --template react-ts
```

### 🎭 2. Mock 数据准备

创建 `src/mocks/` 目录，存放所有 Mock 数据：

```typescript
// src/mocks/users.ts
export const mockUsers = [
  { id: '1', name: '张三', email: 'zhangsan@example.com' },
  { id: '2', name: '李四', email: 'lisi@example.com' },
];

// src/mocks/index.ts
export * from './users';
// ... 其他 mock 数据
```

### 🧩 3. 组件开发

按照 MVP 功能列表开发页面和组件：

```markdown
## 组件开发清单

### 布局组件
- [ ] Layout - 主布局
- [ ] Header - 头部导航
- [ ] Sidebar - 侧边栏
- [ ] Footer - 页脚

### 页面组件
- [ ] HomePage - 首页
- [ ] LoginPage - 登录页
- [ ] RegisterPage - 注册页
- [ ] DashboardPage - 仪表板
- [ ] [其他核心页面]

### 业务组件
- [ ] [组件1]
- [ ] [组件2]
```

### 🔄 4. 用户流程实现

实现核心用户流程（使用 Mock 数据）：

```markdown
## 用户流程清单

- [ ] 用户注册流程
  - 注册表单
  - 表单验证（前端）
  - 提交反馈（模拟成功）

- [ ] 用户登录流程
  - 登录表单
  - 模拟登录成功/失败
  - 跳转到仪表板

- [ ] 核心业务流程
  - [流程1]
  - [流程2]

- [ ] 错误状态展示
  - 网络错误提示
  - 表单错误提示
  - 空状态展示
```

### 🎨 5. 黑盒功能处理

对于后端功能，使用占位符处理：

```typescript
// 黑盒功能示例

// 支付功能
const handlePayment = () => {
  alert('💳 支付功能将在后端阶段实现');
};

// 数据分析
const AnalyticsChart = () => (
  <div className="placeholder-chart">
    📊 数据图表将在后端阶段接入真实数据
  </div>
);

// 通知功能
const sendNotification = () => {
  toast.success('📬 通知功能开发中');
};
```

---

## 原型完成标准

完成以下检查项才能进入 Gate 2：

| 检查项 | 状态 |
|--------|------|
| 所有核心页面已创建 | ⬜ |
| 用户注册/登录流程可走通 | ⬜ |
| 核心业务流程可演示 | ⬜ |
| 使用 Mock 数据 | ⬜ |
| 无后端代码 | ⬜ |
| 无数据库依赖 | ⬜ |
| 响应式设计（可选） | ⬜ |
| 错误状态展示 | ⬜ |

---

## 阶段完成

更新 `PROJECT_STATE.json`:
```json
{
  "phases": {
    "prototype": { "status": "completed", "completedAt": "[timestamp]" },
    "gate2": { "status": "in_progress", "completedAt": null }
  },
  "currentPhase": 6
}
```

输出：
```
✅ 原型阶段完成！

已完成：
✓ 项目初始化
✓ Mock 数据准备
✓ 核心页面开发
✓ 用户流程实现

💡 重做成本提示：
   如果 Gate 2 审核不通过，只需重做前端代码
   预计返工时间：[X小时]
   无后端代码需要修改

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 研究 → ✓ 规划 → ✓ Gate1 → ✓ 架构 → ✓ 原型 → ✅ Gate2 → ⚙️ 后端 → 🔗 集成 → 📦 输出
                                               ↑
                                             下一步
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

下一步：运行 /project-optimizer:gate2 进入原型确认
```

---

## 注意事项

```
⚠️ 原型阶段禁止事项：

1. 不要创建数据库表
2. 不要实现真实 API 调用
3. 不要集成第三方服务
4. 不要做复杂的状态持久化
5. 不要过早优化性能

这些都是后端阶段的任务！
```
