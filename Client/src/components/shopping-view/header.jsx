import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HousePlug, Menu, ShoppingCart, UserCog, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { shoppingViewHeaderMenuItems } from "@/config";

/* -------------------- Menu Items -------------------- */
function MenuItems() {
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {shoppingViewHeaderMenuItems.map((m) => (
        <Link key={m.id} to={m.path} className="text-sm font-medium hover:underline">
          {m.label}
        </Link>
      ))}
    </div>
  );
}



/* ------------- Right side (Cart + User menu) ------------- */
// helper (put above HeaderRightContent or inside it)
const getInitials = (val) => {
  if (!val) return "U";
  const base = String(val).replace(/@.*/, "").trim();
  const parts = base.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return base.slice(0, 2).toUpperCase();
};

/* ------------- Right side (Cart + User menu) ------------- */
function HeaderRightContent({ user }) {
  // video shows user?.userName; fall back to name/email
  const displayName = user?.userName ?? user?.name ?? user?.email ?? "User";
  const initials = getInitials(displayName);            // ✅ compute

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon" asChild>
        <Link to="/shop/cart">
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* ✅ size & fallback styling like the video */}
          <Avatar className="h-9 w-9 cursor-pointer ring-1 ring-muted/30">
            <AvatarImage src={user?.avatar || ""} alt={displayName} />
            <AvatarFallback className="bg-black text-white uppercase text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          {/* If you want it verbatim: "Logged in as {user?.userName}" */}
          <DropdownMenuLabel>Logged in as {displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/shop/account" className="flex items-center">
              <UserCog className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/logout" className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/* -------------------- Main Header -------------------- */
function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left: Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Mobile menu button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
          </SheetContent>
        </Sheet>

        {/* Desktop menu */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {/* Right: Cart + User */}
        <HeaderRightContent user={isAuthenticated ? user : null} />
      </div>
    </header>
  );
}

export default ShoppingHeader;
