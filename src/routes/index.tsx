import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import UserRoute from "./user";
import MenuRoute from "./menu";
import ThreeRoute from './three';


const Layout = lazy(() => import("@/components/Home/LayoutPage"));

const LoginPage = lazy(() => import("@/pages/Login"));
const NoticePage = lazy(() => import("@/pages/Notice"));

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            UserRoute,
            MenuRoute,
            ThreeRoute,
            {
                path: "/notice/:userId?",
                element: <NoticePage/>
            }
        ]
    },
    {
        path: '/*',
        element: <div>404</div>
    },

])

export default router;