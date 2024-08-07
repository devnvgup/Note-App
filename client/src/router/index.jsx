import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import AuthProvider from "../context/AuthProvider.jsx";
import ProtecRoute from "./ProtecRoute.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import NodeList from "../components/NoteList.jsx";
import Note from "../components/Note.jsx";
//TODO
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtecRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            children: [
              {
                element: <NodeList />,
                path: "folder/:folderId",
                children: [{ element: <Note />, path: "note/:noteId" }],
              },
            ],
          },
        ],
      },
    ],
  },
]);
