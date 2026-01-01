import {
  StyleSheet,
  useColorScheme,
  Image,
  ImageStyle,
  StyleProp,
  ImageProps,
} from "react-native";
import React from "react";
import lightLogo from "../assets/img/logo_light.png";
import darkLogo from "../assets/img/logo_dark.png";

interface ThemedLogoProps extends Omit<ImageProps, "source"> {
  style?: StyleProp<ImageStyle>;
  defaultTo?: "light" | "dark";
  size?: number | { width: number; height: number };
  forceTheme?: "light" | "dark";
}

const ThemedLogo: React.FC<ThemedLogoProps> = ({
  style,
  defaultTo = "light",
  size,
  forceTheme,
  ...props
}) => {
  const colorScheme = useColorScheme();

  let logo;
  if (forceTheme) {
    logo = forceTheme === "dark" ? darkLogo : lightLogo;
  } else {
    const theme = colorScheme || defaultTo;
    logo = theme === "dark" ? darkLogo : lightLogo;
  }

  const sizeStyle = size
    ? typeof size === "number"
      ? { width: size, height: size }
      : { width: size.width, height: size.height }
    : {};

  return (
    <Image
      source={logo}
      style={[styles.base, sizeStyle, style]}
      accessibilityLabel="App Logo"
      {...props}
    />
  );
};

export default ThemedLogo;

const styles = StyleSheet.create({
  base: {
    resizeMode: "contain",
  },
});
