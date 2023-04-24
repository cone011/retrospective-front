import { useState } from "react";
import classes from "./login.module.css";

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

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHanlder = (event) => {
    setPassword(event.target.value);
  };
  return (
    <div className={classes.bodyLogin}>
      <div className={classes.leftLogin}></div>
      <div className={classes.rigthLogin}>
        <div className={classes.cardLogin}>
          <h1>Login</h1>
          <form className={classes.form} onSubmit={onLoginHandler}>
            <div className={classes.formGroup}>
              <label form="user">User</label>
              <input
                type="email"
                name="user"
                value={email}
                onChange={emailHandler}
                className={classes.formField}
              />
            </div>
            <div className={classes.formGroup}>
              <label form="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={passwordHanlder}
                className={classes.formField}
              />
            </div>
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
