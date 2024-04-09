import React from "react";
import { Text, View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet } from "react-native";
import { useCart } from "@/hooks/useCart";
import CartListItem from "@/components/modules/cart/CartListItem";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
