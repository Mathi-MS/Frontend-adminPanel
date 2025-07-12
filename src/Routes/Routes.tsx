import { createHashRouter } from "react-router-dom";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import ForgetPassword from "../Auth/ForgetPassword";
import Layout from "../Components/Layout";
import Users from "../Custom/Users";
import Courses from "../Pages/Courses";
import Offers from "../Pages/Offers";
import Category from "../Pages/Category";
import Carrers from "../Pages/Carrers";
import Syllabus from "../Pages/Syllabus";
import WebsiteLayout from "../Components/WebsiteLayout";
import WebHome from "../Components/WebHome";


// const routes = createHashRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/forgotpassword",
//     element: <ForgetPassword />,
//   },
//   {
//     path: "/",
//     // element: <ProtectedRoute element={<Layout />} />,
//     element: <Layout />,
//     children: [
//       {
//         path: "users",
//         element: <Users />,
//         // element: <ProtectedRoute element={<AdminDashboard />} />,
//       },
//       {
//         path: "courses",
//         element: <Courses />
//         // element: <ProtectedRoute element={<AdminDashboard />} />,
//       },
//       {
//         path: "offers",
//         element: <Offers />
//         // element: <ProtectedRoute element={<AdminDashboard />} />,
//       },
//       {
//         path: "category",
//         element: <Category />
//         // element: <ProtectedRoute element={<AdminDashboard />} />,
//       },
//       {
//         path: "careers",
//         element: <Carrers />
//         // element: <ProtectedRoute element={<AdminDashboard />} />,
//       },
//       {
//         path: "syllabus",
//         element: <Syllabus />
//         // element: <ProtectedRoute element={<AdminDashboard />} />,
//       },

//     ],
//   },
// ]);
const routes = createHashRouter([
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        path: "/",
        element: <WebHome />,
      },
    ],
  },
]);

export default routes;
