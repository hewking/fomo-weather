# 技术栈文档

## 1. 开发框架

### 1.1 核心框架
- **React Native + Expo**
  - 版本：Expo SDK 50
  - 类型：TypeScript
  - 状态管理：Zustand
  - 路由：Expo Router

### 1.2 UI组件库
- **NativeWind (Tailwind CSS)**
  - 样式管理
  - 响应式设计
  - 主题支持
- **React Native Reanimated**
  - 动画效果
  - 手势处理
- **React Native SVG**
  - 图表绘制
  - 图标支持

## 2. 数据层

### 2.1 API集成
- **Open-Meteo API**
  - 天气数据获取
  - 地理位置服务
- **React Query**
  - 数据获取
  - 缓存管理
  - 错误处理

### 2.2 本地存储
- **AsyncStorage**
  - 用户设置
  - 缓存数据
- **Zustand Persist**
  - 状态持久化

## 3. 工具链

### 3.1 开发工具
- **TypeScript**
  - 类型检查
  - 代码提示
- **ESLint**
  - 代码规范
  - 错误检查
- **Prettier**
  - 代码格式化
- **Jest**
  - 单元测试
- **React Native Testing Library**
  - 组件测试

### 3.2 构建工具
- **Expo EAS Build**
  - 应用打包
  - 持续集成
- **Expo Updates**
  - OTA更新

## 4. 性能优化

### 4.1 监控工具
- **Expo Performance**
  - 性能监控
- **Sentry**
  - 错误追踪
- **Firebase Analytics**
  - 用户行为分析

### 4.2 优化策略
- 图片优化
- 代码分割
- 懒加载
- 缓存策略

## 5. 部署环境

### 5.1 开发环境
- Node.js 18+
- npm 9+
- Expo CLI
- iOS Simulator
- Android Studio

### 5.2 生产环境
- Expo EAS
- App Store
- Google Play Store

## 6. 版本控制

### 6.1 代码管理
- Git
- GitHub
- Conventional Commits

### 6.2 分支策略
- main: 生产环境
- develop: 开发环境
- feature/*: 功能分支
- release/*: 发布分支
- hotfix/*: 紧急修复

## 7. 文档工具

### 7.1 技术文档
- TypeDoc
- Storybook
- README.md

### 7.2 项目管理
- GitHub Projects
- GitHub Issues
- GitHub Actions 