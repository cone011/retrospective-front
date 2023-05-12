import { Fragment, useCallback, useEffect, useState } from "react";
import classes from "./SearchList.module.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../UI/Layout/Layout";
import SearchListItem from "../SearchListItem/SearchListItem";

const SearchList = (props) => {
  const { postsFound } = props;
  const [listPostFound, setListPostFound] = useState([]);
  const navigate = useNavigate();

  const assigmentValue = useCallback(() => {
    setListPostFound(postsFound);
  }, [postsFound]);

  useEffect(() => {
    assigmentValue();
  }, [assigmentValue]);

  const onViewPost = (postId) => {
    console.log(postId);
    navigate("/post-from", {
      state: { postId: postId, isNew: false, isView: true },
    });
  };

  return (
    <Fragment>
      <Layout>
        <ul className={classes.listSearch}>
          {listPostFound.map((item) => (
            <SearchListItem
              key={item._id}
              _id={item._id}
              typePost={item.typePost}
              title={item.title}
              onView={onViewPost}
            />
          ))}
        </ul>
      </Layout>
    </Fragment>
  );
};

export default SearchList;
