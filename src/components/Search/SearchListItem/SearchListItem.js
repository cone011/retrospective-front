import classes from "./SearchListItem.module.css";

const SearchListItem = (props) => {
  const { _id, typePost, title, onView } = props;

  const onViewData = () => {
    onView(_id);
  };

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{title}</p>
        </blockquote>
        <div className={classes.buttons}>
          <button className="btn" onClick={onViewData}>
            View Detail
          </button>
        </div>
      </figure>
    </li>
  );
};

export default SearchListItem;
