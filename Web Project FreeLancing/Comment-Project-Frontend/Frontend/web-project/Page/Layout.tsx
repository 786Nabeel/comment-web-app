import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ModeratorNavBar from "./Moderator/ModeratorNavBar";
import AdminNavBar from "./Admin/AdminNavBar";
import UserNavBar from "./User/UserNavBar";

interface Prop {
  role: string;
}

const Layout = ({ role }: Prop) => {
  return (
    <>
      {role === "Admin" && <AdminNavBar />}
      {role === "Moderator" && <ModeratorNavBar />}
      {role === "User" && <UserNavBar />}
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
};
export default Layout;
