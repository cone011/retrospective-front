import { useState } from "react";
import classes from "./SignUp.module.css";
import Img from "../Assets/loginBackground.svg";
import CustomInput from "../UI/CustomInput/CustomInput";
import { NAME_INPUT } from "../../utils/const";

const SignUp = () => {
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

  const onSignUpHandler = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.bodySignUp}>
      <div className={classes.leftSignUp}>
        <img src={Img} alt="background" className={classes.imgCompoment} />
      </div>
      <div className={classes.rightSignUp}>
        <div className={classes.cardSignUp}>
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
  );
};

export default SignUp;
