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
import { removeToken } from "../../services/token";

const UserNavBar = () => {
  const navigator = useNavigate();

  return (
    <Flex>
      <Box p="4" display={{ base: "none", md: "block", lg: "block" }}>
        <Button
          onClick={() => navigator("/User/HomePage")}
          colorScheme="teal"
          variant="ghost"
        >
          Home
        </Button>
        <Button
          onClick={() => navigator("/User/CreateTopic")}
          colorScheme="teal"
          variant="ghost"
        >
          Create Topic
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
            <MenuItem onClick={() => navigator("/User/HomePage")}>
              Home
            </MenuItem>
            <MenuItem onClick={() => navigator("/User/CreateTopic")}>
              Topic
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Spacer />
      <Box p="4">
        <Menu>
          <MenuButton as={Button} rightIcon={<FaUser />}>
            User
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigator("/User/Profile")}>
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

export default UserNavBar;
