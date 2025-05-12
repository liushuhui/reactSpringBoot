import { createBrowserRouter } from "react-router-dom";
import Student from "@/pages/Student";
import LayoutPage from "@/components/Home/LayoutPage";
import MenuManage from "@/pages/MenuManage";
import Home from "@/pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/student",
                children: [
                    {
                        path: "list",
                        element: <Student />
                    }
                ]
            },
            {
                path: "/menu",
                children: [
                    {
                        path: "list",
                        element: <MenuManage />
                    }
                ]
            },
        ]
    },
    {
        path: '/*',
        element: <div>404</div>
    },

])

export default router;