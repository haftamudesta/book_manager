import Spacer from "@/components/Spacer";
import ThemedText from "@/components/Themedtext";
import ThemedView from "@/components/Themedview";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import ThemedButton from "@/components/ThemedButton";
import ThemedTextInput from "@/components/ThemedTextInput";
import { useAuth } from "@/hooks/useUser";
import { Colors } from "@/constants/colors";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setError("");
      if (!name.trim() || !email.trim() || !password.trim()) {
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
      await signUp(name, email, password);
      router.replace("/sign_in");
    } catch (error) {
      setError(`Error, Sign up failed. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={false} style={styles.container}>
        <Spacer height={24} />
        <ThemedText bold={true} variant="heading" style={styles.title}>
          Sign Up To Get Started
        </ThemedText>
        <Spacer height={24} />
        <ThemedTextInput
          placeholder="Enter your name"
          style={{ width: "95%" }}
          onChangeText={setName}
          value={name}
        />
        <Spacer height={12} />
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

        <ThemedButton
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#f2f2f2" />
          ) : (
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          )}
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
        <Spacer height={12} />
        {error && <ThemedText></ThemedText>}
      </ThemedView>
    </TouchableWithoutFeedback>
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
  button: {
    width: "100%",
    minHeight: 50,
    marginBottom: 24,
    justifyContent: "center",
  },
  buttonText: {
    color: "#f2f2f2",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: Colors.warning,
    padding: 10,
    backgroundColor: "#f5c1c8",
    borderColor: Colors.warning,
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 10,
  },
});
