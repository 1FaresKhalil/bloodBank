import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { authActions } from "../Store/authSlice";

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    async function handleAuthrization() {
      const res = await fetch("http://localhost:3002/authorize", {
        method: "get",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(authActions.login());

        console.log(isAuth);
        // console.log(res);
      }
      return res;
    }

    handleAuthrization();
  }, [dispatch, isAuth]);

  console.log(isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoutes;
