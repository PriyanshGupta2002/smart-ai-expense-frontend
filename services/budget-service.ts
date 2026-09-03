import api from "./instance/axios-instance";

const BASE_BUDGET_PREFIX = "budget";

export const getBudget = async () => {
  const { data } = await api.get(`${BASE_BUDGET_PREFIX}/current`);
  return data;
};

export const createBudget = async (amount: number) => {
  const { data } = await api.put(`${BASE_BUDGET_PREFIX}/current`, { amount });
  return data;
};
