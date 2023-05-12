import { DndContext, rectIntersection } from "@dnd-kit/core";
import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { todoReducer } from "../../Reducer/Reducer";
import {
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  ACTION_TYPE,
  TYPE_POST,
  defaultTodoReducer,
  SOCKET_TYPE,
} from "../../../utils/const";
import { Flex } from "@chakra-ui/react";
import PostLine from "../PostLine/PostLine";
import { deletePost, getAllPost } from "../../../api/post";
import { socket } from "../../../socket";
import ShowModal from "../../UI/ShowModal/ShowModal";
import Totaltems from "../../UI/Totaltems/Totaltems";

const ListPost = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [listPost, setListPost] = useState([]);
  const navigate = useNavigate();
  const [wentWellList, setWentWellList] = useState([]);
  const [toImproveList, setToImproveList] = useState([]);
  const [kudos, setKudosList] = useState([]);

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

  const onDeletePost = useCallback(async (data) => {
    try {
      const result = await deletePost(data);
      if (result) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_CONFIRM,
          message: "The post was deleted correctly",
          typeModal: TYPE_MODAL.CONFIRM,
        });
      }
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  }, []);

  const onModifyPost = (data) => {
    navigate("/post-from", {
      state: { postId: data, isNew: false, isView: false },
    });
  };

  const onPutValues = (data) => {
    const listWent = [];
    const listImprove = [];
    const listKudo = [];
    let currentValue;
    for (let i = 0; i < data.length; i++) {
      currentValue = data[i];
      if (
        currentValue.typePost.label === TYPE_POST.WENT_WELL ||
        currentValue.typePost.name === TYPE_POST.WENT_WELL
      ) {
        listWent.push({ title: currentValue.title, _id: currentValue._id });
      }
      if (
        currentValue.typePost.label === TYPE_POST.TO_IMPROVE ||
        currentValue.typePost.name === TYPE_POST.TO_IMPROVE
      ) {
        listImprove.push({ title: currentValue.title, _id: currentValue._id });
      }
      if (
        currentValue.typePost.label === TYPE_POST.KUDOS ||
        currentValue.typePost.name === TYPE_POST.KUDOS
      ) {
        listKudo.push({ title: currentValue.title, _id: currentValue._id });
      }
    }
    setWentWellList(listWent);
    setToImproveList(listImprove);
    setKudosList(listKudo);
  };

  const addPost = (post) => {
    setListPost((prevState) => {
      const updatePost = prevState;
      updatePost.unshift(post);
      onPutValues(updatePost);
      return updatePost;
    });
  };

  const updatePost = (post) => {
    setListPost((prevState) => {
      const updatePost = prevState;
      const updateIndex = updatePost.findIndex((item) => item._id === post._id);
      if (updateIndex > -1) {
        updatePost[updateIndex] = post;
      }
      onPutValues(updatePost);
      return updatePost;
    });
  };

  const assigmentSocket = useCallback(() => {
    socket.on(SOCKET_TYPE.POST, (data) => {
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
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please wait for the data",
        typeModal: TYPE_MODAL.LOADING,
      });
      const result = await getAllPost({ currentPage: 1, perPage: 10 });
      if (!result.Posts) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "There is no post to show",
          typeModal: TYPE_MODAL.ERROR,
        });
      }
      setListPost(result.Posts);
      onPutCorrectTheValues(result.Posts);
      dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
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
      title: TYPE_POST.WENT_WELL,
      items: wentWellList,
      color: "green",
    },
    {
      title: TYPE_POST.TO_IMPROVE,
      items: toImproveList,
      color: "yellow",
    },
    {
      title: TYPE_POST.KUDOS,
      items: kudos,
      color: "red",
    },
  ];

  const onChangePlace = (data) => {
    const index = data.active.data.current?.index;
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_ACTION,
      postId: index,
      typeModal: TYPE_MODAL.ACTION,
      message: "What action do you wanna do?",
    });
  };

  const onCloseModalHandler = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  return (
    <Fragment>
      <Totaltems totalItems={listPost.length} />
      <DndContext
        collisionDetection={rectIntersection}
        onDragEnd={onChangePlace}
      >
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
      {todo.isLoading && (
        <ShowModal message={todo.message} typeModal={todo.typeModal} />
      )}
      {todo.isShowing && (
        <ShowModal
          registerId={todo.postId}
          typeModal={todo.typeModal}
          message={todo.message}
          onDelete={onDeletePost}
          onUpdate={onModifyPost}
          onClose={onCloseModalHandler}
        />
      )}
      {todo.isConfirm && (
        <ShowModal
          message={todo.message}
          typeModal={todo.typeModal}
          onClose={onCloseModalHandler}
          onConfirm={onCloseModalHandler}
        />
      )}
    </Fragment>
  );
};

export default ListPost;
