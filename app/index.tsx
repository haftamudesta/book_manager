import { Text, View, StyleSheet, Image } from "react-native";
import logo from "../assets/img/logo_light.png";
import { Link } from "expo-router";
import ThemedView from "@/components/Themedview";

export default function Home() {
  console.log("index");
  return (
    <ThemedView style={styles.container}>
      <Image source={logo} />
      <Text style={styles.title}>The Number 1</Text>
      <Text>Reading List App</Text>
      <Link href="/about">About Page</Link>
      <Link href="/contact">Contact Page</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
