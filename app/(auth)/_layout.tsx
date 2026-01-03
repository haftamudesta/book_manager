import { Stack } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { Colors } from "@/constants/colors";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      ></Stack>
    </>
  );
}
