import { useState, useEffect } from "react";
import { Center, Heading, Box, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
const fadeInOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedHeading = () => {
  const navigator = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Toggle visibility with a delay
    const timeout = setTimeout(() => {
      setIsVisible(!isVisible);
    }, 2000); // Change the delay duration as needed

    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <Center minH="100vh">
      <Box textAlign="center">
        <Heading
          size="lg"
          animation={`${fadeInOut} 3s infinite`}
          opacity={isVisible ? 1 : 0}
        >
          Create Topic
        </Heading>
        <Heading
          size="lg"
          animation={`${fadeInOut} 3s infinite`}
          opacity={isVisible ? 1 : 0}
        >
          &
        </Heading>
        <Heading
          size="lg"
          animation={`${fadeInOut} 3s infinite`}
          opacity={isVisible ? 1 : 0}
        >
          Post Comment
        </Heading>
        <Button
          onClick={() => navigator("/Login")}
          mt={4}
          mr={1}
          colorScheme="blue"
          variant="outline"
        >
          Login
        </Button>
        <Button
          onClick={() => navigator("/SignUp")}
          mt={4}
          colorScheme="green"
          variant="outline"
        >
          Sign up
        </Button>
      </Box>
    </Center>
  );
};

export default AnimatedHeading;
