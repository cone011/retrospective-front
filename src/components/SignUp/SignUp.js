import { useState, useReducer, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./SignUp.module.css";
import Img from "../Assets/loginBackground.svg";
import CustomInput from "../UI/CustomInput/CustomInput";
import ShowModal from "../UI/ShowModal/ShowModal";
import {
  NAME_INPUT,
  TYPE_MODAL,
  TYPE_REDUCER_ACTION,
  defaultTodoReducer,
} from "../../utils/const";
import { todoReducer } from "../Reducer/Reducer";
import { signUp } from "../../api/user";
import { getAuthToken } from "../../context/auth-context";

const SignUp = () => {
  const [todo, dispatchTodo] = useReducer(todoReducer, defaultTodoReducer);
  const token = getAuthToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const onValueReturnData = (data, nameInput) => {
    if (nameInput === NAME_INPUT.EMAIL) setEmail(data);
    if (nameInput === NAME_INPUT.PASSWORD) setPassword(data);
    if (nameInput === NAME_INPUT.CONFIRM_PASSWORD) setConfirmPassword(data);
    if (nameInput === NAME_INPUT.FIRST_NAME) setFirstName(data);
    if (nameInput === NAME_INPUT.LAST_NAME) setLastName(data);
    if (nameInput === NAME_INPUT.PHONE) setPhone(data);
  };

  const onCloseModal = () => {
    dispatchTodo({ type: TYPE_REDUCER_ACTION.SET_END });
  };

  const onSignUpHandler = async (event) => {
    try {
      event.preventDefault();
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_LOADING,
        message: "Please wait until the registration is over",
        typeModal: TYPE_MODAL.LOADING,
      });
      if (!email || email.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your email",
          typeModal: TYPE_MODAL.ERROR,
        });
        return;
      }

      if (!password || password.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your password",
          typeModal: TYPE_MODAL.ERROR,
        });
        return;
      }

      if (!confirmPassword || confirmPassword.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your confirm password",
          typeModal: TYPE_MODAL.ERROR,
        });
        return;
      }

      if (!firstName || firstName.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your first name",
          typeModal: TYPE_MODAL.ERROR,
        });
        return;
      }

      if (!lastName || lastName.length === 0) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_ERROR,
          message: "Please enter your last name",
          typeModal: TYPE_MODAL.ERROR,
        });
        return;
      }

      const result = await signUp({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      });

      if (result) {
        dispatchTodo({
          type: TYPE_REDUCER_ACTION.SET_CONFIRM,
          message: "SIGNUP OK",
          typeModal: TYPE_MODAL.CONFIRM,
        });
        navigate("/");
      }
    } catch (err) {
      dispatchTodo({
        type: TYPE_REDUCER_ACTION.SET_ERROR,
        message: err,
        typeModal: TYPE_MODAL.ERROR,
      });
    }
  };

  return (
    <Fragment>
      <div className={classes.bodySignUp}>
        <div className={classes.leftSignUp}>
          <img src={Img} alt="background" className={classes.imgCompoment} />
        </div>
        <div className={classes.rightSignUp}>
          <div className={classes.cardSignUp}>
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
            <h1>SIGN UP</h1>
            <form className={classes.form} onSubmit={onSignUpHandler}>
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
              <CustomInput
                value={confirmPassword}
                typeInput="password"
                nameInput={NAME_INPUT.CONFIRM_PASSWORD}
                labelInput={NAME_INPUT.CONFIRM_PASSWORD}
                onReturnValue={onValueReturnData}
              />
              <CustomInput
                value={firstName}
                typeInput="text"
                nameInput={NAME_INPUT.FIRST_NAME}
                labelInput={NAME_INPUT.FIRST_NAME}
                onReturnValue={onValueReturnData}
              />
              <CustomInput
                value={lastName}
                typeInput="text"
                nameInput={NAME_INPUT.LAST_NAME}
                labelInput={NAME_INPUT.LAST_NAME}
                onReturnValue={onValueReturnData}
              />
              <CustomInput
                value={phone}
                typeInput="text"
                nameInput={NAME_INPUT.PHONE}
                labelInput={NAME_INPUT.PHONE}
                onReturnValue={onValueReturnData}
              />

              <button className={classes.button} type="submit">
                Register
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

export default SignUp;
