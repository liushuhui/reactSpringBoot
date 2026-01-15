import { lazy } from "react";

const ThreePage = lazy(() => import("@/pages/Three"));

export default {
    path: "/three",
    children: [
        {
            path: "one",
            element: <ThreePage />
        }
    ]
};