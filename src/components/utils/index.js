import { lazy } from "react";

const SearchBar = lazy(() => import("./SearchBar"));
const SubmitBtn = lazy(() => import("./SubmitBtn"));
const Pill = lazy(() => import("./Pill"));

export { SearchBar, SubmitBtn, Pill };
