import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import ToothColorList from "@/components/DataTable/Table";
import ExaminationsPage from "@/features/examinations/page";
import AddExaminationPage from "@/features/examinations/add";
import TasksPage from "@/features/tasks/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ToothColorList />,
      },
      {
        path: "examinations",
        element: <ExaminationsPage />,
      },
      {
        path: "examinations/add",
        element: <AddExaminationPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],
  },
]);