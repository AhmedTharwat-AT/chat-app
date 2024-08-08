import { lazy } from "react";

const Profile = lazy(() => import("@pages/Profile"));
const Contacts = lazy(() => import("@pages/Contacts"));
const Login = lazy(() => import("@pages/Login"));
const Signup = lazy(() => import("@pages/Signup"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

export { Profile, Contacts, Login, Signup, PageNotFound };
