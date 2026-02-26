import { createBrowserRouter } from "react-router";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProjectsPage,
  },
  {
    path: "/project/:id",
    Component: ProjectDetailPage,
  },
]);
