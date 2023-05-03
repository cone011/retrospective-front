import classes from "./PostItems.module.css";

const PostItems = (props) => {
  const { _id, title, name, creator, lastUser } = props;

  return (
    <article className={classes.post}>
      <header>
        <h3 className={classes.postMeta}>Post by {creator}</h3>
      </header>
      <div className={classes.postTitle}>{title}</div>
      <div className={classes.postActions}></div>
    </article>
  );
};

export default PostItems;
