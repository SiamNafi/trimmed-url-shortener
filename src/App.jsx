import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashBoard from "./pages/DashBoard";
import AuthPage from "./pages/AuthPage";
import LinkPage from "./pages/LinkPage";
import RedirectLinkPage from "./pages/RedirectLinkPage";
import AppLayout from "./layout/AppLayout";
import UrlProvider from "./context/context";
import PrivateRoute from "./components/PrivateRoute";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashBoard />
          </PrivateRoute>
        ),
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/link/:id",
        element: (
          <PrivateRoute>
            <LinkPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLinkPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />;
    </UrlProvider>
  );
};

export default App;
