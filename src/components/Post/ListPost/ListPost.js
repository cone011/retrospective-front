import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useReducer, useState } from "react";
import classes from "./ListPost.module.css";
import { todoReducer } from "../../Reducer/Reducer";
import { defaultTodoReducer } from "../../../utils/const";
import { Flex } from "@chakra-ui/react";
import PostLine from "../PostLine/PostLine";

const ListPost = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);

  const [wentWellList, setWentWellList] = useState(["Data"]);
  const [toImproveList, setToImproveList] = useState(["Data2"]);
  const [kudos, setKudosList] = useState(["Data3"]);

  const arrayLanes = [
    {
      title: "Went Well",
      items: wentWellList,
      color: "red",
    },
    {
      title: "To Improve",
      items: toImproveList,
      color: "yellow",
    },
    {
      title: "Kudos",
      items: kudos,
      color: "green",
    },
  ];

  const onChangePlace = (data) => {
    console.log(data);
    const container = data.over?.id;
    const title = data.active.current?.title || "";
    const index = data.active.current?.index || 0;
    const parent = data.active.current?.parent || "Kudos";
    if (container === "Went Well") setWentWellList([...wentWellList, title]);
    if (container === "To Improve") setToImproveList([...toImproveList, title]);
    if (container === "Kudos") setKudosList([...kudos, title]);
    if (parent === "Went Well")
      setWentWellList([
        ...wentWellList.slice(0, index),
        ...wentWellList.slice(index + 1),
      ]);
    if (parent === "To Improve")
      setWentWellList([
        ...toImproveList.slice(0, index),
        ...toImproveList.slice(index + 1),
      ]);
    if (parent === "Kudos")
      setWentWellList([...kudos.slice(0, index), ...kudos.slice(index + 1)]);
  };

  return (
    <DndContext collisionDetection={rectIntersection} onDragEnd={onChangePlace}>
      <Flex flexDirection="column">
        <Flex flex="3">
          {arrayLanes.map((item, index) => (
            <PostLine
              key={index}
              title={item.title}
              items={item.items}
              color={item.color}
            />
          ))}
        </Flex>
      </Flex>
    </DndContext>
  );
};

export default ListPost;
