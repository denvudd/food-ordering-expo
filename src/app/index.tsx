import React from "react";
import { Link, Redirect } from "expo-router";
import Button from "@/components/ui/Button";
import { View } from "@/components/Themed";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { ActivityIndicator } from "react-native";

const IndexScreen = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/sign-in"} asChild>
        <Button text="Sign In" />
      </Link>
      <Link href={"/sign-up"} asChild>
        <Button text="Sign Up" />
      </Link>

      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default IndexScreen;
