import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { InsertTables, Order } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({
  archived = false,
}: { archived?: boolean } = {}) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Deliviring"];

  return useQuery({
    queryKey: ["orders", archived],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useUserOrderList = () => {
  const { session } = useAuth();
  const userId = session?.user.id;

  return useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) return undefined;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useOrder = (orderId: number) => {
  return useQuery({
    queryKey: ["orderId", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", orderId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data as Order;
    },
  });
};

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    mutationKey: ["insertOrder"],
    mutationFn: async (data: InsertTables<"orders">) => {
      const { data: newProduct, error } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newProduct;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { error, data: newProduct } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};
