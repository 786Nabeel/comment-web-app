import { createBrowserRouter } from "react-router-dom";
import Layout from "../Page/Layout";
import ErrorPage from "../Page/ErrorPage";
import AdminHomePage from "../Page/Admin/HomePage";
import RequestPage from "../Page/Admin/RequestPage";
import WordPage from "../Page/Admin/WordPage";
import ModeratorHomePage from "../Page/Moderator/HomePage";
import TopicPage from "../Page/Moderator/TopicPage";
import UserHomePage from "../Page/User/HomePage";
import CreateTopicPage from "../Page/User/CreateTopicPage";
import LoginPage from "../Page/Login";
import SignUpPage from "../Page/SignUp";
import StartPage from "../Page/StartPage";
import AdminProfile from "../Page/Admin/Profile";
import ModeratorProfile from "../Page/Moderator/Profile";
import UserProfile from "../Page/User/Profile";

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "/Login", element: <LoginPage /> },
  { path: "/SignUp", element: <SignUpPage /> },

  {
    path: "/Admin",
    element: <Layout role="Admin" />,
    children: [
      { path: "HomePage", element: <AdminHomePage /> },
      {
        path: "RequestPage",
        element: <RequestPage />,
      },
      {
        path: "WordPage",
        element: <WordPage />,
      },
      {
        path: "Profile",
        element: <AdminProfile />,
      },
    ],
  },
  {
    path: "/Moderator",
    element: <Layout role="Moderator" />,
    children: [
      { path: "HomePage", element: <ModeratorHomePage /> },
      {
        path: "DeleteTopic",
        element: <TopicPage />,
      },
      {
        path: "Profile",
        element: <ModeratorProfile />,
      },
    ],
  },
  {
    path: "/User",
    element: <Layout role="User" />,
    children: [
      { path: "HomePage", element: <UserHomePage /> },
      {
        path: "CreateTopic",
        element: <CreateTopicPage />,
      },
      {
        path: "Profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage role="" />,
  },
  {
    path: "/Admin/*",
    element: <ErrorPage role="Admin" />,
  },
  {
    path: "/Moderator/*",
    element: <ErrorPage role="Moderator" />,
  },
  {
    path: "/User/*",
    element: <ErrorPage role="User" />,
  },
]);

export default router;
