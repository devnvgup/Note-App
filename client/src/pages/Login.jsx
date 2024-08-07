import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
  };
  if (user?.uid) {
    navigate("/");
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
