import React from "react";
import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "../../../../assets/data/products";
import { Image, Pressable, StyleSheet } from "react-native";
import { defaultPizzaImage } from "@/components/modules/ProductListItem";
import Button from "@/components/ui/Button";

interface ProductDetailsScreenProps {}

const sizes = ["S", "M", "L", "XL"] as const;

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({}) => {
  const { productId } = useLocalSearchParams();
  const product = products.find(
    (product) => product.id.toString() === productId
  );

  const [selectedSize, setSelectedSize] =
    React.useState<(typeof sizes)[number]>("M");

  if (!product) {
    return <Text>Product not found.</Text>;
  }

  const handleAddToCart = () => {}

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />

      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
      />

      <Text style={styles.selectLabel}>Select size:</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            key={size}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? "gainsboro" : "white",
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? "black" : "gray",
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add to cart" onPress={handleAddToCart} />
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
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: "auto",
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
