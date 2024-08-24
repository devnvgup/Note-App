import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/material";
import "./firebase/config.jsx";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apollo.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
      <RouterProvider router={router} />
    </Container>
    </ApolloProvider>
  </React.StrictMode>
);
    