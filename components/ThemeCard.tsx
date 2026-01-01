import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
  StyleProp,
  ViewProps,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

interface ThemeCardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  elevation?: number;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  style,
  children,
  elevation = 0,
  ...props
}) => {
  const themeScheme = useColorScheme();
  const theme = themeScheme ? Colors[themeScheme] : Colors.light;

  const shadowStyle =
    elevation > 0
      ? {
          shadowColor: theme.text,
          shadowOffset: { width: 0, height: elevation },
          shadowOpacity: 0.1,
          shadowRadius: elevation * 0.5,
          elevation: elevation,
        }
      : {};

  return (
    <View
      style={[
        { backgroundColor: theme.uiBackground },
        styles.card,
        shadowStyle,
        style,
      ]}
      {...props}
    />
  );
};

export default ThemeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
  },
});
