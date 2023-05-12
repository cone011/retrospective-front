import { Fragment } from "react";
import ListPost from "../Post/ListPost/ListPost";
import classes from "./Home.module.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const onClickNewPost = () => {
    navigate("/post-from", { state: { postId: null, isNew: true } });
  };
  return (
    <Fragment>
      <div className={classes.containerHome}>
        <div className={classes.containerPost}>
          <button onClick={onClickNewPost} className="btn">
            New Post
          </button>
        </div>
        <ListPost />
      </div>
    </Fragment>
  );
};

export default Home;
