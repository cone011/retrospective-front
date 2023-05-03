import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useReducer, useState } from "react";
import classes from "./ListPost.module.css";
import PostItems from "../PostItems/PostItems";
import { todoReducer } from "../../Reducer/Reducer";
import { defaultTodoReducer } from "../../../utils/const";
import { Flex } from "@chakra-ui/react";

const ListPost = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);

  const [wentWellList, setWentWellList] = useState([]);
  const [toImproveList, setToImproveList] = useState([]);
  const [kudos, setKudosList] = useState([]);

  const arrayLanes = [
    {
      title: "ToDo",
      items: wentWellList,
      color: "red",
    },
    {
      title: "InProgress",
      items: toImproveList,
      color: "yellow",
    },
    {
      title: "Done",
      items: kudos,
      color: "green",
    },
  ];

  const onChangePlace = (data) => {
    console.log(data);
  };

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragCancel={onChangePlace}
    >
      <Flex flexDirection="column">
        <Flex flex="3">
          {arrayLanes.map((item, index) => (
            <PostItems
              key={index}
              title={item.title}
              items={item}
              color={item.color}
            />
          ))}
        </Flex>
      </Flex>
    </DndContext>
  );
};

export default ListPost;
