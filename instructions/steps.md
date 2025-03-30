
**Project Title:** Weather Data Visualization App

**Overall Goal:** Create a mobile app that fetches weather data, displays it in a chart and table, and handles user experience elements gracefully.

**Setup & Initialization**

*   **Step 1: Project Initialization**

    *   **Goal:** Create a new mobile app project.
    *   **Instructions:**
        1.  Choose a suitable mobile development framework (React Native, Flutter, Native Android/iOS - specify based on desired skills demonstration).  Assuming `React Native` for this example.
        2.  Initialize a new React Native project using `npx react-native init WeatherApp`.
        3.  Create a `.gitignore` file and exclude `node_modules`.
        4.  Install necessary dependencies:  `axios`, `react-native-chart-kit`.
    *   **Expected Outcome:** A new React Native project directory with basic dependencies installed.

*   **Step 2: Location Permission Request**

    *   **Goal:**  Request location permissions from the user.
    *   **Instructions:**
        1.  Install `react-native-geolocation-service` package: `npm install react-native-geolocation-service --save`
        2.  Implement a function to request `ACCESS_FINE_LOCATION` permission.
        3.  If permission is granted, call `Geolocation.getCurrentPosition` to get the device's latitude and longitude.
    *   **Expected Outcome:** App requests Location permission successfully. User either grants or denies the location access. If permission is granted, latitude and longitude are stored in state. If permission is denied or the service is unavailable display error message.

**Core Functionality: Data Fetching & Preparation**

