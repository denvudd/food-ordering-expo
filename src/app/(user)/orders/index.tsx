import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import React from "react";
import OrderListItem from "@/components/modules/order/OrderListItem";
import { useUserOrderList } from "@/api/orders";
import { Text } from "@/components/Themed";

const OrdersScreen = () => {
  const { data: orders, isLoading, error } = useUserOrderList();

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
