import { useState } from "react";
import { VStack, Heading, Input, Button, List } from "@chakra-ui/react";
import { createTopic } from "../../helper/Comment";
import toastSuccess from "../../Components/toastSuccess";
import toastError from "../../Components/toastError";
import { ToastContainer } from "react-toastify";

const CreateTopicPage = () => {
  const [newTopic, setNewTopic] = useState("");

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTopic(e.target.value);
  };

  const handleCreateTopic = async () => {
    try {
      await createTopic(newTopic);
      toastSuccess("Topics created!");
    } catch (error) {
      toastError("Something wrong!");
    }
    setNewTopic("");
  };

  return (
    <VStack align="center" justify="center" minH="40vh">
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
      <Heading size="lg" mb={3}>
        Create Topic
      </Heading>
      <Input
        placeholder="Enter topic name"
        value={newTopic}
        onChange={handleTopicChange}
        mb={4}
        maxW={"500px"}
      />
      <Button
        isDisabled={newTopic.length === 0}
        colorScheme="teal"
        onClick={handleCreateTopic}
      >
        Create Topic
      </Button>
      <List></List>
    </VStack>
  );
};

export default CreateTopicPage;
