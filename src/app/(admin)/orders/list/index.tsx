import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import React from "react";
import OrderListItem from "@/components/modules/order/OrderListItem";
import { useAdminOrderList } from "@/api/orders";
import { Text } from "@/components/Themed";

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList();

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
      contentContainerStyle={{ padding: 10, gap: 10 }}
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
