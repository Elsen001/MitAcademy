import { createBrowserRouter } from "react-router-dom";
import ToothColorList from "@/components/DataTable/Table"; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ToothColorList />, 
  },
  
]);