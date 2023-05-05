import classes from "./ListTypeItem.module.css";

const ListTypeItem = (props) => {
  const { _id, name } = props;

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{name}</p>
        </blockquote>
        <figcaption>{_id}</figcaption>
        <div className={classes.buttons}>
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>
      </figure>
    </li>
  );
};

export default ListTypeItem;
