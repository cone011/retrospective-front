import classes from "./ListTypeItem.module.css";

const ListTypeItem = (props) => {
  const { _id, name } = props;

  return (
    <tr key={_id}>
      <td>{name}</td>
    </tr>
  );
};

export default ListTypeItem;
