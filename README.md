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

## 📦 Prerequisites

- Node.js >= 18.18
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/hewking/fomo-weather.git
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

1. Build for iOS:
   ```bash
   eas build --platform ios
   ```

2. Build for Android:
   ```bash
   eas build --platform android
   ```

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
