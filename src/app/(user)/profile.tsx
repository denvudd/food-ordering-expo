import { View } from "@/components/Themed";
import { supabase } from "@/lib/supabase";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
  },
});
