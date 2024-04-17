import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import OrderListItem from "@/components/modules/order/OrderListItem";
import OrderedProduct from "@/components/modules/order/OrderedProduct";
import { useOrder } from "@/api/orders";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const parsedOrderId = parseFloat(
    typeof orderId === "string" ? orderId : orderId[0]
  );
  const { data: order, isLoading, error } = useOrder(parsedOrderId);

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  if (error) {
    return <Text>Failed to fetch product</Text>;
  }

  if (!order) {
    return <Text>Order not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${orderId}` }} />
      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderedProduct order={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 20,
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});
