import { Fragment, useCallback, useState, useEffect, useRef } from "react";
import classes from "./FormComment.module.css";

const FormComment = (props) => {
  const { commentId, comment, isNew, onSaveForm, index } = props;

  const commentRef = useRef();

  const assigmentValue = useCallback(() => {
    if (!isNew) {
      commentRef.current.value = comment;
    }
  }, [isNew, comment]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onHandlerForm = () => {
    if (!commentRef.current.value || commentRef.current.value.length === 0) {
    }

    onSaveForm({
      isNew: isNew,
      comment: commentRef.current.value,
      _id: commentId ? commentId : null,
      index: index,
    });
  };

  return (
    <Fragment>
      <div className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="comment">Your Comment</label>
          <textarea name="comment" rows="2" ref={commentRef} />
        </div>
        <div className={classes.action}>
          <button className="btn" type="button" onClick={onHandlerForm}>
            Save Your Comment
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default FormComment;
