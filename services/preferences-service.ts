import { UserPreferences } from "@/types/preferences";
import api from "./instance/axios-instance";

const BASE_PREFERENCES_PREFIX = "/preferences";

export const getPreferences = async () => {
  const { data } = await api.get(`${BASE_PREFERENCES_PREFIX}`);
  return data;
};

export type UpdatePreferences = Omit<UserPreferences, "id" | "user_id">;

export const updatePreferences = async (preferences: UpdatePreferences) => {
  const { data } = await api.put(`${BASE_PREFERENCES_PREFIX}/`, preferences);
  return data;
};
