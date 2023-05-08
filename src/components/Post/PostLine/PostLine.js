import { Flex, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import PostItem from "../PostItem/PostItem";

const PostLine = (props) => {
  const { title, items, color } = props;

  const { setNodeRef } = useDroppable({
    id: title,
  });

  const countItems = items?.length || 0;

  return (
    <Flex
      flex="3"
      flexDirection="column"
      minH="10rem"
      height={countItems > 0 ? "auto" : "10rem  "}
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
      <Flex
        ref={setNodeRef}
        flex="1"
        bg={`${color}.100`}
        borderRadius="md"
        boxShadow="md"
        flexDirection="column"
        p={2}
      >
        {items.map((item) => (
          <PostItem
            key={item._id}
            title={item.title}
            index={item._id}
            parent={title}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default PostLine;
