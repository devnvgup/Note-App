import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLoaderData,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import NoteAddOutLined from "@mui/icons-material/NoteAddOutLined";

function NoteList() {
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();

  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const submit = useSubmit();
  const {
    folder: { notes },
  } = useLoaderData();

  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }
    setActiveNoteId(notes[0]?.id);
    navigate(`note/${notes[0]?.id}`);
  }, [noteId, notes.length]);

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folder/${folderId}` }
    );
  };
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}></Tooltip>
              <IconButton size="small">
                <NoteAddOutLined onClick={handleAddNewNote} />
              </IconButton>
            </Box>
          }
        >
          {notes.map(({ id, content }) => (
            <Link key={id} to={`note/${id}`} style={{ textDecoration: "none" }}>
              <Card
                onClick={() => setActiveNoteId(id)}
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
