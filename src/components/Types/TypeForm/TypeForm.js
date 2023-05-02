import { useState, useReducer, Fragment } from "react";
import classes from "./TypeForm.module.css";
import {
  NAME_INPUT,
  TYPE_INPUT,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  defaultTodoReducer,
} from "../../../utils/const";
import { todoReducer } from "../../Reducer/Reducer";
import ShowModal from "../../UI/ShowModal/ShowModal";
import { saveType } from "../../../api/type";
import CustomInput from "../../UI/CustomInput/CustomInput";

const TagForm = () => {
  const [name, setName] = useState("");
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);

  const onValueReturnData = (data, nameInput) => {
    if (nameInput === NAME_INPUT.NAME) setName(data);
  };

  const onSubmitData = async (event) => {
    event.preventDefault();
    dispatchTodo({
      type: TYPE_REDUCER_ACTION.SET_LOADING,
      message: "Please wait until the save is over",
      typeModal: TYPE_MODAL.LOADING,
    });
    if (!name || name.trim().length === 0) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: "Please enter a name for this type",
        typeModal: TYPE_MODAL.ERROR,
      });
    }

    const result = await saveType({ isNew: true, name: name });

    if (result) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_CONFIRM,
        message: "SIGNUP OK",
        typeModal: TYPE_MODAL.CONFIRM,
      });
    }
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={onSubmitData}>
        <CustomInput
          value={name}
          typeInput={TYPE_INPUT.TEXT}
          nameInput={NAME_INPUT.NAME}
          labelInput={NAME_INPUT.NAME}
          onReturnValue={onValueReturnData}
        />
        <button className={classes.button} type="submit">
          Save
        </button>
      </form>
      {todo.isLoading && (
        <ShowModal message={todo.message} typeModal={todo.typeModal} />
      )}
      {todo.isError && (
        <ShowModal
          message={todo.message}
          typeModal={todo.typeModal}
          onClose={onCloseModal}
        />
      )}
      {todo.isConfirm && (
        <ShowModal
          message={todo.message}
          typeModal={todo.typeModal}
          onClose={onCloseModal}
          onConfirm={onCloseModal}
        />
      )}
    </Fragment>
  );
};

export default TagForm;
