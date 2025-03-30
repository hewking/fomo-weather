import { ExpoRoot } from 'expo-router';
import './src/styles/web.css';

// Fix TypeScript error by using any for require.context
const ctx = (require as any).context('./app');

export default function App() {
  return <ExpoRoot context={ctx} />;
}
