import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import { DismissKeyboardView } from "@/components/common/DismissKeyboard";
import { defaultPizzaImage } from "@/components/modules/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

const CreateProductScreen = () => {
  const router = useRouter();
  const { productId } = useLocalSearchParams();
  const parsedProductId = productId
    ? parseFloat(typeof productId === "string" ? productId : productId[0])
    : undefined;
  const isEditing = !!productId;

  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [errors, setErrors] = React.useState<string>("");
  const [image, setImage] = React.useState<string | null>(null);

  const { data: existingProduct, isLoading: isExistingProductLoading } =
    useProduct(parsedProductId as number, !!parsedProductId);
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  React.useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setPrice(existingProduct.price);
      setImage(existingProduct.image);
    }
  }, [existingProduct]);

  const resetFields = () => {
    setName("");
    setPrice(0);
  };

  const validateFields = () => {
    if (!name) {
      setErrors("Name is required");
      return false;
    }

    if (!price) {
      setErrors("Price is required");
      return false;
    }

    if (price <= 0) {
      setErrors("Price must be greater than 0");
      return false;
    }

    return true;
  };

  const handleUpdateProduct = async () => {
    if (!validateFields()) {
      return undefined;
    }

    const imagePath = await uploadImage();

    updateProduct(
      {
        id: parsedProductId as number,
        name,
        price,
        image: imagePath,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  const createProduct = async () => {
    if (!validateFields()) {
      return undefined;
    }

    const imagePath = await uploadImage();

    insertProduct(
      {
        name,
        price,
        image: imagePath,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  const handleSubmit = async () => {
    if (isEditing) {
      await handleUpdateProduct();
    } else {
      await createProduct();
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteProduct(parsedProductId as number, {
            onSuccess: () => {
              router.replace("/(admin)");
            },
          });
        },
      },
    ]);
  };

  if (isExistingProductLoading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <Stack.Screen
        options={{ title: isEditing ? "Edit Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={handlePickImage} style={styles.selectImageButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Margherita"
        value={name}
        style={styles.input}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        keyboardType="numeric"
        value={price.toString()}
        onChangeText={(value) => setPrice(parseFloat(value))}
        style={styles.input}
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button
        text={isEditing ? "Update Product" : "Create Product"}
        onPress={handleSubmit}
      />
      {isEditing && (
        <Text onPress={handleConfirmDelete} style={styles.selectImageButton}>
          Delete Product
        </Text>
      )}
    </DismissKeyboardView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  selectImageButton: {
    alignSelf: "center",
    fontWeight: "600",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});
