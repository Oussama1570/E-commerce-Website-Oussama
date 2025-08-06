import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logout clicked");
    // dispatch(logoutUser());
  };

  return (
    <header className="flex items-center px-6 py-3 border-b bg-background">
      {/* 🍔 Burger icon (left on mobile only) */}
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden"
        variant="ghost"
        size="icon"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* 👈 Spacer to push logout to the right */}
      <div className="flex-1" />

      {/* 🔒 Logout Button (right aligned) */}
      <Button
        onClick={handleLogout}
        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
      >
        <LogOut size={16} />
        Logout
      </Button>
    </header>
  );
}

export default AdminHeader;
