import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Login from "../components/login/login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../Pages/HomePage";
import TypesPage from "../Pages/TypesPage";
import Navbar from "../components/UI/Navbar/Navbar";
import TypeForm from "../components/Types/TypeForm/TypeForm";
import FormPost from "../components/Post/FormPost/FormPost";
import NotFound from "../Pages/NotFound";

const RoutesPages = () => {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route exact element={<ProtectedRoute />}>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/type" exact element={<TypesPage />} />
          <Route path="/type-form" exact element={<TypeForm />} />
          <Route path="/post-from" exact element={<FormPost />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default RoutesPages;
