import { useState } from "react";
import { VStack, Heading, Input, Button, Text, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Register } from "../helper/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastInfo from "../Components/toastInfo";
import toastError from "../Components/toastError";

const SignUpPage = () => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      if (!username || !email || !password) {
        toastError("Provide username, email and password");
      } else {
        var data = await Register({ username, email, password });
        if (data.msg) {
          toastInfo(data.msg);
        }
      }
    } catch (error) {
      toastError("Email already exits!");
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
        Sign UP
      </Heading>
      <Input
        type="name"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        maxW={"300px"}
        mb={3}
        required
      />
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
          If you already have an account,{" "}
          <NavLink
            onClick={() => navigator("/Login")}
            to={""}
            style={{ color: "blue" }}
          >
            Login
          </NavLink>
        </Text>
      </Box>
      <Button colorScheme="teal" onClick={handleSignUp}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUpPage;
