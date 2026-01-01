import { Colors } from "@/constants/colors";
import {
  useColorScheme,
  View,
  ViewStyle,
  StyleProp,
  ViewProps,
} from "react-native";
import React from "react";

interface ThemedViewProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
}

const ThemedView: React.FC<ThemedViewProps> = ({ style, ...props }) => {
  const colorScheme = useColorScheme();

  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  );
};

export default ThemedView;
