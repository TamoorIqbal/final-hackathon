import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ResetPassword from "./components/ResetPassword.jsx";
import ForgotPassword from "./components/ForgotPassword";
import UserProfile from "./components/UserProfile.jsx";
import ProtectedRoute from "./components/protect.jsx";
import { MyContext } from "./Context/AppContext";
import { baseUrl } from "./utils/constants.js";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header.jsx";
import { Toastify } from "./utils/Toastify";
import Loading from "./utils/Loading.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup";
import Login from "./components/Login";

import axios from "axios";
import Cart from "./components/Products/Cart.jsx";
import UserOrders from "./components/Products/UserOrders.jsx";

function App() {
  const { setUser, user } = useContext(MyContext);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const showToast = (msg, type) => {
    return setAlertState({
      open: true,
      message: msg,
      severity: type,
    });
  };

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const user = async () => {
      if (token) {
        try {
          const { data } = await axios.get(`${baseUrl}/getUser`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setLoading(false);
          setUser(data);
        } catch (error) {
          setLoading(false);
          showToast(error.response?.data.error, "error");
        }
      } else {
        setLoading(false);
      }
    };
    user();
  }, [setUser, token]);

  return (
    <>
      <Toastify setAlertState={setAlertState} alertState={alertState} />
      <Header showToast={showToast} />
      <Routes>
        <Route path="/" element={<Home showToast={showToast} />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword showToast={showToast} />}
        />
        <Route
          path="/resest-password/:token"
          element={<ResetPassword showToast={showToast} />}
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login showToast={showToast} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup showToast={showToast} />
            )
          }
        />

        <Route
          path="/profile"
          element={
            loading ? (
              <Loading isLoading={loading} />
            ) : user ? (
              <>
                <UserProfile showToast={showToast} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/cart"
          element={
            loading ? (
              <Loading isLoading={loading} />
            ) : user ? (
              <>
                <Cart showToast={showToast} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
         <Route
          path="/order"
          element={
            loading ? (
              <Loading isLoading={loading} />
            ) : user ? (
              <>
                <UserOrders showToast={showToast} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            loading ? (
              <Loading isLoading={loading} />
            ) : user ? (
              <>
                <Dashboard showToast={showToast} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
    // <>
    //   <Toastify setAlertState={setAlertState} alertState={alertState} />

    //   <Header showToast={showToast} />
    //   <Routes>
    //     <Route path="/login" element={<Login showToast={showToast} />} />
    //     <Route element={<ProtectedRoute />}>
    //       <Route path="/" element={<Home showToast={showToast} />} />
    //       <Route path="/signup" element={<Signup showToast={showToast} />} />
    //       <Route
    //         path="/forgot-password"
    //         element={<ForgotPassword showToast={showToast} />}
    //       />
    //       <Route
    //         path="/resest-password/:token"
    //         element={<ResetPassword showToast={showToast} />}
    //       />{" "}
    //       <Route
    //         path="/dashboard"
    //         element={<Dashboard showToast={showToast} />}
    //       />
    //       <Route
    //         path="/profile"
    //         element={<UserProfile showToast={showToast} />}
    //       />
    //     </Route>
    //   </Routes>
    // </>
  );
}

export default App;
