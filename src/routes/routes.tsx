import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { routesGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { buyerPaths } from "./buyer.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { sellerPaths } from "./seller.routes";
import RedirectRoute from "../components/layout/RedirectRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <ProtectedRoute role="admin"> <App /> </ProtectedRoute>,
        children: routesGenerator(adminPaths),
    },

    {
        path: "/seller",
        element: <ProtectedRoute role="seller"> <App /> </ProtectedRoute>,
        children: routesGenerator(sellerPaths),
    },
    
    {
        path: "/buyer",
        element:<ProtectedRoute role="buyer"> <App /> </ProtectedRoute>,
        children: routesGenerator(buyerPaths),
    },

    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "*",
        element: <RedirectRoute />,
    }
])

export default router;