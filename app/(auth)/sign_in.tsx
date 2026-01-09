import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import ThemedView from "@/components/Themedview";
import ThemedText from "@/components/Themedtext";
import Spacer from "@/components/Spacer";
import { Link } from "expo-router";
import ThemedButton from "@/components/ThemedButton";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useAuth } from "@/hooks/useUser";
import { Colors } from "@/constants/colors";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");
      if (!email.trim() || !password.trim()) {
        setError("Error,Please fill in all fields");
        return;
      }
      if (password.length < 8) {
        setError("Error, Invalid credentials");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Error,Please enter a valid email address");
        return;
      }
      setIsSubmitting(true);
      await signIn(email, password);
    } catch (error) {
      setError(`Error, Sign up failed. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <ThemedView safe={false} style={styles.container}>
      <Spacer height={24} />
      <ThemedText bold={true} variant="heading" style={styles.title}>
        Sign In To Start
      </ThemedText>
      <Spacer height={24} />
      <ThemedTextInput
        placeholder="Enter your email"
        style={{ width: "95%" }}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Spacer height={12} />
      <ThemedTextInput
        placeholder="Enter your password"
        style={{ width: "95%" }}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Spacer height={12} />
      {error && <Text style={styles.error}>{error}</Text>}

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2", textAlign: "center" }}>Sin In</Text>
      </ThemedButton>
      <Spacer height={24} />

      <ThemedText>
        Don't have an account?Please{" "}
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
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: "#f5c1c8",
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 24,
    marginHorizontal: 10,
  },
});
