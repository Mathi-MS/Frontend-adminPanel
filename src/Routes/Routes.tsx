import { createHashRouter } from "react-router-dom";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import ForgetPassword from "../Auth/ForgetPassword";
import Layout from "../Components/Layout";
import Users from "../Custom/Users";
import Courses from "../Pages/Courses";
import Offers from "../Pages/Offers";
import Category from "../Pages/Category";

const routes = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotpassword",
    element: <ForgetPassword />,
  },
  {
    path: "/",
    // element: <ProtectedRoute element={<Layout />} />,
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <Users />,
        // element: <ProtectedRoute element={<AdminDashboard />} />,
      },
      {
        path: "courses",
        element: <Courses />
        // element: <ProtectedRoute element={<AdminDashboard />} />,
      },
      {
        path: "offers",
        element: <Offers />
        // element: <ProtectedRoute element={<AdminDashboard />} />,
      },
      {
        path: "category",
        element: <Category />
        // element: <ProtectedRoute element={<AdminDashboard />} />,
      },
      
    ],
  },
]);

export default routes;
