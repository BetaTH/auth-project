import { User } from "../../contexts/AuthContext";
import { api } from "../../lib/axios/api";

type GetUser = (accees_tocken: string) => Promise<User | null>;

export const getUser: GetUser = async (access_token) => {
  try {
    const response = await api.get<User>("/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
