import { queryClient } from "@/lib/query-client";
import { queryKeys } from "@/lib/query-keys";
import {
  connectWhatsapp,
  disconnectWhatsapp,
  getWhatsappStatus,
} from "@/services/whatsapp-service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useWhatsappConnection = () => {
  return useMutation({
    mutationFn: connectWhatsapp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.whatsapp.connectionStatus,
      });
    },
  });
};

export const useWhatsappStatus = () => {
  return useQuery({
    queryKey: queryKeys.whatsapp.connectionStatus,
    queryFn: getWhatsappStatus,
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

export const useDisconnectWhatsapp = () => {
  return useMutation({
    mutationFn: disconnectWhatsapp,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.whatsapp.connectionStatus,
      });
    },
  });
};
