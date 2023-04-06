import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { authActions } from "../Store/authSlice";
import { MdOutlineConstruction } from "react-icons/md";

// let isInitial = true;
async function authorize() {
  // console.log(Cookies.get());
  const res = await axios("http://localhost:3002/authorize", {
    withCredentials: true,
  });

  return res;
}
const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const { data: authorizeData, status: authorizeStatus } = useQuery(
    ["authorize"],
    authorize,
    {
      staleTime: 3 * (60 * 1000),
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  // console.log("isAuth");
  // console.log(isAuth);
  useEffect(() => {
    if (authorizeData && authorizeData.statusText === "OK") {
      dispatch(authActions.login(authorizeData.data.user));
    }
  }, [authorizeData, dispatch]);

  // console.log(authorizeStatus);
  return authorizeStatus === "success" &&
    authorizeData.statusText === "OK" &&
    isAuth ? (
    <Outlet />
  ) : authorizeStatus === "error" ? (
    <Navigate to="/sign-in" />
  ) : (
    <p>loading</p>
  );
};

export default PrivateRoutes;
