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

function App() {
  const [getUser] = useGetUserMutation();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await getUser({});
          if ("error" in res) dispatch(logout());
          else dispatch(setUser(res.data.admin));
        } else dispatch(logout());
      } catch (error) {
        console.log(error);
        dispatch(logout());
      }
    }
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return isAuthenticated ? (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/children/in-session"
          element={<div>Children in session</div>}
        />
        <Route path="/children/all-children" element={<Children />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/employees" element={<div>Employees</div>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  ) : (
    <Routes>
      <Route path="/test-cam" element={<Test />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/verify/:id" element={<div>Settings</div>} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default App;
