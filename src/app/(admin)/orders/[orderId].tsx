import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import OrderListItem from "@/components/modules/order/OrderListItem";
import OrderedProduct from "@/components/modules/order/OrderedProduct";
import { OrderStatus, OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";
import { useOrder, useUpdateOrder } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/subscription";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams();
  const parsedOrderId = parseFloat(
    typeof orderId === "string" ? orderId : orderId[0]
  );

  const { data: order, isLoading, error } = useOrder(parsedOrderId);
  const { mutate: updateOrder } = useUpdateOrder();
  useUpdateOrderSubscription(parsedOrderId)

  const updateStatus = (status: OrderStatus) => {
    updateOrder({
      id: parsedOrderId,
      updatedFields: {
        status,
      },
    });
  };

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
