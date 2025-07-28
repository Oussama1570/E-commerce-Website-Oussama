import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="w-1/2 bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center leading-relaxed">
          Welcome to <br /> ECommerce <br /> Shopping
        </h1>
      </div>

      {/* Right side: center vertically + horizontally */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
