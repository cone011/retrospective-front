import classes from "./Totaltems.module.css";

const Totaltems = (props) => {
  const { totalItems } = props;
  return (
    <div className={classes.containerPost}>
      <h1 className={classes.messageTitle}>Total Items: {totalItems}</h1>
    </div>
  );
};

export default Totaltems;
