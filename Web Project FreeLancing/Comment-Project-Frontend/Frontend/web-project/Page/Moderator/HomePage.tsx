import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  IconButton,
  Select,
  Spacer,
  StackDivider,
  Flex,
} from "@chakra-ui/react";
import { FaBan } from "react-icons/fa";
import { moderatorUser } from "../../Entities/user";
import { useNavigate } from "react-router-dom";
import { isToken } from "../../services/token";
import { getUnBannedUser, banUser } from "../../helper/Moderator";
import toastError from "../../Components/toastError";
import toastSuccess from "../../Components/toastSuccess";
import { ToastContainer } from "react-toastify";

const HomePage = () => {
  const navigator = useNavigate();
  const [users, setUsers] = useState<moderatorUser[]>();
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: string }>(
    {}
  );
  const [isBanButtonDisabled, setIsBanButtonDisabled] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };

    checkTokenAndNavigate();

    const fetchUser = async () => {
      const data = await getUnBannedUser();
      setUsers(data.response);

      // Initialize isBanButtonDisabled to true for all users
      const initialDisabledState: { [key: string]: boolean } = {};
      data.response.forEach((user: moderatorUser) => {
        initialDisabledState[user._id.toString()] = true;
      });
      setIsBanButtonDisabled(initialDisabledState);
    };
    fetchUser();
  }, [navigator]);

  const handleDays = (userId: string, days: string) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [userId]: days,
    }));

    setIsBanButtonDisabled((prevDisabled) => ({
      ...prevDisabled,
      [userId]: days === "0", // Enable the button if days are selected
    }));
  };

  const handleBanClick = async (userId: string) => {
    const oldUserList = users?.map((user) => user);
    const newUserList = users?.filter((user) => user._id !== userId);
    setUsers(newUserList);
    try {
      const userSelectedDays = selectedDays[userId] || "0";
      await banUser(userId, userSelectedDays);
      toastSuccess("User Banned!");
    } catch (error) {
      setUsers(oldUserList);
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
        overflowY="auto"
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
        <Heading size="lg">User List</Heading>
        {users?.length === 0 && <Text>There is no users yet 👀!</Text>}
        {users?.map((user) => (
          <HStack key={user._id} w="full">
            <Box>
              <Text>{user.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.email}
              </Text>
            </Box>
            <Spacer />
            <Select
              defaultValue={0}
              onChange={(e) => handleDays(user._id.toString(), e.target.value)}
            >
              <option>Select days</option>
              <option value={1}>1 day</option>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
            </Select>
            <IconButton
              icon={<FaBan />}
              aria-label="Ban"
              variant="ghost"
              color="red.500"
              onClick={() => handleBanClick(user._id.toString())}
              isDisabled={isBanButtonDisabled[user._id.toString()]}
            />
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
};

export default HomePage;
