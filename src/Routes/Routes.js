import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/login";
import SignUp from "../components/SignUp/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import TypeForm from "../components/Types/TypeForm/TypeForm";
import ListPost from "../components/Post/ListPost/ListPost";

const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route exact element={<ProtectedRoute />}>
        <Route path="/type" element={<ListPost />} />
      </Route>
    </Routes>
  );
};

export default RoutesPages;
