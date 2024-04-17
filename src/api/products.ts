import { supabase } from "@/lib/supabase";
import { InsertTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useProduct = (productId: number) => {
  return useQuery({
    queryKey: ["productId", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["insertProduct"],
    mutationFn: async (data: InsertTables<"products">) => {
      const { data: newProduct, error } = await supabase
        .from("products")
        .insert(data)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["insertProduct"],
    mutationFn: async (data: {
      id: number;
      name: string;
      image: string | null;
      price: number;
    }) => {
      const { data: newProduct, error } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq("id", data.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
    onSuccess: async (_, data) => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["productId", data.id],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (productId: number) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
