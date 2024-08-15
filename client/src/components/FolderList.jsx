import { Box, Card, CardContent, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";

function FolderList({ folder }) {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const handleClick = (id) => {
    setActiveFolderId(id);
  };
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#7D9D9C",
        height: "100%",
        textAlign: "left",
        overflowY: "auto",
        padding: "10px",
      }}
      subheader={
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folder.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folder/${id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Card
              onClick={() => handleClick(id)}
              sx={{ mb: "5px" }}
              style={{
                backgroundColor:
                  id === activeFolderId ? "rgb(255 211 140)" : null,
              }}
            >
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}

export default FolderList;
