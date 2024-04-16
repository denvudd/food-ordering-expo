import { FlatList, StyleSheet } from "react-native";
import React from "react";
import orders from "../../../../../assets/data/orders";
import OrderListItem from "@/components/modules/order/OrderListItem";

const OrdersScreen = () => {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
