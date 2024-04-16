import { FlatList, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";
import orders from "../../../../assets/data/orders";
import OrderListItem from "@/components/modules/order/OrderListItem";
import OrderedProduct from "@/components/modules/order/OrderedProduct";
import { OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";

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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => {}}
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
});