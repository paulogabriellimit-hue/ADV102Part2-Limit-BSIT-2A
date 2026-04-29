import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007BFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Minesweeper",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
