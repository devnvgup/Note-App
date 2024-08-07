import { Box, Card, CardContent, Grid, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

function NoteList() {
  const folder = { notes: [{ id: "1", content: "<p>This is new note</p>" }] };
  const { noteId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <List
          subheader={
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => (
            <Link
              key={id}
              to={`note/${id}`}
              style={{ textDecoration: "none" }}
              onclick={() => setActiveNoteId(id)}
            >
              <Card
                sx={{ mb: "5px" }}
                style={{
                  backgroundColor:
                    id === activeNoteId ? "rgb(255 211 140)" : null,
                }}
              >
                <CardContent
                  sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                >
                  <div
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                    dangerouslySetInnerHTML={{
                      __html: `${content.substring(0, 30) || "Empty"}`,
                    }}
                  ></div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NoteList;
