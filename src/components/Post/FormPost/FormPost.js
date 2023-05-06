import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import classes from "./FormPost.module.css";
import { todoReducer } from "../../Reducer/Reducer";
import {
  defaultTodoReducer,
  TYPE_INPUT,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  NAME_INPUT,
} from "../../../utils/const";
import ShowModal from "../../UI/ShowModal/ShowModal";
import Layout from "../../UI/Layout/Layout";
import Card from "../../UI/Card/Card";
import { getPostById, savePost } from "../../../api/post";
import { useLocation } from "react-router-dom";

const FormPost = () => {
  const location = useLocation();
  const { postId, isNew } = location.state;
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [title, setTitle] = useState("");
  const [types, setTypes] = useState([]);

  const assigmentValues = useCallback(async () => {
    if (!isNew) {
      const result = await getPostById(postId);
      const { title, type } = result;
      setTitle(title);
      setTypes(type);
    }
  }, [isNew, postId]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onSubmitData = async (event) => {
    try {
      event.preventDefault();

      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please wait until the registration of the post is finish",
        typeModal: TYPE_MODAL.LOADING,
      });

      if (!title || title.trim().length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter the title for this post",
          typeModal: TYPE_MODAL.ERROR,
        });
      }

      if (!types || types.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "At least select a type for this post",
          typeModal: TYPE_MODAL.ERROR,
        });

        const result = await savePost({
          title: title,
          type: types,
          postId: postId ? postId : null,
          isNew: isNew,
        });

        if (result) {
          dispatchTodo({
            type: TYPE_REDUCER_ACTION.SET_CONFIRM,
            message: "SIGNUP OK",
            typeModal: TYPE_MODAL.CONFIRM,
          });
        }
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
        <Card>
          <form className={classes.form} onSubmit={onSubmitData}>
            <div className={classes.control}>
              <label htmlFor="title">Title</label>
              <input
                type={TYPE_INPUT.TEXT}
                id={NAME_INPUT.TITLE}
                value={title}
                onChange={onTitleHandler}
              />
            </div>
            <div className={classes.actions}>
              <button type="submit">Save</button>
            </div>
          </form>
        </Card>
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

export default FormPost;
