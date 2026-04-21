import { lazy } from "react";
const GoogleButton = lazy(() => import("./GoogleButton"));
const Layout = lazy(() => import("./Layout"));
const Header = lazy(() => import("./Header"));
const Menu = lazy(() => import("./Menu"));

export { GoogleButton, Layout, Header, Menu };
