import { View } from "@/components/Themed";
import products from "../../../assets/data/products";
import ProductListItem from "@/components/modules/ProductListItem";
import { FlatList, StyleSheet } from "react-native";

export default function ProductDetailsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
