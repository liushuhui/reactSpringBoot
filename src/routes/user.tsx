import { lazy } from "react";

const StudentPage = lazy(() => import("@/pages/Student"));
const TeacherPage = lazy(() => import("@/pages/Teacher"));
const ClassPage = lazy(() => import("@/pages/Class"));
const StudentManagePage = lazy(() => import("@/pages/Class/StudentManage"));
export default {
    path: "/user",
    children: [
        {
            path: "student",
            element: <StudentPage />
        },
        {
            path: "teacher",
            element: <TeacherPage />
        },
        {
            path: "class",
            element: <ClassPage />
        },
        {
            path: "class/studentManage/:id",
            element: <StudentManagePage />
        }
    ]
};