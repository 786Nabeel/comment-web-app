import axiosInstance from "../services/api-client";

interface LoginProp {
  email: String;
  password: String;
}

interface RegisterProp extends LoginProp {
  username: String;
}

export const Login = async ({ email, password }: LoginProp) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};

export const Register = async ({ username, email, password }: RegisterProp) => {
  const { data } = await axiosInstance.post("/auth/register", {
    username,
    email,
    password,
  });
  return data;
};
