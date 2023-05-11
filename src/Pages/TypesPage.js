import { useEffect, useCallback, useState, useReducer, Fragment } from "react";
import {
  ACTION_TYPE,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  PAGINATION_PROPERTIES,
  defaultTodoReducer,
  SOCKET_TYPE,
} from "../utils/const";
import { todoReducer } from "../components/Reducer/Reducer";
import ShowModal from "../components/UI/ShowModal/ShowModal";
import { getAllTypes } from "../api/type";
import ListTypes from "../components/Types/ListTypes/ListTypes";
import { socket } from "../socket";
import Paginator from "../components/UI/Paginator/Paginator";

const TypesPage = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [ListType, setListType] = useState([]);
  const [page, setPage] = useState(PAGINATION_PROPERTIES.CURRENT_PAGE);
  const [perPage, setPerPage] = useState(PAGINATION_PROPERTIES.PER_PAGE);
  const [totalItems, setTotalItems] = useState(0);

  const onLoadTypes = async (direction) => {
    if (direction) {
      setListType([]);
    }

    let currentePage = page;

    if (direction === PAGINATION_PROPERTIES.NEXT) {
      currentePage++;
      setPage(currentePage);
    } else if (direction === PAGINATION_PROPERTIES.PREVIOUS) {
      setPage(currentePage);
    }

    const result = await getAllTypes({
      currentPage: currentePage,
      perPage: perPage,
    });

    if (result.types.length === 0) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: "There is no data type",
        typeModal: TYPE_MODAL.ERROR,
      });
    }
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
    setListType(result.types);
    setTotalItems(result.totalItems);
  };

  const assigmentValue = useCallback(async () => {
    try {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please fetching the data",
        typeModal: TYPE_MODAL.LOADING,
      });
      onLoadTypes();
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

  const onPreviousPage = () => {
    onLoadTypes(PAGINATION_PROPERTIES.PREVIOUS);
  };

  const onNextPage = () => {
    onLoadTypes(PAGINATION_PROPERTIES.NEXT);
  };

  return (
    <Fragment>
      <Paginator
        onPrevious={onPreviousPage}
        onNext={onNextPage}
        currentPage={page}
        lastPage={Math.ceil(totalItems / 2)}
      >
        <ListTypes types={ListType} />
      </Paginator>

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
