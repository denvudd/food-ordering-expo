import React from "react";
import { Text, View } from "@/components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "../../../../assets/data/products";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { defaultPizzaImage } from "@/components/modules/ProductListItem";
import Button from "@/components/ui/Button";
import { PizzaSize } from "@/types";
import { useCart } from "@/hooks/useCart";
import { useProduct } from "@/api/products";

interface ProductDetailsScreenProps {}

const sizes = ["S", "M", "L", "XL"] as const;

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({}) => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const { handleAddItem } = useCart();

  const parsedProductId = parseFloat(
    typeof productId === "string" ? productId : productId[0]
  );
  const { data: product, error, isLoading } = useProduct(parsedProductId);

  const [selectedSize, setSelectedSize] = React.useState<PizzaSize>("M");

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  if (error) {
    return <Text>Failed to fetch product</Text>;
  }

  const handleAddToCart = () => {
    if (!product) return undefined;

    handleAddItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container, { padding: 0 }]}>
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
                  backgroundColor:
                    selectedSize === size ? "gainsboro" : "white",
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
        <Text style={styles.title}>{product.name}</Text>
        <Button text="Add to cart" onPress={handleAddToCart} />
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
  loader: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 10,
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
