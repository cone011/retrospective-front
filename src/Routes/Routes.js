import { Routes, Route } from "react-router-dom";
import Login from "../components/login/login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../Pages/HomePage";
import TypesPage from "../Pages/TypesPage";

const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route exact element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/type" element={<TypesPage />} />
      </Route>
    </Routes>
  );
};

export default RoutesPages;
