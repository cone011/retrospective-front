import { Fragment, useCallback, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./FormPost.module.css";
import { todoReducer } from "../../Reducer/Reducer";
import {
  defaultTodoReducer,
  TYPE_INPUT,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  NAME_INPUT,
  ACTION_TYPE,
  SOCKET_TYPE,
} from "../../../utils/const";
import ShowModal from "../../UI/ShowModal/ShowModal";
import Layout from "../../UI/Layout/Layout";
import Card from "../../UI/Card/Card";
import { getPostById, savePost } from "../../../api/post";
import SelectCheck from "react-select";
import { getAllTypesForSelect } from "../../../api/type";
import { getAllTypePost } from "../../../api/typePost";
import ListComment from "../../Comments/ListComment/ListComment";
import { getCommentsByPost, saveComments } from "../../../api/comments";
import { socket } from "../../../socket";

const FormPost = () => {
  const location = useLocation();
  const { postId, isNew } = location.state;
  const navigate = useNavigate();
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [title, setTitle] = useState("");
  const [typePostSelected, setTypePostSelected] = useState({});
  const [typeSelected, setTypeSelected] = useState([]);
  const [listType, setListType] = useState([]);
  const [listTypePost, setListTypePost] = useState([]);
  const [comments, setComments] = useState([]);

  const addComments = (comment) => {
    setComments((prevState) => {
      const updatePost = comment;
      return updatePost;
    });
  };

  const assigmentSocket = useCallback(() => {
    socket.on(SOCKET_TYPE.COMMENTS, (data) => {
      if (data.action === ACTION_TYPE.SAVE_COMMENT) {
        addComments(data.comment);
      } else if (data.action === ACTION_TYPE.DELETE) {
        assigmentComments();
      }
    });
  }, []);

  const assigmentComments = useCallback(async () => {
    const resultComments = await getCommentsByPost(postId);
    setComments(resultComments.comments);
  }, []);

  const assigmentValues = useCallback(async () => {
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_LOADING,
      message: "Please wait for the data",
      typeModal: TYPE_MODAL.LOADING,
    });
    const resultTypePost = await getAllTypePost();
    setListTypePost(resultTypePost);
    const resultType = await getAllTypesForSelect();
    setListType(resultType);
    if (!isNew) {
      const result = await getPostById(postId);
      const { title, type, typePost } = result;
      const defaultTypes = [];
      assigmentComments();
      const defaultTypePost = resultTypePost.find(
        (item) => item.value === typePost
      );
      for (let i = 0; i < type.length; i++) {
        defaultTypes.push(resultType.find((item) => item.value === type[i]));
      }
      setTitle(title);
      setTypeSelected(defaultTypes);
      setTypePostSelected(defaultTypePost);
    }
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  }, [isNew, postId]);

  useEffect(() => {
    assigmentValues();
    assigmentSocket();
  }, [assigmentValues]);

  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onTypesHandler = (data) => {
    setTypeSelected(
      data.map((item) => {
        return item;
      })
    );
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

      if (!typePostSelected || typePostSelected.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "At least select a type for this post",
          typeModal: TYPE_MODAL.ERROR,
        });
      }

      const listTypeId = typeSelected.map((item) => {
        return item.value;
      });

      const result = await savePost({
        title: title,
        typePost: typePostSelected,
        type: listTypeId,
        postId: postId ? postId : null,
        isNew: isNew,
      });

      const resultComments = await saveComments({
        postId: result.postId,
        comments: comments,
      });

      if (result.isSaved && resultComments) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_CONFIRM,
          message: "The post was saved correctly",
          typeModal: TYPE_MODAL.CONFIRM,
        });
        navigate("/");
      }
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  };

  const onTypePostHandler = (data) => {
    setTypePostSelected(data);
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  const onReturnComentarios = (data) => {
    setComments(data);
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
            <div className={classes.control}>
              <label htmlFor="typePost">Type Post</label>
              <SelectCheck
                className={classes.checkBox}
                options={listTypePost}
                value={typePostSelected}
                onChange={onTypePostHandler}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="type">Type</label>
              <SelectCheck
                className={classes.checkBox}
                isMulti
                value={typeSelected}
                options={listType}
                onChange={onTypesHandler}
              />
            </div>
            <ListComment
              haveComments={comments.length > 0 ? true : false}
              comments={comments}
              onReturnData={onReturnComentarios}
            />
            <div className={classes.action}>
              <button className="btn" type="submit">
                Save
              </button>
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
