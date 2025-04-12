import { useRoutes } from "react-router";
import ProductList from "./pages/product/list";
import ProductAdd from "./pages/product/add";
import ProductEdit from "./pages/product/edit";
import "antd/dist/reset.css";
import Register from "./pages/auth/register";
import UserList from "./pages/user/list";
import Login from "./pages/auth/login";
import AdminLayout from "./layout/Admin";
import ClientLayout from "./layout/Client";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/user/profile";
import { Homepage } from "./pages/homepage";
import ProductDetail from "./pages/product/detail";
import CartPage from "./pages/cart";
import AdminOrdersPage from "./pages/cart/Orders";
import Checkout from "./pages/cart/Checkout";

function App() {
  const element = useRoutes([
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "product/add",
          element: <ProductAdd />,
        },
        {
          path: "product/edit/:id",
          element: <ProductEdit />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "orders",
          element: <AdminOrdersPage />,
        },
        
      ],
    },
    {
      path: "",
      element: <ClientLayout />,
      children: [
        {
          path: "",
          element: <Homepage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        }
        
        
        
      ],
    },
  ]);

  return <main>{element}</main>;
}

export default App;
