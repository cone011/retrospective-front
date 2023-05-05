import { Routes, Route } from "react-router-dom";
import Login from "../components/login/login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../Pages/HomePage";
import TypesPage from "../Pages/TypesPage";
import Navbar from "../components/UI/Navbar/Navbar";
import { Fragment } from "react";

const RoutesPages = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route exact element={<ProtectedRoute />}>
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/type" exact element={<TypesPage />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default RoutesPages;
