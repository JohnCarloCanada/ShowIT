import { lazy } from "react";
const Auth = lazy(() => import("../pages/Auth"));
const Home = lazy(() => import("../pages/Home"));

export { Auth, Home };
