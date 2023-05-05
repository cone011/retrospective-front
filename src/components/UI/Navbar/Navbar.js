import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useContext } from "react";
import AuthContext, { getTokenDuration } from "../../../context/auth-context";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const tokenDuration = getTokenDuration();

  const onLogout = () => {
    authCtx.logout();
    navigate("/login");
  };

  if (tokenDuration > 0) {
    return (
      <header className={classes.header}>
        <div className={classes.logo}>Retrospective Data</div>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/home" className={classes.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/type" className={classes.active}>
                Type
              </NavLink>
            </li>
            <li>
              <button className={classes.active} onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
    );
  } else {
    return null;
  }
};

export default Navbar;
