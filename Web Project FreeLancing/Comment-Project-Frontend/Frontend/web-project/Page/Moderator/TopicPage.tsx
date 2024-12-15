import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  IconButton,
  StackDivider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { Topic } from "../../Entities/topic";
import { useNavigate } from "react-router-dom";
import { isToken } from "../../services/token";
import { getTopics, deleteTopic } from "../../helper/Moderator";
import toastError from "../../Components/toastError";
import { ToastContainer } from "react-toastify";
import toastSuccess from "../../Components/toastSuccess";

const TopicPage = () => {
  const navigator = useNavigate();
  const [topics, setTopics] = useState<Topic[]>();

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };

    checkTokenAndNavigate();

    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics);
    };
    fetchTopics();
  }, [navigator]);

  const handleDeleteTopic = async (topicId: React.Key) => {
    // Add logic to delete the topic
    const oldTopics = topics?.map((topic) => topic);
    const updatedTopics = topics?.filter((topic) => topic._id !== topicId);
    setTopics(updatedTopics);
    try {
      await deleteTopic(topicId);
      toastSuccess("Topic Deleted!");
    } catch (error) {
      setTopics(oldTopics);
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
        <Heading size="lg">Topics</Heading>
        {topics?.length === 0 && <Text>There is no topic yet 👀!</Text>}
        {topics?.map((topic) => (
          <HStack key={topic._id} w="full">
            <Box>
              <Text>{topic.topic}</Text>
            </Box>
            <Spacer />
            <IconButton
              icon={<FaTrash />}
              aria-label="Delete"
              variant="ghost"
              color="red.500"
              onClick={() => handleDeleteTopic(topic._id)}
            />
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
};

export default TopicPage;
