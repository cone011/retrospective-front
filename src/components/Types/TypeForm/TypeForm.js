import { useState, useReducer, Fragment, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { getTypeById, saveType } from "../../../api/type";
import Card from "../../UI/Card/Card";
import Layout from "../../UI/Layout/Layout";

const TypeForm = () => {
  const location = useLocation();
  const { _id, isNew } = location.state;
  const [name, setName] = useState("");
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const navigate = useNavigate();

  const assigmentValues = useCallback(async () => {
    if (!isNew) {
      const result = await getTypeById(_id);
      setName(result.name);
    }
  }, [isNew, _id]);

  useEffect(() => {
    assigmentValues();
  }, [assigmentValues]);

  const onValueReturnData = (event) => {
    setName(event.target.value);
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
      return;
    }

    const result = await saveType({ isNew: isNew, name: name, typeId: _id });

    if (result) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_CONFIRM,
        message: "Save type complete",
        typeModal: TYPE_MODAL.CONFIRM,
      });
      navigate("/type");
    }
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  return (
    <Fragment>
      <Layout>
        <Card>
          <form className={classes.form} onSubmit={onSubmitData}>
            <div className={classes.control}>
              <label htmlFor="name">Name</label>
              <input
                type={TYPE_INPUT.TEXT}
                id={NAME_INPUT.NAME}
                value={name}
                onChange={onValueReturnData}
              />
            </div>
            <div className={classes.action}>
              <button className="btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </Card>
      </Layout>
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

export default TypeForm;
