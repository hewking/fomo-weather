# FOMO Weather

A beautiful and intuitive weather app built with React Native and Expo, providing real-time weather data and forecasts using the Open-Meteo API.

## 🌟 Features

- 📍 Real-time weather data based on user's location
- 📊 Interactive temperature chart with pinch-to-zoom
- 📱 Detailed hourly weather table with smart time display
- 🔄 Pull-to-refresh functionality
- 🌙 Dark mode support
- 🎨 Beautiful animations and transitions
- 📱 iOS and Android optimized UI
- 🔍 Smart error handling and retry mechanism

## 🛠 Tech Stack

- React Native
- Expo SDK
- TypeScript
- Zustand (State Management)
- React Native Chart Kit
- React Native Reanimated
- React Native Gesture Handler
- Open-Meteo API
- Vercel (Web Deployment)

## 📦 Prerequisites

- Node.js >= 18.18
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)
- Vercel CLI (for deployment)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fomo-weather.git
   cd fomo-weather
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```bash
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the development server:
   ```bash
   npx expo start
   ```

5. Run on your device:
   - iOS: Scan the QR code with your iPhone's camera
   - Android: Scan the QR code with the Expo Go app
   - Web: Press 'w' to open in web browser

## 📱 Running on Simulators

- iOS Simulator:
  ```bash
  npx expo run:ios
  ```
- Android Emulator:
  ```bash
  npx expo run:android
  ```

## 🏗 Project Structure

```
.
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab navigation screens
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable components
│   ├── WeatherChart.tsx   # Temperature chart component
│   ├── WeatherTable.tsx   # Hourly weather table
│   └── Card.tsx          # Reusable card component
├── services/             # API services
│   └── weather.ts        # Open-Meteo API integration
├── store/                # State management
│   └── weatherStore.ts   # Zustand store
├── constants/            # App constants
│   └── theme.ts         # Theme configuration
├── types/                # TypeScript types
└── assets/              # Images and other assets
```

## 🔌 API Integration

This app uses the Open-Meteo API for weather data:
- Base URL: https://api.open-meteo.com/v1
- Endpoint: /forecast
- Parameters:
  - latitude
  - longitude
  - hourly: temperature_2m, relativehumidity_2m, weathercode
  - timezone: auto

## 🧪 Testing

1. Run unit tests:
   ```bash
   npm test
   ```

2. Run e2e tests:
   ```bash
   npm run e2e
   ```

## 📦 Building for Production

### Web Build

1. Development build:
   ```bash
   npm run build:web
   ```

2. Production build (unminified):
   ```bash
   npm run build:web:prod
   ```

3. Preview build locally:
   ```bash
   npm run serve:web
   ```

Build output will be in the `dist` directory.

### Build Configuration

The app uses the following configuration files:

1. `app.config.js`:
   ```javascript
   module.exports = {
     name: 'FOMO Weather',
     slug: 'fomo-weather',
     version: '1.0.0',
     orientation: 'portrait',
     icon: './assets/icon.png',
     userInterfaceStyle: 'automatic',
     splash: {
       image: './assets/splash.png',
       resizeMode: 'contain',
       backgroundColor: '#ffffff'
     },
     assetBundlePatterns: ['**/*'],
     ios: {
       supportsTablet: true
     },
     android: {
       adaptiveIcon: {
         foregroundImage: './assets/adaptive-icon.png',
         backgroundColor: '#ffffff'
       }
     },
     web: {
       favicon: './assets/favicon.png',
       bundler: 'metro'
     },
     plugins: ['expo-router'],
     scheme: 'fomo-weather'
   };
   ```

2. `package.json` scripts:
   ```json
   {
     "scripts": {
       "build:web": "expo export",
       "build:web:prod": "expo export --no-minify",
       "serve:web": "serve dist"
     }
   }
   ```

3. `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build:web",
     "outputDirectory": "dist",
     "framework": "expo",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ],
     "env": {
       "GOOGLE_MAPS_API_KEY": "@google_maps_api_key"
     }
   }
   ```

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Add environment variables to Vercel:
   ```bash
   vercel env add GOOGLE_MAPS_API_KEY
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. For production deployment:
   ```bash
   vercel --prod
   ```

### Troubleshooting

If you encounter build issues:

1. Clear cache:
   ```bash
   expo start --clear
   ```

2. Reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. Check environment variables:
   - Ensure `.env` file exists with required variables
   - Verify environment variables are properly loaded in Vercel
   - Check Vercel deployment logs for any errors

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open-Meteo API](https://open-meteo.com/) for providing free weather data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for the cross-platform framework
- [Vercel](https://vercel.com/) for the deployment platform
