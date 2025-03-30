# 前端开发指南

## 1. 代码规范

### 1.1 文件组织
```
src/
├── app/                 # 页面组件
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   └── weather/        # 天气相关组件
├── hooks/              # 自定义Hooks
├── services/           # API服务
├── stores/             # 状态管理
├── types/              # TypeScript类型
├── utils/              # 工具函数
└── constants/          # 常量定义
```

### 1.2 命名规范
- 组件：PascalCase (WeatherChart.tsx)
- 文件：kebab-case (weather-service.ts)
- 变量/函数：camelCase (getWeatherData)
- 常量：UPPER_SNAKE_CASE (API_BASE_URL)
- 类型/接口：PascalCase (WeatherData)

### 1.3 代码风格
- 使用函数组件和Hooks
- 避免类组件
- 使用TypeScript严格模式
- 遵循ESLint规则
- 使用Prettier格式化

## 2. 组件开发

### 2.1 组件结构
```typescript
// 组件模板
import { FC } from 'react';
import { View } from 'react-native';

interface Props {
  // 属性定义
}

export const Component: FC<Props> = ({ prop1, prop2 }) => {
  // 组件逻辑
  return (
    // JSX
  );
};
```

### 2.2 组件原则
- 单一职责
- 可复用性
- 可测试性
- 可维护性
- 性能优化

### 2.3 状态管理
- 使用Zustand进行全局状态管理
- 使用React Query管理服务端状态
- 使用useState管理本地状态
- 避免状态提升

## 3. 样式指南

### 3.1 NativeWind使用
```typescript
// 推荐
<View className="flex-1 p-4 bg-white dark:bg-gray-800">
  <Text className="text-lg font-bold text-gray-900 dark:text-white">
    Hello World
  </Text>
</View>

// 不推荐
<View style={styles.container}>
  <Text style={styles.text}>Hello World</Text>
</View>
```

### 3.2 主题配置
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
      },
    },
  },
};
```

## 4. 性能优化

### 4.1 渲染优化
- 使用React.memo避免不必要的重渲染
- 使用useMemo和useCallback缓存值和函数
- 使用虚拟列表处理长列表
- 图片懒加载

### 4.2 动画优化
- 使用React Native Reanimated
- 避免JS线程阻塞
- 使用原生动画
- 优化动画性能

## 5. 测试规范

### 5.1 单元测试
```typescript
// WeatherChart.test.tsx
import { render, fireEvent } from '@testing-library/react-native';
import { WeatherChart } from './WeatherChart';

describe('WeatherChart', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<WeatherChart data={mockData} />);
    expect(getByTestId('weather-chart')).toBeTruthy();
  });
});
```

### 5.2 测试原则
- 测试关键业务逻辑
- 测试用户交互
- 测试边界条件
- 测试错误处理

## 6. 错误处理

### 6.1 错误边界
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 6.2 错误处理原则
- 优雅降级
- 用户友好提示
- 错误日志记录
- 自动重试机制

## 7. 文档规范

### 7.1 组件文档
```typescript
/**
 * 天气图表组件
 * @component
 * @example
 * ```tsx
 * <WeatherChart data={weatherData} />
 * ```
 */
export const WeatherChart: FC<Props> = ({ data }) => {
  // 组件实现
};
```

### 7.2 代码注释
- 复杂逻辑必须注释
- 使用JSDoc格式
- 保持注释更新
- 避免冗余注释 