import { Image, StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import { OrderItem } from "@/types";
import { defaultPizzaImage } from "../ProductListItem";
import Colors from "@/constants/Colors";
import RemoteImage from "../RemoteImage";

interface OrderedProductProps {
  order: OrderItem;
}

const OrderedProduct: React.FC<OrderedProductProps> = ({ order }) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        style={styles.image}
        path={order.products?.image}
        fallback={defaultPizzaImage}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{order.products.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${order.products.price.toFixed(2)}</Text>
          <Text>Size: {order.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{order.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderedProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
    paddingRight: 5,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
    marginRight: 1,
  },
});
