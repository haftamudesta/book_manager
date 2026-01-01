import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@/constants/colors";
import { Link } from "expo-router";
import ThemeCard from "@/components/ThemedCard";

const About = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <ThemeCard
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={styles.title}>About</Text>
      <Link href="/" style={styles.link}>
        Back to Home
      </Link>
    </ThemeCard>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    color: "white",
    borderRadius: 5,
    textDecorationLine: "none",
  },
});
