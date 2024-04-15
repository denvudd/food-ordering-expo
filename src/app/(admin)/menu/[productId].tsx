import React from "react";
import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "../../../../assets/data/products";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { defaultPizzaImage } from "@/components/modules/ProductListItem";
import Button from "@/components/ui/Button";
import { PizzaSize, Product } from "@/types";
import { useCart } from "@/hooks/useCart";

interface ProductDetailsScreenProps {}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({}) => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const { handleAddItem } = useCart();

  const product = products.find(
    (product) => product.id.toString() === productId
  );

  console.log(productId)

  if (!product) {
    return <Text>Product not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container, { padding: 0 }]}>
        <Stack.Screen options={{ title: product?.name }} />

        <Image
          style={styles.image}
          source={{ uri: product.image || defaultPizzaImage }}
        />
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.title}>{product.name}</Text>
      </ScrollView>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: "auto",
  },
});
