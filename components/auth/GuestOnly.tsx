import { useAuth } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text } from "react-native";

interface UserOnlyProps {
  children: React.ReactNode;
}

const GuestOnly: React.FC<UserOnlyProps> = ({ children }) => {
  const { user, authChecked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [user, authChecked]);
  if (!authChecked || user) {
    return <Text>Loadding...</Text>;
  }
  return children;
};

export default GuestOnly;
