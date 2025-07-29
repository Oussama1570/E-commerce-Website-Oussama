import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Left side */}
      <div className="w-1/2 bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center leading-relaxed">
  Welcome to ECommerce <br /> Shopping
</h1>

      </div>

      {/* Right side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
