import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import AuthProvider from "../context/AuthProvider.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import NodeList from "../components/NoteList.jsx";
import Note from "../components/Note.jsx";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../utils/noteUtil.js";
import { folderLoader } from "../utils/folderUtil.js";
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
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: folderLoader,
            children: [
              {
                element: <NodeList />,
                path: "folder/:folderId",
                action: addNewNote,
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    action: updateNote,
                    loader: noteLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
