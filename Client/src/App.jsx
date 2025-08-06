import { Routes, Route, useSearchParams } from "react-router-dom";
import AuthLayout from "./components/auth/Layout.jsx";
import AuthLogin from "./pages/auth/login.jsx";
import AuthRegister from "./pages/auth/register.jsx";
import AdminLayout from "./components/admin-view/Layout.jsx";
import AdminDashboard from "./pages/admin-view/dashboard.jsx";
import AdminProducts from "./pages/admin-view/products.jsx";
import AdminOrders from "./pages/admin-view/orders.jsx";
import AdminFeatures from "./pages/admin-view/features.jsx";
import ShoppingLayout from "./components/shopping-view/Layout.jsx";
import NotFound from "./pages/not-found/index.jsx";
import ShoppingListing from "./pages/shopping-view/listing.jsx";
import ShoppingCheckout from "./pages/shopping-view/checkout.jsx";
import ShoppingAccount from "./pages/shopping-view/account.jsx";
import ShoppingHome from "./pages/shopping-view/home.jsx";
import CheckAuth from "./components/common/check-auth.jsx";
import Unauthpage from "./pages/unauth-page/index.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/index.js";
import { Skeleton } from "./components/ui/skeleton.jsx";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // ✅ Correct usage

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
   console.log(isLoading, user);

  

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>

        {/* ✅ AUTH ROUTES */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AuthLogin />} />
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* ✅ ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* ✅ SHOPPING ROUTES */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* ✅ NOT FOUND */}
        <Route path="/unauth-page" element={<Unauthpage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
