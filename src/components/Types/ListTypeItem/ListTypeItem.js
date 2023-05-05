import classes from "./ListTypeItem.module.css";

const ListTypeItem = (props) => {
  const { _id, name } = props;

  return (
    <li key={_id} className={classes.itemType}>
      <div className={classes.content}>
        <h2>{name}</h2>
      </div>
    </li>
  );
};

export default ListTypeItem;
