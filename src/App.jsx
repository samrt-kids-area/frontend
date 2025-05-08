import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import Layout from "./Layout";
import { useGetUserMutation } from "./redux/services/apiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./redux/feature/userSlice";
import Loader from "./components/Loader";
import Parents from "./pages/parents";
import Children from "./pages/children";
import Test from "./Test";
import KidsRoom from "./pages/KidsRoom";
import LayoutParent from "./pages/KidsRoom/LayoutParent";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <div>Home Page</div>{" "}
          </Layout>
        }
      />
      <Route
        path="/children/in-session"
        element={
          <Layout>
            <div>Children in session</div>
          </Layout>
        }
      />
      <Route
        path="/children/all-children"
        element={
          <Layout>
            <Children />
          </Layout>
        }
      />
      <Route
        path="/parents"
        element={
          <Layout>
            <Parents />
          </Layout>
        }
      />
      <Route path="/employees" element={<div>Employees</div>} />

      <Route path="/parent/login" element={<Login role="parent" />} />
      <Route path="/parent/rooms" element={<KidsRoom />} />

      <Route path="/test-cam" element={<Test />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/verify/:id" element={<div>Settings</div>} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default App;
