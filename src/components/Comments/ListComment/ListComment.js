import { useReducer, useState } from "react";
import classes from "./ListComment.module.css";
import { useCallback } from "react";
import { useEffect } from "react";
import FormComment from "../FormComment/FormComment";
import { todoReducer } from "../../Reducer/Reducer";
import { defaultTodoReducer, TYPE_REDUCER_ACTION } from "../../../utils/const";
import ListCommentItem from "../ListCommentItem/ListCommentItem";

const ListComment = (props) => {
  const { haveComments, comments } = props;
  const [listComments, setListComments] = useState([]);
  const [isShowCommentForm, setIsShowCommentForm] = useState(false);
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);

  const onModifyComment = (data) => {
    console.log(data);
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
    setIsShowCommentForm(true);
  };

  const onSaveData = (data) => {
    setIsShowCommentForm(false);
    const auxList = listComments;
    auxList.unshift(data);
    setListComments(auxList);
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_COMMENT,
      haveComments: true,
      compoment: auxList.map((item, index) => (
        <ListCommentItem
          key={index}
          _id={item._id}
          comment={item.comment}
          onModify={onModifyComment}
        />
      )),
    });
  };

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  return (
    <section className={classes.comments}>
      <h2>Posts Comments</h2>
      {!isShowCommentForm && (
        <button className="btn" onClick={onShowCommentForm}>
          Add a Comment
        </button>
      )}
      {!isShowCommentForm && todo.compoment}
      {isShowCommentForm && (
        <FormComment isNew={true} onSaveForm={onSaveData} />
      )}
    </section>
  );
};

export default ListComment;
