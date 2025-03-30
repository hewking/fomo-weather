declare module 'react-native-svg-charts' {
  import { ViewStyle } from 'react-native';

  interface LineChartProps {
    data: number[];
    style?: ViewStyle;
    svg?: {
      stroke?: string;
      strokeWidth?: number;
    };
    contentInset?: {
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
  }

  export class LineChart extends React.Component<LineChartProps> {}
} 