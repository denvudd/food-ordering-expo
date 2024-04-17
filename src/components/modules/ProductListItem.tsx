import { StyleSheet, Image, Pressable } from "react-native";
import { Link, useSegments } from "expo-router";
import Colors from "@/constants/Colors";
import { Text } from "../Themed";
import { Tables } from "@/database.types";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">;
};

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const definedPath = segments[0] as "(user)" | "(admin)";

  return (
    <Link href={`/${definedPath}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          style={styles.image}
          path={product?.image}
          fallback={defaultPizzaImage}
        />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: "50%",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});
