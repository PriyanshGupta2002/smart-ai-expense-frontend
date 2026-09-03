import { queryKeys } from "@/lib/query-keys";
import { googleAccountConnectionStatus } from "@/services/google-service";
import { useQuery } from "@tanstack/react-query";

export const useGoogleConnectionStatus = () => {
  return useQuery({
    queryKey: queryKeys.google.connectionStatus,
    queryFn: googleAccountConnectionStatus,
  });
};
