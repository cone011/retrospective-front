import ListTypeItem from "../ListTypeItem/ListTypeItem";
import classes from "./ListTypes.module.css";

const ListTypes = (props) => {
  const { types } = props;
  return (
    <div className={classes.events}>
      <h1>All Types</h1>
      <ul className={classes.list}>
        {types.map((item) => (
          <ListTypeItem _id={item._id} name={item.name} />
        ))}
      </ul>
    </div>
  );
};

export default ListTypes;
