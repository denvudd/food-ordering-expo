import React from "react";
import { Text, View } from "@/components/Themed";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "../../../../assets/data/products";
import { Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { defaultPizzaImage } from "@/components/modules/ProductListItem";
import Button from "@/components/ui/Button";
import { PizzaSize, Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useProduct } from "@/api/products";
import { ActivityIndicator } from "react-native";

interface ProductDetailsScreenProps {}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({}) => {
  const { productId } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const parsedProductId = parseFloat(
    typeof productId === "string" ? productId : productId[0]
  );
  const { data: product, error, isLoading } = useProduct(parsedProductId);

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  if (error) {
    return <Text>Failed to fetch product</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={`/(admin)/menu/create?productId=${productId}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
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
  loader: {
    flex: 1,
    justifyContent: "center",
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
