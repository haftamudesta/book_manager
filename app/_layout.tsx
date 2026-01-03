import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "@/constants/colors";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.navBackground,
          },
          headerTintColor: theme.title,
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="(dashboard)"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </>
  );
}
