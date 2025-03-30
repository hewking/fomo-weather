/// <reference types="react-native-web" />
/// <reference types="nativewind/types" />

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  const value: React.FC<React.SVGProps<SVGSVGElement>>;
  export default value;
} 