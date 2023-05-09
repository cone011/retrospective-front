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

  if (typeModal === TYPE_MODAL.ACTION) {
    console.log(registerId);
    return (
      <Fragment>
        <CustomModal onClose={onClose}>
          <div className={classes.messaage}>
            <span>
              <strong>{message}</strong>
            </span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["buton--alt"]}
              onClick={onUpdateRegistration}
            >
              Editar
            </button>
            <button
              className={classes["buton--alt"]}
              onClick={onDeleteRegistration}
            >
              Eliminar
            </button>
          </div>
        </CustomModal>
      </Fragment>
    );
  }
};

export default ShowModal;
