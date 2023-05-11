import { useEffect, useCallback, useState, useReducer, Fragment } from "react";
import {
  ACTION_TYPE,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  LIST_PROPERTIES,
  defaultTodoReducer,
  SOCKET_TYPE,
} from "../utils/const";
import { todoReducer } from "../components/Reducer/Reducer";
import ShowModal from "../components/UI/ShowModal/ShowModal";
import { getAllTypes } from "../api/type";
import ListTypes from "../components/Types/ListTypes/ListTypes";
import { socket } from "../socket";

const TypesPage = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [ListType, setListType] = useState([]);

  const assigmentValue = useCallback(async () => {
    try {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please fetching the data",
        typeModal: TYPE_MODAL.LOADING,
      });

      const result = await getAllTypes({
        currentPage: LIST_PROPERTIES.CURRENT_PAGE,
        perPage: LIST_PROPERTIES.PER_PAGE,
      });

      if (result.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "There is no data type",
          typeModal: TYPE_MODAL.ERROR,
        });
      }
      dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
      setListType(result);
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  }, []);

  const assigmentSocket = useCallback(() => {
    socket.on(SOCKET_TYPE.TYPE, (data) => {
      if (data.action === ACTION_TYPE.CREATE) {
        assigmentValue();
      } else if (data.action === ACTION_TYPE.UPDATE) {
        assigmentValue();
      } else if (data.action === ACTION_TYPE.DELETE) {
        assigmentValue();
      }
    });
  }, []);

  useEffect(() => {
    assigmentValue();
    assigmentSocket();
  }, [assigmentValue]);

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  return (
    <Fragment>
      <ListTypes types={ListType} />
      {todo.isLoading && (
        <ShowModal message={todo.message} typeModal={todo.typeModal} />
      )}
      {todo.isError && (
        <ShowModal
          message={todo.message}
          typeModal={todo.typeModal}
          onClose={onCloseModal}
        />
      )}
      {todo.isConfirm && (
        <ShowModal
          message={todo.message}
          typeModal={todo.typeModal}
          onClose={onCloseModal}
          onConfirm={onCloseModal}
        />
      )}
    </Fragment>
  );
};

export default TypesPage;
