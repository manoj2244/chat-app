import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoutes from "../components/ProtectedRoutes";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { index: true, element: <ProtectedRoutes>
        <Home /> 
      </ProtectedRoutes>},             // /
      { path: "login", element: <Login /> },          // /login
      { path: "sign-up", element: <SignUp /> },       // /sign-up
    ],
  },
]);

