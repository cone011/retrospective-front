import { Routes, Route } from "react-router-dom";
import Login from "../components/login/login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home/Home";

const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route exact element={<ProtectedRoute />}>
        <Route path="/type" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default RoutesPages;
