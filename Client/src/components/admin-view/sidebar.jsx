// src/components/admin-view/AdminSideBar.jsx

import {
  LayoutDashboard,
  ShoppingBasket,
  BadgeCheck,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck size={20} />,
  },
  
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex-col flex gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
            setOpen?.(false);
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer transition-all duration-200"
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* ✅ Mobile Sidebar - Sheet (ShadCN) */}
    
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="left" className="w-64 p-0 bg-white shadow-lg">
    <div className="flex flex-col h-full justify-between text-black">
      
      {/* 👆 Top Section: Logo & Menu */}
      <div>
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 p-4 border-b cursor-pointer"
        >
          <BarChart3 size={20} />
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>

        {/* Your navigation items */}
        <MenuItems setOpen={setOpen} />
      </div>

      

    </div>
  </SheetContent>
</Sheet>



      {/* ✅ Desktop Sidebar (visible from md and above only) */}
      <aside className="hidden md:block w-64 min-h-screen bg-white border-r p-4 shadow-md">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer mb-6"
        >
          <BarChart3 size={24} />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
