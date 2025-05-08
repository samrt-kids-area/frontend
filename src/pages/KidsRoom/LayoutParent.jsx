import { useDispatch, useSelector } from "react-redux";
import { useGetParentByTokenQuery } from "../../redux/services/apiSlice";
import { useEffect } from "react";
import { logoutParent, setParent } from "../../redux/feature/parentSlice";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

const LayoutParent = () => {
  const [getParent] = useGetParentByTokenQuery(null);
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useSelector((state) => state.parent);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await getParent({});
          if ("error" in res) dispatch(logoutParent());
          else dispatch(setParent(res.data));
        } else dispatch(logoutParent());
      } catch (error) {
        console.log(error);
        dispatch(logoutParent());
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

  if (!isAuthenticated) return <Navigate to="/parent/login" />;
  return <Outlet />;
};

export default LayoutParent;
