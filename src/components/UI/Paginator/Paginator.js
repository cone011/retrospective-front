import classes from "./Paginator.module.css";

const Paginator = (props) => {
  const { onPrevious, onNext, currentPage, lastPage, children } = props;
  return (
    <div>
      {children}
      <div className={classes.paginatorControls}>
        {currentPage > 1 && (
          <button className="btn" onClick={onPrevious}>
            Previous
          </button>
        )}
        {currentPage < lastPage && (
          <button className="btn" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;
