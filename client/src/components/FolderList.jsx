import { Box, Card, CardContent, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSubmit } from "react-router-dom";
import NewFolder from "./NewFolder";

function FolderList({ folder }) {
  const { folderId } = useParams();
  const submit = useSubmit();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  useEffect(()=>{
    const existActiveFolder = folder.find((item)=>item.id === activeFolderId)
    if(existActiveFolder){
      setActiveFolderId(existActiveFolder?.id)
    }else{
      if(folder.length){
        setActiveFolderId(folder[0]?.id)
      }
    }
  },[folderId, folder.length])


  const handleClick = (e,id) => {
    if(e.target.className === "delete-text") return
    setActiveFolderId(id);
  };

  const handleDelete=(e,id)=>{
    e.preventDefault()
      submit(
       {
         deleteFolderId:id,
       },
       { method: "delete", action: "/" }
     );
  }
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
              className="content"
              onClick={(e) => handleClick(e,id)}
              sx={{ mb: "5px" }}
              style={{
                backgroundColor:
                  id === activeFolderId ? "rgb(255 211 140)" : null,
              }}
            >
              <span onClick={(e)=>handleDelete(e,id)} class="delete-text">delete</span>
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
