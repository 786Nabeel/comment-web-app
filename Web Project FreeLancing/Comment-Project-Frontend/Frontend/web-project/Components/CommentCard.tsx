import { Box, Text, Flex } from "@chakra-ui/react";

interface Prop {
  topic: String;
  comment: String;
  username: String;
}

const CommentCard = ({ topic, comment, username }: Prop) => {
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      p={4}
    >
      <Flex
        justifyContent="space-between"
        alignItems="flex-end"
        align={"center"}
        mb={4}
      >
        <Text
          fontSize="25px"
          fontWeight={"10px"}
          color="gray.700"
          textAlign={"left"}
        >
          {topic}
        </Text>
        <Text fontSize="sm" color="gray.700" textAlign={"right"} mb={2}>
          {username}
        </Text>
      </Flex>

      <Text>{comment}</Text>
    </Box>
  );
};

export default CommentCard;
