import { StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/colors";
import UserOnly from "@/components/auth/UserOnly";
import { BooksProvider } from "@/contexts/BookContext";

const DashboardLayout = () => {
  const themeScheme = useColorScheme();
  const theme = themeScheme ? Colors[themeScheme] : Colors.light;

  return (
    <UserOnly>
      <BooksProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.background,
              borderTopColor: "#E5E5E5",
              borderTopWidth: 1,
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
              elevation: 0,
              shadowOpacity: 0,
            },
            tabBarActiveTintColor:
              theme.iconColorFocused || theme.iconColorFocused || "#007AFF",
            tabBarInactiveTintColor: theme.iconColor || "#8E8E93",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
              marginBottom: 4,
            },
            tabBarIconStyle: {
              marginTop: 4,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="books"
            options={{
              title: "Books",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "book" : "book-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ color, size, focused }) => (
                <View style={styles.createButton}>
                  <Ionicons
                    name={focused ? "add-circle" : "add-circle-outline"}
                    size={32}
                    color={color}
                  />
                </View>
              ),
              tabBarLabel: () => null,
            }}
          />

          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "search" : "search-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </BooksProvider>
    </UserOnly>
  );
};

export default DashboardLayout;

const styles = StyleSheet.create({
  createButton: {
    position: "absolute",
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
