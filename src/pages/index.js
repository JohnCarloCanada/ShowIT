import { lazy } from "react";
const Auth = lazy(() => import("../pages/Auth"));
const Home = lazy(() => import("../pages/Home"));
const PostDetail = lazy(() => import("../pages/PostDetail"));

export { Auth, Home, PostDetail };
