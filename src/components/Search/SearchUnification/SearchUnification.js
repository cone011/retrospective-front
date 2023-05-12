import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import Paginator from "../../UI/Paginator/Paginator";
import SearchForm from "../SearchForm/SearchForm";
import { todoReducer } from "../../Reducer/Reducer";
import {
  TYPE_REDUCER_ACTION,
  TYPE_MODAL,
  defaultTodoReducer,
  PAGINATION_PROPERTIES,
} from "../../../utils/const";
import SearchList from "../SearchList/SearchList";
import ShowModal from "../../UI/ShowModal/ShowModal";
import { getSearchPostByParameters } from "../../../api/post";
import Totaltems from "../../UI/Totaltems/Totaltems";

const SearchUnification = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [listSearchResult, setListSearchResult] = useState([]);
  const [page, setPage] = useState(PAGINATION_PROPERTIES.CURRENT_PAGE);
  const [perPage, setPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [parametersFilter, setParametersFilter] = useState({});

  const assigmentValue = useCallback(() => {
    setPerPage(PAGINATION_PROPERTIES.PER_PAGE);
  }, []);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onReturnSearchData = async (data) => {
    try {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please wait until the searching is finish",
        typeModal: TYPE_MODAL.LOADING,
      });
      setIsComplete(false);
      setParametersFilter(data);
      await onSearchResultFound(data, {
        currentPage: page,
        perPage: PAGINATION_PROPERTIES.PER_PAGE,
      });

      dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  };

  const onSearchResultFound = async (data, dataPagination) => {
    try {
      const result = await getSearchPostByParameters(data, dataPagination);
      if (result.posts.length) setListSearchResult(result.posts);
      setTotalItems(result.totalItems);
      setIsComplete(true);
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  };

  const onLoadPosts = async (direction) => {
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_LOADING,
      message: "Please wait until the searching is finish",
      typeModal: TYPE_MODAL.LOADING,
    });
    setIsComplete(false);
    if (direction) {
      setListSearchResult([]);
    }

    let currentePage = page;

    if (direction === PAGINATION_PROPERTIES.NEXT) {
      currentePage++;
      setPage(currentePage);
    } else if (direction === PAGINATION_PROPERTIES.PREVIOUS) {
      currentePage--;
      setPage(currentePage);
    }

    onSearchResultFound(parametersFilter, {
      currentPage: currentePage,
      perPage: PAGINATION_PROPERTIES.PER_PAGE,
    });
    setIsComplete(true);
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  const onPreviousPage = () => {
    onLoadPosts(PAGINATION_PROPERTIES.PREVIOUS);
  };

  const onNextPage = () => {
    onLoadPosts(PAGINATION_PROPERTIES.NEXT);
  };

  return (
    <Fragment>
      <SearchForm onReturnData={onReturnSearchData} />
      {isComplete && (
        <Paginator
          onPrevious={onPreviousPage}
          onNext={onNextPage}
          currentPage={page}
          lastPage={Math.ceil(totalItems / perPage)}
        >
          <SearchList postsFound={listSearchResult} />
        </Paginator>
      )}
      {isComplete && <Totaltems totalItems={totalItems} />}
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

export default SearchUnification;
