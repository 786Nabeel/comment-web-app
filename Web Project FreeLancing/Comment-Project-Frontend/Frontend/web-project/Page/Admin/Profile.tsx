// ... imports

import {
  Flex,
  VStack,
  StackDivider,
  Heading,
  FormControl,
  Text,
  FormLabel,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../../helper/Admin";
import { Profile } from "../../Entities/profile";
import toastError from "../../Components/toastError";
import toastSuccess from "../../Components/toastSuccess";
import { ToastContainer } from "react-toastify";
import { isToken } from "../../services/token";
import { useNavigate } from "react-router-dom";
import React from "react";

const ProfilePage = () => {
  const navigator = useNavigate();
  const [profileData, setProfileData] = useState<Profile>({
    _id: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };
    checkTokenAndNavigate();

    const fetchProfile = async () => {
      const data = await getUserInfo();
      setProfileData(data);
    };
    fetchProfile();
  }, [navigator]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateUserInfo(
        profileData.username,
        profileData.email,
        profileData.password
      );
      toastSuccess("Profile Updated!");
    } catch (error) {
      toastError("Something wrong!");
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="40vh" p={4}>
      <VStack
        w="full"
        maxW="md"
        bg="white"
        rounded="md"
        shadow="md"
        p={4}
        spacing={4}
        divider={<StackDivider borderColor="gray.200" />}
      >
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
        <Heading size="lg">Profile</Heading>
        {profileData.password !== profileData.confirmPassword && (
          <Text color="red">Password & Confirm Password should be same!</Text>
        )}
        <FormControl>
          <FormLabel>Username</FormLabel>
          <InputGroup>
            <Input
              id="username"
              name="username"
              type="text"
              value={profileData.username.toString()}
              onChange={handleInputChange}
            />
          </InputGroup>

          <FormLabel>Email</FormLabel>
          <InputGroup>
            <Input
              id="email"
              name="email"
              type="email"
              value={profileData.email.toString()}
              onChange={handleInputChange}
            />
          </InputGroup>

          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
            />
          </InputGroup>

          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={handleInputChange}
            />
          </InputGroup>

          <Flex justify="center" alignContent="center" mt={3}>
            <Button
              isDisabled={
                profileData.password !== profileData.confirmPassword ||
                !profileData.password ||
                !profileData.confirmPassword ||
                !profileData.email ||
                !profileData.username
              }
              colorScheme="blue"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </Flex>
        </FormControl>
      </VStack>
    </Flex>
  );
};

export default ProfilePage;
