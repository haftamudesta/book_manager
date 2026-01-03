import Spacer from "@/components/Spacer";
import ThemedText from "@/components/Themedtext";
import ThemedView from "@/components/Themedview";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const SignUp = () => {
  return (
    <ThemedView style={styles.container}>
      <Spacer height={24} />
      <ThemedText bold={true} variant="heading" style={styles.title}>
        Sign Up To Get Started
      </ThemedText>
      <Spacer height={24} />

      <ThemedText>
        Have an account? Please{" "}
        <Link href="/sign_in" style={styles.link}>
          Sign In
        </Link>
      </ThemedText>
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
    color: "blue",
  },
});
