import { useNavigate } from "react-router-dom";
import classes from "./ListTypeItem.module.css";

const ListTypeItem = (props) => {
  const { _id, name } = props;
  const navigate = useNavigate();

  const onModifyType = () => {
    navigate("/type-from", {
      state: { typeId: _id, isNew: false },
    });
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
          <button className="btn">Delete</button>
        </div>
      </figure>
    </li>
  );
};

export default ListTypeItem;
