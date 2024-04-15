import React from "react";
import { Link } from "expo-router";
import Button from "@/components/ui/Button";
import { View } from "@/components/Themed";

const IndexScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
    </View>
  );
};

export default IndexScreen;
