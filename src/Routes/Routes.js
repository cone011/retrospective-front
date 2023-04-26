import { Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";

const RoutesPages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesPages;
