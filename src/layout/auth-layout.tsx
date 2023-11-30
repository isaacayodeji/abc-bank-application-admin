import { Button } from "antd";
import React, { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  // useLayoutEffect(() => {
  //   if (!localStorage.getItem("*****")) {
  //     window.history.back()
  //   }
  // }, []);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="h-screen grid grid-rows-[5rem_1fr] ">
      <header className="flex items-center justify-between px-10">
        <h2 className="font-bold text-[22px] font-[gelionRegular] text-blue-600">
          Abc Banking & Groups
        </h2>
        <div className="items-center gap-2 hidden lg:flex">
          <p className="text-[#333333] font-[gelionLight] font-bold">
            {pathname === "/login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>{" "}
          <Button
            type="text"
            className="py-5 border border-solid border-[#0b67f3] flex items-center text-blue-600"
            onClick={() =>
              navigate(
                pathname === "/login"
                  ? "/login"
                  : "/user/register" && pathname !== "/user/register"
                  ? "/user/register"
                  : "/login"
              )
            }
          >
            {pathname === "/user/register"
              ? "Sign In"
              : "Sign Up" || pathname === "/"
              ? "Sign Up"
              : "Sign In"}
          </Button>
        </div>
      </header>
      <main className="flex justify-center items-center px-10 h-[100vh]">
        <Outlet />
      </main>
    </div>
  );
};