*   **Step 3: API Data Fetching**

    *   **Goal:** Fetch weather data from the Open-Meteo API based on user location.
    *   **Instructions:**
        1.  Create an `async` function `fetchWeatherData(latitude, longitude)`
        2.  Use `axios` to make a `GET` request to the Open-Meteo API endpoint: `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
        3.  Handle potential errors (network issues, API errors) using `try...catch`.
        4.  Store the fetched data in a state variable (e.g., `weatherData`).
    *   **Expected Outcome:** Weather data (including `time` and `temperature_2m` arrays) is successfully fetched and stored in the `weatherData` state. If there's an error, an error message is displayed.

*   **Step 4: Data Transformation**

    *   **Goal:** Transform the raw API data into a format suitable for the chart and table components.
    *   **Instructions:**
        1.  Create a function `processWeatherData(weatherData)` that takes the `weatherData` API response as input.
        2.  Extract the `time` and `temperature_2m` arrays from the `weatherData.hourly` object.
        3.  Create an array of objects: `[{ hour: '00:00', temperature: 25.5 }, { hour: '01:00', temperature: 24.0 }, ...]`
        4.  Store the transformed data in a state variable (e.g., `processedData`).
    *   **Expected Outcome:**  The `processedData` state contains a well-formatted array of objects suitable for rendering the chart and table.

**UI Implementation**

*   **Step 5: Loading Skeleton**

    *   **Goal:** Implement a loading indicator (skeleton) while the data is being fetched.
    *   **Instructions:**
        1.  Create a state variable `isLoading`. Set it to `true` initially.
        2.  Wrap the main content (chart and table) with a conditional rendering block.
        3.  If `isLoading` is `true`, display a loading skeleton (simple animated placeholders).  Consider using libraries like `react-native-skeleton-placeholder`.
        4.  Set `isLoading` to `false` after the data is successfully fetched and processed.
    *   **Expected Outcome:**  A loading skeleton is displayed while the data is loading, then disappears when the data is ready.

*   **Step 6: Error Message Display**

    *   **Goal:** Display an error message if the data fetch fails.
    *   **Instructions:**
        1.  Create a state variable `errorMessage`.  Set it to `null` initially.
        2.  In the `catch` block of the `fetchWeatherData` function, set `errorMessage` to a user-friendly error message (e.g., "Failed to fetch weather data. Please check your internet connection and try again.").
        3.  Conditionally render the error message in the UI.
        4.  Optional: Implement a "Retry" button that triggers another data fetch attempt.
    *   **Expected Outcome:** If data fetching fails, a clear error message is displayed in the UI.

*   **Step 7: Chart Creation**

    *   **Goal:** Display the temperature data in a line chart.
    *   **Instructions:**
        1.  Use `react-native-chart-kit` to create a line chart component.
        2.  Configure the chart with the `processedData` (time as labels, temperature as data points).
        3.  Customize the chart appearance (colors, grid lines, labels) as desired.
        4.  Ensure the chart is responsive by setting its width to `Dimensions.get('window').width`.
    *   **Expected Outcome:** A responsive line chart displaying the hourly temperature data.

*   **Step 8: Table Creation**

    *   **Goal:** Display the temperature data in a scrollable table.
    *   **Instructions:**
        1.  Use a `ScrollView` component to make the table scrollable.
        2.  Create a `Table` component using `View`.
        3.  Create `TableRow` and `TableCell` components using `View`.
        4.  Render the `processedData` in the table, with columns for "Hour" and "Temperature (°C)".
        5.  Apply styling for a clear table layout (borders, padding, font sizes).
    *   **Expected Outcome:** A scrollable table displaying the hourly temperature data and time.

**Refinement and Error Handling**

*   **Step 9: Implement Retries/Fallbacks**

    *   **Goal:** Implement a retry mechanism to handle occasional network issues.
    *   **Instructions:**
        1.  Implement retry logic the `fetchWeatherData` function, perhaps with exponential backoff (e.g., retry after 1 second, then 2 seconds, then 4 seconds).  Limit the number of retries.
        2.  As a fallback, consider storing a few days' worth of weather data locally (using AsyncStorage or a similar local storage mechanism). If the API is unavailable, display the locally cached data.
    *   **Expected Outcome:** The app attempts to retry data fetching if it fails initially. If the API remains unavailable, the app displays cached data (if available).

**Deliverables & Documentation**

*   **Step 10: Code Cleanup and Documentation**

    *   **Goal:**  Organize the codebase, add comments, and create a README.
    *   **Instructions:**
        1.  Refactor code for clarity and maintainability.
        2.  Add comments to explain key logic and components.
        3.  Create a `README.md` file with:
            *   Project description
            *   Instructions on how to run the app (dependencies, setup, build steps).
            *   Explanation of the app's functionality.
            *   List of libraries used.
            *   Any known issues or limitations.
    *   **Expected Outcome:**  A clean, well-documented codebase with clear instructions for running and testing the app.

**Advanced Features (Optional)**

*   **Step A1: Chart Interactivity**

    *   **Goal:** Make the chart interactive (pinch-to-zoom, tap for details).
    *   **Instructions:**
        1.  Explore the `react-native-chart-kit` documentation for interactive chart features.
        2.  Implement pinch-to-zoom functionality.
        3.  Implement tap/click event handling to display more details about a specific data point (e.g., show the exact time and temperature in a pop-up).
    *   **Expected Outcome:** The user can interact with the chart to zoom in and out and view details about specific data points.

*   **Step A2: UI Animations**

    *   **Goal:** Add smooth animations to enhance the UI/UX.
    *   **Instructions:**
        1.  Use the `Animated` API in React Native to create animations.
        2.  Animate transitions between screens, loading states, or button presses.
        3.  Use subtle animations to create a polished and engaging user experience.
    *   **Expected Outcome:** The app includes smooth and visually appealing animations for UI elements.

*   **Step A3: Background Tasks**

    *   **Goal:** Implement background tasks for data syncing.
    *   **Instructions:**
        1.  Explore libraries like `react-native-background-fetch` or similar for background task scheduling.
        2.  Implement a background task that fetches weather data periodically and updates the local cache.
        3.  Be mindful of battery usage and optimize the background task schedule.  Use a library like `react-native-notifier` to display a notification upon background update.
    *   **Expected Outcome:** The app periodically syncs weather data in the background, ensuring that the user always has up-to-date information, even when the app is not actively running.

**Final Step:**

*   **Step F1: Git Repository Creation and Submission**

    *   **Goal:** Create a Git repository and submit the project link.
    *   **Instructions:**
        1.  Create a new Git repository (e.g., on GitHub or GitLab).
        2.  Commit the project's code to the repository.
        3.  Provide the link to the Git repository.
    *   **Expected Outcome:** The complete source code for the weather data visualization app is available in a Git repository.

This detailed breakdown provides a clear path for an AI programming agent to follow, with specific instructions and expected outcomes for each step. Good luck!
