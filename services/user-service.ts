import { userRequestPayload } from "@/types/user";
import api from "./instance/axios-instance";

const BASE_USER_PREFIX = `/user`;

export const updateUserProfile = async (payload: userRequestPayload) => {
  const { data } = await api.post(
    `${BASE_USER_PREFIX}/update-profile`,
    payload,
  );
  return data;
};
