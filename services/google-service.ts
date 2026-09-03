import api from "./instance/axios-instance";

const BASE_GOOGLE_PREFIX = "/api/auth/google";
export const googleAccountConnectionStatus = async () => {
  const { data } = await api.get(`${BASE_GOOGLE_PREFIX}/status`);
  return data;
};
