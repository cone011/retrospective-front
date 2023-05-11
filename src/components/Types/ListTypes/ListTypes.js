import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import ListTypeItem from "../ListTypeItem/ListTypeItem";
import classes from "./ListTypes.module.css";
import Layout from "../../UI/Layout/Layout";
import ShowModal from "../../UI/ShowModal/ShowModal";
import {
  defaultTodoReducer,
  TYPE_REDUCER_ACTION,
  TYPE_MODAL,
} from "../../../utils/const";
import { todoReducer } from "../../Reducer/Reducer";
import { useNavigate } from "react-router-dom";
import { deleteType } from "../../../api/type";

const ListTypes = (props) => {
  const { types } = props;
  const [listType, setListType] = useState([]);
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const navigate = useNavigate();

  const assigmentValue = useCallback(() => {
    setListType(types);
  });

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onNewType = () => {
    navigate("/type-form", {
      state: { isNew: true },
    });
  };

  const onModifyType = (data) => {
    const { _id } = data;
    navigate("/type-form", {
      state: { isNew: false, _id: _id },
    });
  };

  const onDeleteType = async (data) => {
    try {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please wait for the deletion of this registration",
        typeModal: TYPE_MODAL.LOADING,
      });
      const result = await deleteType(data);
      if (result) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_CONFIRM,
          message: "The type was deleted correctly",
          typeModal: TYPE_MODAL.CONFIRM,
        });
        const reusltArray = listType.filter((item) => item._id !== data);
        setListType(reusltArray);
      }
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  return (
    <Fragment>
      <Layout>
        <div className={classes.sortingList}>
          <button onClick={onNewType}>New Type</button>
        </div>
        <ul className={classes.listType}>
          {listType.map((item) => (
            <ListTypeItem
              key={item._id}
              _id={item._id}
              name={item.name}
              onModify={onModifyType}
              onDelete={onDeleteType}
            />
          ))}
        </ul>
      </Layout>
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

export default ListTypes;
