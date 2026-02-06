import { lazy } from "react";

const MenuManagePage = lazy(() => import("@/pages/MenuManage"));
const PermissionPage = lazy(() => import("@/pages/Permission"));

export default {
    path: "/menu",
    children: [
        {
            path: "list",
            element: <MenuManagePage />
        },
        {
            path: "permission",
            element: <PermissionPage />
        }
    ]
};