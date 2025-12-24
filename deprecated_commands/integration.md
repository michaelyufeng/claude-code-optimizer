---
description: Integration phase - connect frontend with backend
---

# 集成阶段 (Phase 8/9)

## 前置检查

读取 `.claude/PROJECT_STATE.json` 确认：
1. 后端阶段 (`backend`) 已完成
2. 当前阶段为 `integration`

## 集成阶段任务

### 🔗 1. 前后端连接

将前端的 Mock 数据替换为真实 API 调用：

```markdown
## 连接清单

### API 服务层
- [ ] 创建 API 客户端（axios/fetch 封装）
- [ ] 配置环境变量（API_BASE_URL）
- [ ] 实现请求/响应拦截器
- [ ] 处理认证 Token

### 替换 Mock 数据
- [ ] 用户注册 → 调用 /api/auth/register
- [ ] 用户登录 → 调用 /api/auth/login
- [ ] 用户信息 → 调用 /api/users/me
- [ ] [业务API 1] → 调用 [真实API]
- [ ] [业务API 2] → 调用 [真实API]
```

### 🧪 2. 端到端测试

```markdown
## E2E 测试清单

### 用户流程测试
- [ ] 完整注册流程
- [ ] 完整登录流程
- [ ] Token 刷新流程
- [ ] 登出流程

### 业务流程测试
- [ ] [核心流程1] 端到端
- [ ] [核心流程2] 端到端

### 边界情况测试
- [ ] 网络错误处理
- [ ] Token 过期处理
- [ ] 并发请求处理
- [ ] 大数据量处理
```

### ⚡ 3. 性能优化

```markdown
## 性能检查清单

### 前端
- [ ] 代码分割（Code Splitting）
- [ ] 图片优化
- [ ] 缓存策略
- [ ] 首屏加载时间 < 3s

### 后端
- [ ] 数据库查询优化
- [ ] N+1 问题检查
- [ ] API 响应时间 < 200ms
- [ ] 并发处理能力

### 监控
- [ ] 错误监控配置
- [ ] 性能监控配置
- [ ] 日志收集配置
```

### 🔒 4. 安全审计

```markdown
## 安全审计清单

### 认证安全
- [ ] Token 安全存储
- [ ] HTTPS 配置
- [ ] CORS 配置

### 数据安全
- [ ] 敏感数据加密
- [ ] SQL 注入测试
- [ ] XSS 测试

### 依赖安全
- [ ] npm audit / pip audit
- [ ] 依赖版本检查
```

### 📱 5. 兼容性测试

```markdown
## 兼容性清单

### 浏览器
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 设备
- [ ] 桌面端
- [ ] 平板
- [ ] 移动端

### 分辨率
- [ ] 1920x1080
- [ ] 1440x900
- [ ] 768x1024
- [ ] 375x667
```

---

## 集成完成标准

| 检查项 | 状态 |
|--------|------|
| 所有 API 已连接 | ⬜ |
| Mock 数据已移除 | ⬜ |
| E2E 测试通过 | ⬜ |
| 性能满足要求 | ⬜ |
| 安全审计通过 | ⬜ |
| 兼容性测试通过 | ⬜ |

---

## 阶段完成

更新 `PROJECT_STATE.json`:
```json
{
  "phases": {
    "integration": { "status": "completed", "completedAt": "[timestamp]" },
    "output": { "status": "in_progress", "completedAt": null }
  },
  "currentPhase": 9
}
```

输出：
```
✅ 集成阶段完成！

已完成：
✓ 前后端连接
✓ E2E 测试
✓ 性能优化
✓ 安全审计
✓ 兼容性测试

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ 研究 → ✓ 规划 → ✓ Gate1 → ✓ 架构 → ✓ 原型 → ✓ Gate2 → ✓ 后端 → ✓ 集成 → 📦 输出
                                                                             ↑
                                                                           最后一步
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

下一步：运行 /project-optimizer:output 生成最终产出物
```
