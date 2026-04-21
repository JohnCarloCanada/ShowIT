import { lazy } from "react";

const SearchBar = lazy(() => import("./SearchBar"));
const SubmitBtn = lazy(() => import("./SubmitBtn"));

export { SearchBar, SubmitBtn };
