import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import orders from "../../../../assets/data/orders";
import OrderListItem from "@/components/modules/order/OrderListItem";
import OrderedProduct from "@/components/modules/order/OrderedProduct";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const order = orders.find((order) => order.id === +orderId);

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
});
