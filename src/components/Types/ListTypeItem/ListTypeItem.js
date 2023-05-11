import classes from "./ListTypeItem.module.css";

const ListTypeItem = (props) => {
  const { _id, name, onDelete, onModify } = props;

  const onModifyType = () => {
    onModify({ _id: _id, name: name });
  };

  const onDeleteType = () => {
    onDelete(_id);
  };

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{name}</p>
        </blockquote>
        <figcaption>{_id}</figcaption>
        <div className={classes.buttons}>
          <button className="btn" onClick={onModifyType}>
            Edit
          </button>
          <button className="btn" onClick={onDeleteType}>
            Delete
          </button>
        </div>
      </figure>
    </li>
  );
};

export default ListTypeItem;
