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
import { getPostById, savePost } from "../../../api/post";

const FormPost = (props) => {
  const { postId, isNew } = props;
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

  const onValueReturnData = (data, nameInput) => {
    if (nameInput === NAME_INPUT.TITLE) setTitle(data);
    if (nameInput === NAME_INPUT.TYPES) setTypes(data);
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

  return (
    <Fragment>
      <form onSubmit={onSubmitData}>
        <CustomInput
          value={title}
          typeInput={TYPE_INPUT.TEXT}
          nameInput={NAME_INPUT.TITLE}
          labelInput={NAME_INPUT.TITLE}
          onReturnValue={onValueReturnData}
        />
        <button className={classes.button} type="submit">
          Enter
        </button>
      </form>
    </Fragment>
  );
};

export default FormPost;
