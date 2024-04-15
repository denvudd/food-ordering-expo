import { Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import Button from "@/components/ui/Button";
import { DismissKeyboardView } from "@/components/common/DismissKeyboard";
import { defaultPizzaImage } from "@/components/modules/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const CreateProductScreen = () => {
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [errors, setErrors] = React.useState<string>("");
  const [image, setImage] = React.useState<string | null>(null);

  const handleResetFields = () => {
    setName("");
    setPrice(0);
  };

  const handleValidateFields = () => {
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

  const handleCreateProduct = () => {
    if (!handleValidateFields()) {
      return undefined;
    }

    handleResetFields();
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

  return (
    <DismissKeyboardView style={styles.container}>
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
        style={styles.input}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        keyboardType="numeric"
        onChangeText={(value) => setPrice(+value)}
        style={styles.input}
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text="Create" onPress={handleCreateProduct} />
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