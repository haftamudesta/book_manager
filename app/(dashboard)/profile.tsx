import { StyleSheet, Text } from "react-native";
import Spacer from "../../components/Spacer";
import { useAuth } from "@/hooks/useUser";

import ThemedText from "@/components/Themedtext";
import ThemedView from "@/components/Themedview";
import ThemedButton from "@/components/ThemedButton";
const Profile = () => {
  const { user, signOut } = useAuth();

  const HandleSignOut = async () => {
    await signOut();
  };
  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText bold={true} style={styles.heading}>
        {user?.email}
      </ThemedText>
      <Spacer />
      <ThemedText>Time to start reading some books...</ThemedText>
      <Spacer />
      <ThemedButton onPress={HandleSignOut}>
        <Text style={styles.sign_out}>Sign Out</Text>
      </ThemedButton>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  sign_out: {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
  },
});
