import Spacer from "@/components/Spacer";
import ThemedText from "@/components/Themedtext";
import ThemedView from "@/components/Themedview";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import ThemedButton from "@/components/ThemedButton";

const SignUp = () => {
  const handleSubmit = () => {
    console.log("pressed");
  };
  return (
    <ThemedView style={styles.container}>
      <Spacer height={24} />
      <ThemedText bold={true} variant="heading" style={styles.title}>
        Sign Up To Get Started
      </ThemedText>
      <Spacer height={24} />

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2", textAlign: "center" }}>Sin Up</Text>
      </ThemedButton>
      <Spacer height={24} />
      <ThemedText>
        Have an account? Please{" "}
        <Link href="/sign_in" style={styles.link}>
          Sign In
        </Link>
      </ThemedText>
      <Spacer height={12} />
      <Link href="/" style={styles.link}>
        Back to Home
      </Link>
    </ThemedView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 30,
  },
  link: {
    backgroundColor: "#0ea5e9",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: "center",
    fontWeight: "500",
    width: "100%",
    fontSize: 16,
  },
});
