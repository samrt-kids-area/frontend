import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useGetUserMutation } from "../redux/services/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/feature/userSlice";
import { Loader } from "lucide-react";
import { Navigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = React.useState(false);

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

  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return (
    <>
      <div className="flex justify-between sm:hidden">
        <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          onClick={() => setOpenSidebar(!openSidebar)}
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        {/* <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button> */}
      </div>

      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div className="p-4 sm:ml-64">
        <div className="p-4 dark:border-gray-700">{children}</div>
      </div>
    </>
  );
};

export default Layout;
