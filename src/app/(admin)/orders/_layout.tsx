import React from "react";
import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

const MenuLayout: React.FC = ({}) => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name="list" options={{ title: "Orders" }} />
    </Stack>
  );
};

export default MenuLayout;
