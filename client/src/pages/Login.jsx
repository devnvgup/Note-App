import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { request } from "../utils/request";
function Login() {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const query = `
    mutation Mutation($uid: String!, $name: String!) {
        register(uid: $uid, name: $name) {
          id,
          name
      }
    }
    `;
    const payload = {
      query,
      variables: {
        uid: res.user?.uid,
        name: res.user?.displayName,
      },
    };
    const data = await request(payload);
  };
  if (user?.uid) {
    return <Navigate to="/" />;
    return;
  }
  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login With Google
      </Button>
    </div>
  );
}

export default Login;
