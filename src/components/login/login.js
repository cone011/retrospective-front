import { useState } from "react";
import classes from "./Login.module.css";
import Img from "../Assets/loginBackground.svg";
import CustomInput from "../UI/CustomInput/CustomInput";
import { NAME_INPUT } from "../../utils/const";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = async (event) => {
    event.preventDefault();
    try {
      if (!email || email.length === 0) {
      }

      if (!password || password.length === 0) {
      }
      console.log(email);
      console.log(password);
    } catch (err) {
      console.log(err);
    }
  };

  const onValueReturnData = (data, nameInput) => {
    if (nameInput === NAME_INPUT.EMAIL) setEmail(data);
    if (nameInput === NAME_INPUT.PASSWORD) setPassword(data);
  };

  return (
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
              typeInput="passsword"
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
  );
};

export default Login;
