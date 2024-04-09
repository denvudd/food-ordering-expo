import { Stack } from "expo-router";
import React from "react";

interface MenuLayoutProps {}

const MenuLayout: React.FC<MenuLayoutProps> = ({}) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Menu" }} />
    </Stack>
  );
};

export default MenuLayout;
