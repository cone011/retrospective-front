import { Fragment } from "react";
import CustomModal from "../CustomModal/CustomModal";
import classes from "./ShowModal.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { TYPE_MODAL } from "../../../utils/const";

const ShowModal = (props) => {
  const { onClose, onConfirm, typeModal, message } = props;

  if (typeModal === TYPE_MODAL.LOADING) {
    return (
      <Fragment>
        <CustomModal>
          <div className={classes.messaage}>{message}</div>
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
              <strong>{message}</strong>
            </span>
          </div>
          <div className={classes.actions}>
            <button className={classes["buton--alt"]} onClick={onClose}>
              Close
            </button>
          </div>
        </CustomModal>
      </Fragment>
    );
  }

  if (typeModal === TYPE_MODAL.CONFIRM) {
    console.log("entro");
    return (
      <Fragment>
        <CustomModal onClose={onClose}>
          <div className={classes.messaage}>
            <span>
              <strong>{message}</strong>
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
};

export default ShowModal;
