import classes from "./Home.module.css";

const Home = () => {
  return (
    <div className="App">
      <div className={classes.content}>
        <div className={classes.animatedFadeIn}>
          <div class="row">
            <div class="col-lg-3 col-md-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
