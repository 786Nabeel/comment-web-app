import { useState } from "react";
import { VStack, Heading, Input, Button, Text, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Login } from "../helper/Auth";
import { setToken, removeToken } from "../services/token";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastInfo from "../Components/toastInfo";
import toastError from "../Components/toastError";

const LoginPage = () => {
  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        toastError("Provide Email and Password!");
      } else {
        const data = await Login({ email, password });
        if (data.status && data.status === "Approved") {
          setToken(data.token);

          if (data.role === "Admin") navigator("/Admin/HomePage");
          if (data.role === "Moderator") navigator("/Moderator/HomePage");
          if (data.role === "NormalUser") navigator("/User/HomePage");
        } else if (
          data.status &&
          (data.status === "Pending" || data.status === "Rejected")
        ) {
          toastInfo("You request is " + data.status);
        } else if (data.status && data.status === "Banned") {
          toastInfo("You account is " + data.status);
        }
      }
    } catch (error: any) {
      console.log("error ",error.response)
      removeToken();
      toastError("Invalid Credentials");
    }
  };

  return (
    <VStack align="center" justify="center" minH="100vh">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Heading mb={4} size={"lg"}>
        Login
      </Heading>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        maxW={"300px"}
        mb={3}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        maxW={"300px"}
        required
      />
      <Box>
        <Text textAlign={"left"} mb={2} p={0}>
          If you don't have an account,{" "}
          <NavLink
            onClick={() => navigator("/SignUp")}
            to={""}
            style={{ color: "blue" }}
          >
            Sign up
          </NavLink>
        </Text>
      </Box>
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginPage;
