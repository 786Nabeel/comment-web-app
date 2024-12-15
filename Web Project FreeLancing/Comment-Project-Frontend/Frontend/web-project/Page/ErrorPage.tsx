import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import AdminNavBar from "./Admin/AdminNavBar";
import ModeratorNavBar from "./Moderator/ModeratorNavBar";
import UserNavBar from "./User/UserNavBar";

interface Prop {
  role: string;
}

const ErrorPage = ({ role }: Prop) => {
  const error = useRouteError();
  return (
    <>
      {role === "Admin" && <AdminNavBar />}
      {role === "Moderator" && <ModeratorNavBar />}
      {role === "User" && <UserNavBar />}
      <Box
        minHeight="90vh" // Ensures the container takes up the full height of the viewport
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Heading>Oops</Heading>
          <Text>
            {isRouteErrorResponse(error)
              ? "This page does not exits"
              : "Sorry, something went wrong!"}
          </Text>
        </Box>
      </Box>
    </>
  );
};
export default ErrorPage;
