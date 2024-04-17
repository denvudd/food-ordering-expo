import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const useInsertOrderSubscription = () => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};

export const useUpdateOrderSubscription = (orderId: number) => {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        }
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
