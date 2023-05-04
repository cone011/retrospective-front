import { Fragment } from "react";
import classes from "./customModal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  const { onClose } = props;
  return <div className={classes.Backdrop} onClick={onClose} />;
};

const ModelOverlay = (props) => {
  const { children } = props;
  return (
    <div className={classes.Modal}>
      <div>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const CustomModal = (props) => {
  const { children, onClose } = props;
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModelOverlay>{children}</ModelOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default CustomModal;
