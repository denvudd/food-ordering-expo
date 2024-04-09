import React from "react";
import { Text, View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet } from "react-native";
import { useCart } from "@/hooks/useCart";
import CartListItem from "@/components/modules/cart/CartListItem";
import Button from "@/components/ui/Button";

const CartScreen = () => {
  const { items, total } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.total}>Total:</Text>
        <Text style={styles.total}>${total}</Text>
      </View>
      <Button text="Checkout" />

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
    padding: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: "500",
  },
});
