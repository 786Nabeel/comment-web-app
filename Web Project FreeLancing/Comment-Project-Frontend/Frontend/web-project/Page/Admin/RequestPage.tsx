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
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa"; // Import icons
import { Request } from "../../Entities/request";
import toastError from "../../Components/toastError";
import toastSuccess from "../../Components/toastSuccess";
import {
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "../../helper/Admin";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isToken } from "../../services/token";

const RequestPage = () => {
  const navigator = useNavigate();
  const [requests, setRequests] = useState<Request[]>();

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };
    checkTokenAndNavigate();

    const fetchRequests = async () => {
      const data = await getPendingRequests();
      setRequests(data.pendingUsers);
    };
    fetchRequests();
  }, [navigator]);

  const handleApprove = async (requestId: React.Key) => {
    const oldRequestList = requests?.map((request) => request);
    const newRequestList = requests?.filter(
      (request) => request._id !== requestId
    );

    setRequests(newRequestList);
    try {
      await approveRequest(requestId);
      toastSuccess("Request Approved!");
    } catch (error) {
      setRequests(oldRequestList);
      toastError("Something wrong!");
    }
  };

  const handleReject = async (requestId: React.Key) => {
    const oldRequestList = requests?.map((request) => request);
    const newRequestList = requests?.filter(
      (request) => request._id !== requestId
    );

    setRequests(newRequestList);
    try {
      await rejectRequest(requestId);
      toastSuccess("Request Rejected!");
    } catch (error) {
      setRequests(oldRequestList);
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
        {" "}
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
        <Heading size="lg">Requests</Heading>
        {requests?.length === 0 && <Text>There is no request yet 👀!</Text>}
        {requests?.map((request) => (
          <HStack key={request._id} w="full">
            <Box>
              <Text>{request.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {request.email}
              </Text>
            </Box>
            <Spacer />
            <IconButton
              icon={<FaCheck />}
              aria-label="Approve"
              variant="ghost"
              color="green.500"
              onClick={() => handleApprove(request._id)}
            />
            <IconButton
              icon={<FaTimes />}
              aria-label="Reject"
              variant="ghost"
              color="red.500"
              onClick={() => handleReject(request._id)}
            />
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
};

export default RequestPage;
