import { Fragment, useReducer, useState, useContext } from "react";
import classes from "./login.module.css";
import { useNavigate, Link } from "react-router-dom";
import AuthContext, {
  getAuthToken,
  getTokenDuration,
} from "../../context/auth-context";
import Img from "../Assets/loginBackground.svg";
import CustomInput from "../UI/CustomInput/CustomInput";
import {
  NAME_INPUT,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  TYPE_INPUT,
  defaultTodoReducer,
} from "../../utils/const";
import { todoReducer } from "../Reducer/Reducer";
import ShowModal from "../UI/ShowModal/ShowModal";
import { login } from "../../api/user";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const token = getAuthToken();
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      const result = await login({ email: email, password: password });
      if (result) {
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        authCtx.login(result, expiration);
        const tokenDuration = getTokenDuration();
        if (tokenDuration > 0) {
          navigate("/");
        }
      }
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
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
            <div className={classes.userActions}>
              {!token && (
                <Link className={classes.userActionLink} to="/">
                  Login
                </Link>
              )}
              {!token && (
                <Link className={classes.userActionLink} to="/signup">
                  Sign Up
                </Link>
              )}
            </div>
            <h1>Login</h1>
            <form className={classes.form} onSubmit={onLoginHandler}>
              <CustomInput
                value={email}
                typeInput={TYPE_INPUT.EMAIL}
                nameInput={NAME_INPUT.EMAIL}
                labelInput={NAME_INPUT.EMAIL}
                onReturnValue={onValueReturnData}
              />
              <CustomInput
                value={password}
                typeInput={TYPE_INPUT.PASSWORD}
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
