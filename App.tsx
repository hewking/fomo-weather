import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import "../src/styles/web.css";

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f8fafc",
  },
  webHeader: {
    backgroundColor: "#f8fafc",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: Platform.OS === "web" ? styles.webHeader : styles.header,
            headerTintColor: "#1e293b",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Weather App",
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
