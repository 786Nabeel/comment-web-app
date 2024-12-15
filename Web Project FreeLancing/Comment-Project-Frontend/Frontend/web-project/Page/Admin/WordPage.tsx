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
import { Word } from "../../Entities/word";
import toastError from "../../Components/toastError";
import {
  addWord,
  deleteWord,
  getAllWords,
  updateWord,
} from "../../helper/Admin";
import toastSuccess from "../../Components/toastSuccess";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isToken } from "../../services/token";

const WordPage = () => {
  const navigator = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newWord, setNewWord] = useState<Word>({
    _id: "",
    word: "",
  });
  const [editedWord, setEditedWord] = useState<Word>({
    _id: "",
    word: "",
  });
  const [inappropriateWords, setInappropriateWords] = useState<Word[]>([]);

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };
    checkTokenAndNavigate;

    const fetchWords = async () => {
      const data = await getAllWords();
      setInappropriateWords(data.words);
    };
    fetchWords();
  }, [navigator]);

  const handleEditClick = (word: Word) => {
    setEditedWord(word);
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  const handleAddWord = () => {
    setIsAdding(true);
  };

  const handleAddClose = () => {
    setIsAdding(false);
  };

  // Handle edit change
  const handleEditChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedWord((prev: Word) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle add new word change
  const handleAddNewWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewWord((prev: Word) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle word updation
  const handleUpdate = async () => {
    setIsEditing(false);
    try {
      await updateWord(editedWord);
      toastSuccess("Word Updated");
    } catch (error) {
      toastError("Something wrong!");
    }
  };

  // Add new word
  const handleAddNewWord = async () => {
    setIsAdding(false);
    const oldWordList = inappropriateWords.map((word) => word);
    setInappropriateWords((prev) => [...prev, newWord]);

    try {
      await addWord(newWord);
      toastSuccess("Word Added!");
    } catch (error) {
      setInappropriateWords(oldWordList);
      toastError("Something wrong!");
    }
  };

  const handleDelete = async (id: React.Key) => {
    const oldWordList = inappropriateWords.map((word) => word);
    const updatedWords = inappropriateWords.filter((w) => w._id !== id);
    setInappropriateWords(updatedWords);
    try {
      await deleteWord(id);
      toastSuccess("Word Deleted!");
    } catch (error) {
      setInappropriateWords(oldWordList);
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
        <Heading size="lg">Inappropriate Words</Heading>
        {inappropriateWords.length === 0 && (
          <Text>There is no word yet 👀!</Text>
        )}
        {inappropriateWords.map((word) => (
          <HStack key={word._id} w="full">
            <Box>
              <Text>{word.word}</Text>
            </Box>
            <Spacer />
            <IconButton
              icon={<FaEdit />}
              aria-label="Edit"
              variant="ghost"
              color="blue.500"
              onClick={() => handleEditClick(word)}
            />
            <IconButton
              icon={<FaTrash />}
              aria-label="Delete"
              variant="ghost"
              color="red.500"
              onClick={() => handleDelete(word._id)}
            />
          </HStack>
        ))}
      </VStack>

      {/* Add Word Button */}
      <Box position="fixed" bottom={6} right={6}>
        <IconButton
          icon={<FaPlus />}
          aria-label="Add Word"
          colorScheme="teal"
          onClick={handleAddWord}
        />

        {/* Adding popup */}
        {/* Edit Word Modal */}
        <Modal isOpen={isAdding} onClose={handleAddClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Word</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                name="word"
                placeholder="Inappropriate Word"
                onChange={handleAddNewWordChange}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddNewWord}>
                Add
              </Button>
              <Button onClick={handleAddClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* Edit Word Modal */}
      <Modal isOpen={isEditing} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Word</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              name="word"
              placeholder="Inappropriate Word"
              onChange={handleEditChanges}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default WordPage;
