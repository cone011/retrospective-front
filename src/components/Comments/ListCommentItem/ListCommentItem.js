import classes from "./ListCommentItem.module.css";

const ListCommentItem = (props) => {
  const { index, _id, comment, onModify, onDelete } = props;

  const onModifyComment = () => {
    onModify({
      comment: comment,
      _id: _id ? _id : null,
      isNew: _id == null ? true : false,
      index: index,
    });
  };

  const onDeleteComment = () => {
    onDelete({
      comment: comment,
      _id: _id ? _id : null,
      isNew: _id == null ? true : false,
      index: index,
    });
  };

  return (
    <figure key={index} className={classes.item}>
      <p>{comment}</p>
      <div className={classes.buttons}>
        <button
          className={classes.btnItem}
          type="button"
          onClick={onModifyComment}
        >
          Edit
        </button>
        <button
          className={classes.btnItem}
          type="button"
          onClick={onDeleteComment}
        >
          Delete
        </button>
      </div>
    </figure>
  );
};

export default ListCommentItem;
