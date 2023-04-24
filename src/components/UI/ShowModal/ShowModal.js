import { Fragment } from "react";
import CustomModal from "../customModal/customModal";
import classes from "./ShowModal.module.css";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";

const ShowModal = (props) => {
  const { onClose, onConfirm, typeMeodal, message } = props;

  if (typeMeodal === "LOADING") {
    <Fragment>
      <CustomModal>
        <div className={classes.messaage}>{message}</div>
        <LoadingSpinner />
      </CustomModal>
    </Fragment>;
  }

  if (typeMeodal === "ERROR") {
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
    </Fragment>;
  }
};

export default ShowModal;
