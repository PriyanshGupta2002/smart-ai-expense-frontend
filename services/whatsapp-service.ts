import api from "./instance/axios-instance";

const BASE_WHATSAPP_URL = "/whatsapp";

export const connectWhatsapp = async () => {
  const { data } = await api.post(`${BASE_WHATSAPP_URL}/connect`);
  return data;
};

export const getWhatsappStatus = async () => {
  const { data } = await api.get(`${BASE_WHATSAPP_URL}/status`);
  return data;
};

export const disconnectWhatsapp = async () => {
  const { data } = await api.post(`${BASE_WHATSAPP_URL}/disconnect`);
  return data;
};
