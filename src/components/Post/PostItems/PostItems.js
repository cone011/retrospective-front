import { useDroppable } from "@dnd-kit/core";
import classes from "./PostItems.module.css";
import { Flex, Text } from "@chakra-ui/react";

const PostItems = (props) => {
  const { title, items, color } = props;

  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <Flex
      flex="3"
      padding="5"
      flexDirection="column"
      minH="10rem"
      height="auto"
    >
      <Text
        fontSize="xl"
        borderRadius="md"
        p={1}
        fontWeight="bold"
        bg={`${color}.500`}
        mb="2"
        color={"white"}
      >
        {title}
      </Text>
    </Flex>
  );
};

export default PostItems;
