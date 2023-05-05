import classes from "./Layout.module.css";

const Layout = (props) => {
  const { children } = props;
  return <main className={classes.main}>{children}</main>;
};

export default Layout;
