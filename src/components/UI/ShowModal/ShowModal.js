import { Fragment } from "react";
import CustomModal from "../customModal/customModal";
import classes from "./ShowModal.module.css";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import { TYPE_MODAL } from "../../../utils/const";

const ShowModal = (props) => {
  const {
    onClose,
    onConfirm,
    onUpdate,
    onDelete,
    typeModal,
    registerId,
    message,
  } = props;

  const onDeleteRegistration = () => {
    onDelete(registerId);
  };

  const onUpdateRegistration = () => {
    onUpdate(registerId);
  };

  if (typeModal === TYPE_MODAL.LOADING) {
    return (
      <Fragment>
        <CustomModal>
          <div className={classes.messageTitle}>{message}</div>
          <LoadingSpinner />
        </CustomModal>
      </Fragment>
    );
  }

  if (typeModal === TYPE_MODAL.ERROR) {
    return (
      <Fragment>
        <CustomModal onClose={onClose}>
          <div className={classes.messaage}>
            <span>
              <strong className={classes.messageTitle}>{message}</strong>
            </span>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </CustomModal>
      </Fragment>
    );
  }

  if (typeModal === TYPE_MODAL.CONFIRM) {
    return (
      <Fragment>
        <CustomModal onClose={onClose}>
          <div className={classes.messaage}>
            <span>
              <strong className={classes.messageTitle}>{message}</strong>
            </span>
          </div>
          <div className={classes.actions}>
            <button className={classes["buton--alt"]} onClick={onConfirm}>
              Ok
            </button>
          </div>
        </CustomModal>
      </Fragment>
    );
  }

  if (typeModal === TYPE_MODAL.ACTION) {
    return (
      <Fragment>
        <CustomModal onClose={onClose}>
          <div className={classes.messaage}>
            <span className="centered">
              <strong className={classes.messageTitle}>{message}</strong>
            </span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes.btnCentered}
              onClick={onUpdateRegistration}
            >
              Modify
            </button>
            <button
              className={classes.btnCentered}
              onClick={onDeleteRegistration}
            >
              Delete
            </button>
          </div>
        </CustomModal>
      </Fragment>
    );
  }
};

export default ShowModal;
