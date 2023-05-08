import { DndContext, rectIntersection } from "@dnd-kit/core";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import classes from "./ListPost.module.css";
import { todoReducer } from "../../Reducer/Reducer";
import {
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  ACTION_TYPE,
  TYPE_POST,
  defaultTodoReducer,
} from "../../../utils/const";
import { Flex } from "@chakra-ui/react";
import PostLine from "../PostLine/PostLine";
import { getAllPost } from "../../../api/post";
import { socket } from "../../../socket";

const ListPost = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [listPost, setListPost] = useState([]);
  const [wentWellList, setWentWellList] = useState([]);
  const [toImproveList, setToImproveList] = useState([]);
  const [kudos, setKudosList] = useState([]);
  const auxRef = useRef();

  const onPutCorrectTheValues = useCallback((data) => {
    const listWent = [];
    const listImprove = [];
    const listKudo = [];
    let currentValue;
    for (let i = 0; i < data.length; i++) {
      currentValue = data[i];
      if (currentValue.typePost.name === TYPE_POST.WENT_WELL) {
        listWent.push({ title: currentValue.title, _id: currentValue._id });
      }
      if (currentValue.typePost.name === TYPE_POST.TO_IMPROVE) {
        listImprove.push({ title: currentValue.title, _id: currentValue._id });
      }
      if (currentValue.typePost.name === TYPE_POST.KUDOS) {
        listKudo.push({ title: currentValue.title, _id: currentValue._id });
      }
    }
    setWentWellList(listWent);
    setToImproveList(listImprove);
    setKudosList(listKudo);
  }, []);

  const onPutValues = (data) => {
    console.log(data);
    const listWent = [];
    const listImprove = [];
    const listKudo = [];
    let currentValue;
    for (let i = 0; i < data.length; i++) {
      currentValue = data[i];
      console.log(currentValue);
      if (currentValue.typePost.name === TYPE_POST.WENT_WELL) {
        listWent.push({ title: currentValue.title, _id: currentValue._id });
      }
      if (currentValue.typePost.name === TYPE_POST.TO_IMPROVE) {
        listImprove.push({ title: currentValue.title, _id: currentValue._id });
      }
      if (currentValue.typePost.name === TYPE_POST.KUDOS) {
        listKudo.push({ title: currentValue.title, _id: currentValue._id });
      }
    }
    setWentWellList(listWent);
    setToImproveList(listImprove);
    setKudosList(listKudo);
    console.log("Went", listWent);
    console.log("Improve", listImprove);
    console.log("Kudo", listKudo);
  };

  const addPost = (post) => {
    setListPost((prevState) => {
      const updatePost = prevState;
      updatePost.unshift(post);
      onPutValues(updatePost);
      return updatePost;
    });
    // console.log(listPost);
    // onPutCorrectTheValues(listPost);
  };

  const updatePost = (post) => {
    setListPost((prevPost) => {
      const updateIndex = prevPost.findIndex((item) => item._id === post._id);
      if (updateIndex > -1) {
        prevPost[updateIndex] = post;
      }
      return {
        ...prevPost,
      };
    });
  };

  const assigmentSocket = useCallback(() => {
    socket.on("posts", (data) => {
      if (data.action === ACTION_TYPE.CREATE) {
        addPost(data.post);
      } else if (data.action === ACTION_TYPE.UPDATE) {
        updatePost(data.post);
      } else if (data.action === ACTION_TYPE.DELETE) {
        assigmentValues();
      }
    });
  }, []);

  const assigmentValues = useCallback(async () => {
    try {
      const result = await getAllPost({ currentPage: 1, perPage: 10 });
      if (!result.Posts) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "There is no post to show",
          typeModal: TYPE_MODAL.ERROR,
        });
      }
      setListPost(result.Posts);
      console.log(result.Posts.length);
      onPutCorrectTheValues(result.Posts);
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  }, []);

  useEffect(() => {
    assigmentValues();
    assigmentSocket();
  }, [assigmentValues, assigmentSocket]);

  const arrayLanes = [
    {
      title: "Went Well",
      items: wentWellList,
      color: "green",
    },
    {
      title: "To Improve",
      items: toImproveList,
      color: "yellow",
    },
    {
      title: "Kudos",
      items: kudos,
      color: "red",
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
