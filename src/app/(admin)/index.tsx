import { StyleSheet } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const TabsIndexScreen = () => {
  return (
    <Redirect href={`/(admin)/menu/`} />
  );
};

export default TabsIndexScreen;

const styles = StyleSheet.create({});
