import { Fragment } from "react";
import ListTypeItem from "../ListTypeItem/ListTypeItem";
import classes from "./ListTypes.module.css";
import Layout from "../../UI/Layout/Layout";

const ListTypes = (props) => {
  const { types } = props;

  return (
    <Fragment>
      <Layout>
        <div className={classes.sortingList}>
          <button>Sort CONFIG</button>
        </div>
        <ul className={classes.listType}>
          {types.map((item) => (
            <ListTypeItem key={item._id} _id={item._id} name={item.name} />
          ))}
        </ul>
      </Layout>
    </Fragment>
  );
};

export default ListTypes;
