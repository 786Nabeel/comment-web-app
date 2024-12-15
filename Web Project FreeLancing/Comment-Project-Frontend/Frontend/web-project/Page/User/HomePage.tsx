import { useEffect, useState } from "react";
import {
  VStack,
  Heading,
  Flex,
  SimpleGrid,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import CommentCard from "../../Components/CommentCard";
import { postComment, getComments, getTopics } from "../../helper/Comment";
import { CommentProp } from "../../Entities/comment";
import { isToken } from "../../services/token";
import { useNavigate } from "react-router-dom";
import { Topic } from "../../Entities/topic";
import toastError from "../../Components/toastError";
import toastSuccess from "../../Components/toastSuccess";
import { ToastContainer } from "react-toastify";

const CommentsPage = () => {
  const navigator = useNavigate();
  const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState({
    id: "",
    comment: "",
    topic: "",
    username: "",
  });
  const [topics, setTopics] = useState<Topic[]>();
  const [comments, setComments] = useState<CommentProp[]>([]);

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };

    checkTokenAndNavigate();

    const fetchComments = async () => {
      const data = await getComments();
      setComments(data.result);
    };

    const fetchTopics = async () => {
      const data = await getTopics();
      setTopics(data.topics);
    };

    fetchComments();
    fetchTopics();
  }, [navigator]);

  const openAddCommentModal = () => {
    setIsAddCommentModalOpen(true);
  };

  const closeAddCommentModal = () => {
    setIsAddCommentModalOpen(false);
    setNewComment({ topic: "", comment: "", id: "", username: "" });
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewComment((prevComment) => ({
      ...prevComment,
      topic: e.target.value,
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment((prevComment) => ({
      ...prevComment,
      comment: e.target.value,
    }));
  };

  const handleAddComment = async () => {
    const oldComments = comments.map((comment) => comment);

    try {
      const data = await postComment(newComment);
      setComments((prev) => [...prev, data]);
      closeAddCommentModal();
      toastSuccess("Comment Posted!");
    } catch (error) {
      setComments(oldComments);
      toastError("Something wrong!");
    }
  };

  const isAddCommentButtonDisabled =
    newComment.topic === "" || newComment.comment === "";

  return (
    <Flex direction="column" align="center" justify="center" minH="40vh">
      <VStack w="full" bg="white" p={0} m={0} spacing={4} overflowY="auto">
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
        <Heading size="lg">Comments</Heading>
        {comments.length === 0 && <Text>There is no comment yet 👀!</Text>}
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={4} w="full">
          {comments?.map((comment) => (
            <CommentCard
              key={comment.id}
              topic={comment.topic}
              comment={comment.comment}
              username={comment.username}
            />
          ))}
        </SimpleGrid>
        <IconButton
          icon={<FaPlus />}
          aria-label="Add Comment"
          colorScheme="teal"
          position="fixed"
          bottom={6}
          right={6}
          onClick={openAddCommentModal}
        />
      </VStack>

      {/* Add Comment Modal */}
      <Modal
        isOpen={isAddCommentModalOpen}
        onClose={closeAddCommentModal}
        size="md"
      >
        <ModalOverlay />
        <ModalContent mr={1} ml={1}>
          <ModalHeader>Add New Comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Select
                placeholder="Select Topic"
                value={newComment.topic}
                onChange={handleTopicChange}
              >
                {topics?.map((topic) => (
                  <option key={topic._id} value={topic.topic.toString()}>
                    {topic.topic}
                  </option>
                ))}
              </Select>
              <Textarea
                placeholder="Write your comment..."
                value={newComment.comment}
                onChange={handleCommentChange}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={handleAddComment}
              isDisabled={isAddCommentButtonDisabled}
            >
              Add Comment
            </Button>
            <Button ml={2} onClick={closeAddCommentModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default CommentsPage;
