import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const TobTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

const OrdersListLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TobTabs>
        <TobTabs.Screen name="index" options={{ title: "Active" }} />
      </TobTabs>
    </SafeAreaView>
  );
};

export default OrdersListLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    backgroundColor: "white",
  },
});
