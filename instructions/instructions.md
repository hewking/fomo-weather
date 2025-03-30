**Objective:**

Build a mobile app that fetches weather data from an API and displays:

1.  A chart showing the temperature variation over time.
2.  A table listing the temperatures.

**Test Instructions:**

1.  **Use the following Open-Meteo API endpoint to fetch the weather data:**

    [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs)

    Example: [https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m](https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m)

2.  **Basic Requirements**

    1.  Display the current weather based on the user's location.
    2.  **Chart:** Show a line chart that displays hourly temperature.
    3.  **Table:** Display the temperature data in a table format, with columns for "Hour" and "Temperature (°C)".
    4.  **UI/UX**
        1.  The app should display a loading skeleton while the data is being fetched.
        2.  If the data fetch fails, the app should display an error message.
        3.  The chart should be responsive, adjusting well to different screen sizes and orientation.
        4.  The table should be scrollable.
        5.  Implement retries or fallbacks when network issues occur.

3.  **Advanced Requirements - These are optional but can be implemented to demonstrate your skills.**

    1.  The chart should be interactive with pinch-to-zoom or tap for more details.
    2.  Create smooth and custom animations to enhance the UI/UX, such as transitions between screens or animated buttons.
    3.  Implement background tasks for operations like syncing data, fetching updates, or sending notifications when the app is in the background.

**Expected Deliverables:**

1.  Fully functional app that meets the basic requirements above.
2.  A clean and well-organized codebase.
3.  Follow the best coding practices and maintainability principles.
4.  Clear README or instructions on how to run the app, install dependencies, and test it.
5.  Please provide a link to your Git repository.