import { useReducer } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { defaultTodoReducer } from "../../../utils/const";
import { todoReducer } from "../../Reducer/Reducer";

const PostItem = (props) => {
  const { title, index, parent } = props;
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `card-${title}`,
    data: {
      title,
      index,
      parent,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      bg="white"
      p={2}
      mt={1}
      borderRadius="md"
      boxShadow="md"
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      cursor="grab"
    >
      <Text>{title}</Text>
    </Flex>
  );
};

export default PostItem;
