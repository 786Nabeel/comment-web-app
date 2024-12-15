import axiosInstance from "../services/api-client";
import config from "../services/config";
import { Moderator } from "../Entities/moderator";
import { Word } from "../Entities/word";

export const getPendingRequests = async () => {
  const { data } = await axiosInstance.get("/admin/pendingRequests", config());
  return data;
};

export const approveRequest = async (id: React.Key) => {
  const { data } = await axiosInstance.delete("/admin/approve/" + id, config());
  return data;
};

export const rejectRequest = async (id: React.Key) => {
  const { data } = await axiosInstance.delete("/admin/reject/" + id, config());
  return data;
};

export const addModerator = async ({
  username,
  email,
  password,
}: Moderator) => {
  const { data } = await axiosInstance.post(
    "/admin/AddModerator",
    { username, email, password, role: "Moderator", status: "Approved" },
    config()
  );
  return data;
};

export const deleteModerator = async (id: React.Key) => {
  const { data } = await axiosInstance.delete(
    "/admin/deleteModerator/" + id,
    config()
  );
  return data;
};

export const updateModerator = async ({
  _id,
  username,
  email,
  password,
}: Moderator) => {
  const { data } = await axiosInstance.patch(
    "/admin/updateModerator/" + _id,
    {
      username,
      email,
      password,
    },
    config()
  );
  return data;
};

export const getModerators = async () => {
  const { data } = await axiosInstance.get("/admin/allModerator", config());
  return data;
};

export const getAllWords = async () => {
  const { data } = await axiosInstance.get("/admin/AllWords", config());
  return data;
};

export const addWord = async (word: Word) => {
  const { data } = await axiosInstance.post(
    "/admin/addWord",
    { word: word.word },
    config()
  );
  return data;
};

export const updateWord = async ({ _id, word }: Word) => {
  const { data } = await axiosInstance.post(
    "/admin/updateWord/" + _id,
    { word },
    config()
  );
  return data;
};

export const deleteWord = async (id: React.Key) => {
  const { data } = await axiosInstance.delete(
    "/admin/deleteWord/" + id,
    config()
  );
  return data;
};

export const getUserInfo = async () => {
  const { data } = await axiosInstance.get("/admin/profile", config());
  return data;
};

export const updateUserInfo = async (username:String, email:String, password:String) => {

  const { data } = await axiosInstance.post(
    "/admin/profile",
    {
      username,
      email,
      password,
    },
    config()
  );
  return data;
};
