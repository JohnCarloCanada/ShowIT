import { lazy } from "react";
const GoogleButton = lazy(() => import("./GoogleButton"));
const Layout = lazy(() => import("./Layout"));
const Header = lazy(() => import("./Header"));
const Menu = lazy(() => import("./Menu"));
const ProjectCard = lazy(() => import("./ProjectCard"));
const SubmitModalCard = lazy(() => import("./SubmitModalCard"));
const Loader = lazy(() => import("./Loader"));
const Logout = lazy(() => import("./Logout"));
const EditModalCard = lazy(() => import("./EditModalCard"));

export { GoogleButton, Layout, Header, Menu, ProjectCard, SubmitModalCard, Loader, Logout, EditModalCard };
