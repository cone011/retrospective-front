import { Fragment, useReducer } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const PostItem = (props) => {
  const { title, index, parent } = props;
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
    <Fragment>
      <Flex
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
    </Fragment>
  );
};

export default PostItem;
