import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";

export const useRoutes = (isLogin) => {
  if (isLogin) {
    return <MainPage />;
  }

  return (
    <AuthPage />
   
    // <Routes>
    //   <Route path="/" element={<Navigate to="/login" />} />
    //   <Route path="/login" component={<AuthPage />} />
    // </Routes>

  );
};
