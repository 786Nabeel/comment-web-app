import {
  Spacer,
  Text,
  Flex,
  Box,
  Button,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom";
import { removeToken, isToken } from "../../services/token";
import { useEffect } from "react";

const AdminNavBar = () => {
  const navigator = useNavigate();

  useEffect(() => {
    const checkTokenAndNavigate = () => {
      if (!isToken()) {
        navigator("/Login");
      }
    };

    checkTokenAndNavigate();
  }, [navigator]);

  return (
    <Flex>
      <Box p="4" display={{ base: "none", md: "block", lg: "block" }}>
        <Button
          onClick={() => navigator("/Admin/HomePage")}
          colorScheme="teal"
          variant="ghost"
        >
          Home
        </Button>
        <Button
          onClick={() => navigator("/Admin/RequestPage")}
          colorScheme="teal"
          variant="ghost"
        >
          Requests
        </Button>
        <Button
          onClick={() => navigator("/Admin/WordPage")}
          colorScheme="teal"
          variant="ghost"
        >
          Words
        </Button>
      </Box>
      <Box p="4" display={{ base: "block", sm: "block" }}>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaBars />}
            variant="default"
            display={{ base: "block", md: "none" }}
          />
          <MenuList>
            <MenuItem onClick={() => navigator("/Admin/HomePage")}>
              Home
            </MenuItem>
            <MenuItem onClick={() => navigator("/Admin/RequestPage")}>
              Request
            </MenuItem>
            <MenuItem onClick={() => navigator("/Admin/WordPage")}>
              Words
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Spacer />
      <Box p="4">
        <Menu>
          <MenuButton as={Button} rightIcon={<FaUser />}>
            Admin
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigator("/Admin/Profile")}>
              <FaUser />
              <Text ml={2}>Profile</Text>
            </MenuItem>
            <MenuItem
              onClick={() => {
                removeToken();
                navigator("/Login");
              }}
            >
              <FaSignOutAlt />
              <Text ml={2}>Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default AdminNavBar;
