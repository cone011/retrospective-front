import { Fragment } from "react";
import ListPost from "../Post/ListPost/ListPost";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <Fragment>
      <div className={classes.containerHome}>
        <div className={classes.containerPost}>
          {/* <h1>
            <span>always be</span>
            <div className="message">
              <div className="word1">Agile</div>
              <div className="word2">with</div>
              <div className="word3">AgileEx</div>
            </div>
          </h1> */}
        </div>
        <ListPost />
      </div>
      <footer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
          backgroundColor: "#e2e8f0",
          bottom: "0",
        }}
      ></footer>
    </Fragment>
  );
};

export default Home;
