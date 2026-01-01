import { StyleSheet, useColorScheme, Image } from "react-native";
import React from "react";
import lightLogo from "../assets/img/logo_light.png";
import darkLogo from "../assets/img/logo_dark.png";

const ThemedLogo = () => {
  const colorScheme = useColorScheme();
  const logo = colorScheme === "dark" ? darkLogo : lightLogo;
  return <Image source={logo} />;
};

export default ThemedLogo;

const styles = StyleSheet.create({});
