import api from "./instance/axios-instance";

const BASE_AUTH_PREFIX = "auth";
export const register = async (payload: RegisterRequest) => {
  const { data } = await api.post(`${BASE_AUTH_PREFIX}/register`, payload);
  return data;
};

export const login = async (payload: LoginRequest) => {
  const { data } = await api.post(`${BASE_AUTH_PREFIX}/login`, payload);
  return data;
};
