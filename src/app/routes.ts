import { createBrowserRouter } from "react-router";
import { SplashScreen } from "./components/SplashScreen";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { PlanDetail } from "./components/PlanDetail";
import { InspectionForm } from "./components/InspectionForm";
import { MeetingReport } from "./components/MeetingReport";
import { Camera } from "./components/Camera";
import { ReportsHub } from "./components/ReportsHub";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/plan/:planType",
    Component: PlanDetail,
  },
  {
    path: "/inspection/:inspectionType",
    Component: InspectionForm,
  },
  {
    path: "/meeting-report",
    Component: MeetingReport,
  },
  {
    path: "/camera",
    Component: Camera,
  },
  {
    path: "/reports",
    Component: ReportsHub,
  },
]);
