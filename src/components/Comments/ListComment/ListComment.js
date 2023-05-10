import { Fragment, useReducer, useState } from "react";
import classes from "./ListComment.module.css";
import { useCallback } from "react";
import { useEffect } from "react";
import FormComment from "../FormComment/FormComment";
import { todoReducer } from "../../Reducer/Reducer";
import { defaultTodoReducer, TYPE_REDUCER_ACTION } from "../../../utils/const";
import ListCommentItem from "../ListCommentItem/ListCommentItem";
import { deleteComment } from "../../../api/comments";

const ListComment = (props) => {
  const { haveComments, comments, onReturnData } = props;
  const [listComments, setListComments] = useState([]);
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);

  const onReturnCommentsData = (commentsData) => {
    onReturnData(commentsData);
  };

  const onModifyComment = (commentItem) => {
    const { _id, comment, index } = commentItem;
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_COMMENT_FORM,
      compoment: (
        <FormComment
          isNew={false}
          comment={comment}
          commentId={_id}
          index={index}
          onSaveForm={onSaveData}
        />
      ),
    });
  };

  const onDeleteComment = async (commentItem) => {
    const { _id, index } = commentItem;
    const auxList = listComments;
    if (_id !== null) {
      const result = await deleteComment(_id);
    } else {
      auxList.splice(index, 1);
    }
    setListComments(auxList);
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_COMMENT,
      haveComments: true,
      compoment: auxList.map((item, index) => (
        <ListCommentItem
          key={index}
          index={index}
          _id={item._id}
          comment={item.comment}
          onModify={onModifyComment}
          onDelete={onDeleteComment}
        />
      )),
    });
    onReturnCommentsData(auxList);
  };

  const assigmentValue = useCallback(() => {
    if (haveComments) {
      setListComments(comments);
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_COMMENT,
        haveComments: false,
        compoment: comments.map((item, index) => (
          <ListCommentItem
            key={index}
            _id={item._id}
            comment={item.comment}
            onModify={onModifyComment}
            onDelete={onDeleteComment}
          />
        )),
      });
    } else {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_COMMENT,
        haveComments: false,
        compoment: <p className="centered">No comments were added yet!</p>,
      });
    }
  }, [haveComments, comments]);

  const onShowCommentForm = () => {
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_COMMENT_FORM,
      compoment: <FormComment isNew={true} onSaveForm={onSaveData} />,
    });
  };

  const onSaveData = (data) => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
    const { _id, comment, index } = data;
    const auxList = listComments;
    if (auxList[index]) {
      let currentValue = auxList[index];
      currentValue._id = _id;
      currentValue.comment = comment;
      auxList[index] = currentValue;
    } else {
      auxList.unshift(data);
    }
    setListComments(auxList);
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_COMMENT,
      haveComments: true,
      compoment: auxList.map((item, index) => (
        <ListCommentItem
          key={index}
          index={index}
          _id={item._id}
          comment={item.comment}
          onModify={onModifyComment}
          onDelete={onDeleteComment}
        />
      )),
    });
    onReturnCommentsData(auxList);
  };

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  return (
    <Fragment>
      <section className={classes.comments}>
        <h2>Posts Comments</h2>
        {!todo.isForm && (
          <button className="btn" onClick={onShowCommentForm}>
            Add a Comment
          </button>
        )}
        {!todo.isForm && todo.compoment}
        {todo.isForm && todo.compoment}
      </section>
    </Fragment>
  );
};

export default ListComment;
