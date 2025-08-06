import {
  LayoutDashboard,
  ShoppingBasket,
  BadgeCheck,
  BarChart3,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={18} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck size={18} />,
  },
  {
    id: "analytics",
    label: "Analytics",
    path: "/admin/analytics",
    icon: <BarChart3 size={18} />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex flex-col gap-1">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
            if (setOpen) setOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground rounded-md"
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
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-white px-0 pt-4 shadow-xl"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b px-6 pb-4">
              <SheetTitle className="flex items-center gap-2">
                <BarChart3 size={20} />
                <h1 className="text-base font-bold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <div className="px-2">
              <MenuItems setOpen={setOpen} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white p-6">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <BarChart3 size={20} />
          <h1 className="text-base font-bold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
