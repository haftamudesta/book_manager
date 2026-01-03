import { StyleSheet } from "react-native";
import React from "react";
import ThemedView from "@/components/Themedview";
import ThemedText from "@/components/Themedtext";
import Spacer from "@/components/Spacer";
import { Link } from "expo-router";

const SignIn = () => {
  return (
    <ThemedView style={styles.container}>
      <Spacer height={24} />
      <ThemedText bold={true} variant="heading" style={styles.title}>
        Sign In To Start
      </ThemedText>
      <Spacer height={24} />

      <ThemedText>
        Have't an account?Please{" "}
        <Link href="/sign_up" style={styles.link}>
          Register
        </Link>
      </ThemedText>
      <Spacer height={12} />
      <Link href="/" style={styles.link}>
        Back to Home
      </Link>
    </ThemedView>
  );
};

export default SignIn;

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
