import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import PushNotification from "../components/PushNotification";

function Home() {
  const { folders } = useLoaderData()
  const navigate = useNavigate()
  useEffect(() => {
    if (folders.length) {
      navigate(`/folder/${folders[0]?.id}/note/${folders[0]?.notes[0]?.id}`)
    }
  }, [])
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Note App
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "right", marginBottom: "10px" }}
      >
        <UserMenu />
        <PushNotification/>
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList
            folder={folders}
          />
        </Grid>

        <Grid item xs={9} sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
