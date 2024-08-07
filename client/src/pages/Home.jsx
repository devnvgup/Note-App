import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Note App
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "right", marginBottom: "10px" }}
      >
        <UserMenu />
      </Box>
      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        <Grid item xs={3} sx={{ height: "100%" }}>
          <FolderList
            folder={[
              { id: "1", name: "Plan" },
              { id: "2", name: "Plan tomorrow" },
            ]}
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
