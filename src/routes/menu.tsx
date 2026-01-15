import { lazy } from "react";

const MenuManagePage = lazy(() => import("@/pages/MenuManage"));

export default {
    path: "/menu",
    children: [
        {
            path: "list",
            element: <MenuManagePage />
        }
    ]
};