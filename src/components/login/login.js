import { Fragment, useReducer, useState } from "react";
import classes from "./Login.module.css";
import Img from "../Assets/loginBackground.svg";
import CustomInput from "../UI/CustomInput/CustomInput";
import {
  NAME_INPUT,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  defaultTodoReducer,
} from "../../utils/const";
import { todoRecducer } from "../Reducer/Reducer";
import ShowModal from "../UI/ShowModal/ShowModal";

const Login = () => {
  const [todo, dispatchTodo] = useReducer(todoRecducer, defaultTodoReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = async (event) => {
    event.preventDefault();
    try {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Validation the user and the password, Please wait",
        typeModal: TYPE_MODAL.LOADING,
      });
      if (!email || email.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your email to enter to the application",
          typeModal: TYPE_MODAL.ERROR,
        });
      }

      if (!password || password.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your password to enter to the application",
          typeModal: TYPE_MODAL.ERROR,
        });
      }
      console.log("llego aca al final");
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_CONFIRM,
        message: "LOGIN OK",
        typeModal: TYPE_MODAL.CONFIRM,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onValueReturnData = (data, nameInput) => {
    if (nameInput === NAME_INPUT.EMAIL) setEmail(data);
    if (nameInput === NAME_INPUT.PASSWORD) setPassword(data);
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  return (
    <Fragment>
      <div className={classes.bodyLogin}>
        <div className={classes.leftLogin}>
          <img src={Img} alt="background" className={classes.chart} />
        </div>
        <div className={classes.rigthLogin}>
          <div className={classes.cardLogin}>
            <h1>Login</h1>
            <form className={classes.form} onSubmit={onLoginHandler}>
              <CustomInput
                value={email}
                typeInput="email"
                nameInput={NAME_INPUT.EMAIL}
                labelInput={NAME_INPUT.EMAIL}
                onReturnValue={onValueReturnData}
              />
              <CustomInput
                value={password}
                typeInput="password"
                nameInput={NAME_INPUT.PASSWORD}
                labelInput={NAME_INPUT.PASSWORD}
                onReturnValue={onValueReturnData}
              />
              <button className={classes.button} type="submit">
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
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

export default Login;
