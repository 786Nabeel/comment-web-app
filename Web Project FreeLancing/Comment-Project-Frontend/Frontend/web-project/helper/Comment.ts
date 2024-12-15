import axiosInstance from "../services/api-client";
import config from "../services/config";
import { NewCommentProp } from "../Entities/comment";

export const getComments = async () => {
  const { data } = await axiosInstance.get("/user/comments", config());
  return data;
};

export const postComment = async ({ topic, comment }: NewCommentProp) => {
  const { data } = await axiosInstance.post(
    "/user/comments",
    {
      topic,
      comment,
    },
    config()
  );
  return data;
};

export const getMyComments = async () => {
  const { data } = await axiosInstance.get("/user/myComments", config());
  return data;
};

export const getTopics = async () => {
  const { data } = await axiosInstance.get("/user/topics", config());
  return data;
};

export const createTopic = async (topic: String) => {
  const { data } = await axiosInstance.post(
    "/user/topics",
    { topic },
    config()
  );
  return data;
};

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get("/user/profile", config());
  return data;
};

export const updateUserInfo = async (
  username: String,
  email: String,
  password: String
) => {
  const { data } = await axiosInstance.post(
    "/user/profile",
    {
      username,
      email,
      password,
    },
    config()
  );
  return data;
};
