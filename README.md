# FOMO Weather

A beautiful weather app built with React Native and Expo that displays temperature data using the Open-Meteo API.

## Features

- Real-time weather data based on user's location
- Interactive temperature chart
- Detailed temperature table
- Pull-to-refresh functionality
- Error handling and retry mechanism
- Responsive design

## Tech Stack

- React Native
- Expo
- TypeScript
- Zustand (State Management)
- React Native Chart Kit
- Open-Meteo API

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Run on your device:
   - iOS: Scan the QR code with your iPhone's camera
   - Android: Scan the QR code with the Expo Go app
   - Web: Press 'w' to open in web browser

## Project Structure

```
.
├── app/                    # App screens and navigation
├── components/            # Reusable components
├── services/             # API services
├── store/                # State management
├── types/                # TypeScript types
└── assets/              # Images and other assets
```

## API Integration

This app uses the Open-Meteo API for weather data:
- Base URL: https://api.open-meteo.com/v1
- Endpoint: /forecast
- Parameters: latitude, longitude, hourly=temperature_2m

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
