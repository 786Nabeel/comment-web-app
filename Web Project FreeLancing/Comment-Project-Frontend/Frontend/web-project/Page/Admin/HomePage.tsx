import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  IconButton,
  Spacer,
  Text,
  StackDivider,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons
import {
  getModerators,
  deleteModerator,
  updateModerator,
  addModerator,
} from "../../helper/Admin";
import toastSuccess from "../../Components/toastSuccess";
import toastError from "../../Components/toastError";
import { ToastContainer } from "react-toastify";
import { Moderator } from "../../Entities/moderator";
import { useNavigate } from "react-router-dom";
import { isToken } from "../../services/token";

const HomePage = () => {
  const navigator = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedModerator, setEditedModerator] = useState<Moderator>({
    _id: "",
    username: "",
    email: "",
    password: "",
  });
  const [newModerator, setNewModerator] = useState<Moderator>({
    _id: "",
    username: "",
    email: "",
    password: "",
  });
  const [moderators, setModerators] = useState<Moderator[]>();

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };
    checkTokenAndNavigate();

    const fetchModerators = async () => {
      const data = await getModerators();
      setModerators(data.moderators);
    };
    fetchModerators();
  }, [navigator]);

  const handleEditClick = (moderator: Moderator) => {
    setEditedModerator(moderator);
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleSaveChanges = async () => {
    try {
      await updateModerator(editedModerator);
      toastSuccess("Moderator Updated!");
    } catch (error) {
      toastError("Something wrong!");
    }
    setIsEditing(false);
  };

  const handleModeratorEditChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setEditedModerator((prev: Moderator) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteModerator = async (id: React.Key) => {
    const oldModeratorList = moderators?.map((moderator) => moderator);
    const newModeratorList = moderators?.filter(
      (moderator) => moderator._id !== id
    );
    try {
      setModerators(newModeratorList);
      await deleteModerator(id);
      toastSuccess("Moderator Deleted");
    } catch (error) {
      setModerators(oldModeratorList);
      toastError("Something wrong!");
    }
  };

  const handleAddNewModerator = () => {
    setIsAdding(true);
  };

  const handleModeratorAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewModerator((prev: Moderator) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddModerator = async () => {
    const oldModeratorList = moderators?.map((moderator) => moderator);
    if (oldModeratorList?.length !== undefined)
      setModerators([...oldModeratorList, newModerator]);
    try {
      await addModerator(newModerator);
      toastSuccess("Moderator Added!");
      handleModalClose();
    } catch (error) {
      setModerators(oldModeratorList);
      toastError("Something wrong!");
    }
  };
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="40vh"
      p={0}
      m={0}
    >
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
        <Heading size="lg">Moderators</Heading>
        {moderators?.length === 0 && <Text>There is no moderator yet 👀!</Text>}
        {moderators?.map((moderator) => (
          <HStack key={moderator._id} w="full">
            <Box>
              <Text>{moderator.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {moderator.email}
              </Text>
            </Box>
            <Spacer />
            <IconButton
              icon={<FaEdit />}
              aria-label="Edit"
              variant="ghost"
              color="blue.500"
              onClick={() => handleEditClick(moderator)}
            />
            <IconButton
              onClick={() => handleDeleteModerator(moderator._id)}
              icon={<FaTrash />}
              aria-label="Delete"
              variant="ghost"
              color="red.500"
            />
          </HStack>
        ))}
      </VStack>

      {/* Add Moderator Button */}
      <Box position="fixed" bottom={6} right={6}>
        <IconButton
          icon={<FaPlus />}
          aria-label="Add Moderator"
          colorScheme="teal"
          onClick={handleAddNewModerator}
        />
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Moderator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              marginBottom={2}
              name="username"
              placeholder="Username"
              onChange={handleModeratorEditChange}
            />
            <Input
              marginBottom={2}
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleModeratorEditChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleModeratorEditChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Moderator Modal */}
      <Modal isOpen={isAdding} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Moderator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              marginBottom={2}
              name="username"
              placeholder="Username"
              onChange={handleModeratorAddChange}
            />
            <Input
              marginBottom={2}
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleModeratorAddChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleModeratorAddChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddModerator}>
              Add
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HomePage;
