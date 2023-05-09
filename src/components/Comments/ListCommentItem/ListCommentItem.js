import classes from "./ListCommentItem.module.css";

const ListCommentItem = (props) => {
  const { index, _id, comment, onModify } = props;

  const onClickComment = () => {
    onModify({
      comment: comment,
      _id: _id ? _id : null,
      isNew: _id == null ? true : false,
    });
  };

  return (
    <figure key={index} className={classes.item} onClick={onClickComment}>
      <p>{comment}</p>
    </figure>
  );
};

export default ListCommentItem;
