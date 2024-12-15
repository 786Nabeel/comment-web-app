import axiosInstance from "../services/api-client";
import config from "../services/config";

export const deleteTopic = async (id: React.Key) => {
  const { data } = await axiosInstance.delete(
    "/moderator/deleteTopic/" + id,
    config()
  );
  return data;
};

export const getTopics = async () => {
  const { data } = await axiosInstance.get("/moderator/topics", config());
  return data;
};

export const banUser = async (id: String, days: String) => {
  const { data } = await axiosInstance.post(
    "/moderator/banUser/" + id,
    { days },
    config()
  );
  return data;
};

export const getUnBannedUser = async () => {
  const { data } = await axiosInstance.get("/moderator/unbannedUser", config());
  return data;
};

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get("/moderator/profile", config());
  return data;
};

export const updateUserInfo = async (
  username: String,
  email: String,
  password: String
) => {
  const { data } = await axiosInstance.post(
    "/moderator/profile",
    {
      username,
      email,
      password,
    },
    config()
  );
  return data;
};
