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
  useLocation
} from "react-router-dom";
import NoteAddOutLined from "@mui/icons-material/NoteAddOutLined";
import moment from "moment"

function NoteList() {
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const submit = useSubmit();

  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const {
    notes = []
  } = useLoaderData() || [];


  useEffect(() => {
    //case 1 : click folder
    if(!noteId && notes.length){
      setActiveNoteId(notes[0]?.id)
      navigate(`note/${notes[0]?.id}`)
    }
    // case 2 : add new note
        //case 2.1 : if note dont have data
        // case 2.2 : if note have data
        const exsistNote = notes.find((item)=>item.id === activeNoteId)
        if(exsistNote && notes.length){
          setActiveNoteId(exsistNote?.id)
        }
    // case 3 : delete normal note
    // case 4 : delete active note
        else if(!exsistNote && notes.length) {
            setActiveNoteId(notes[0]?.id)
            navigate(`note/${notes[0]?.id}`)
        } else {
          navigate(`/folder/${folderId}`)
        }
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

  function isEmptyContent(content) {
    // Remove all HTML tags
    const strippedContent = content.replace(/<[^>]*>/g, '');
    // Trim spaces and check if empty
    return strippedContent.trim() === '';
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    const pathArr = location.pathname.split("/")
    if (!pathArr.includes("note")) {
      location.pathname = location.pathname + `/note/${id}`
    }
    submit(
      {
        deleteNoteId: id,
      },
      { method: "delete", action: location.pathname }
    );
  }

  const handleClick = (e, id) => {
    if (e.target.className === "delete-text") return
    setActiveNoteId(id)
  }
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
          padding: "10px"
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
          {notes.map(({ id, content, updatedAt }) => (
            <Link key={id} to={`note/${id}`} style={{ textDecoration: "none" }}>
              <Card
                className="content"
                onClick={(e) => handleClick(e, id)}
                sx={{ mb: "5px" }}
                style={{
                  backgroundColor:
                    id === activeNoteId ? "rgb(255 211 140)" : null,
                }}
              >
                <span onClick={(e) => handleDelete(e, id)} class="delete-text">delete</span>
                <CardContent
                  sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                >
                  <div
                    style={{ fontSize: "14px", fontWeight: "bold" }}
                    dangerouslySetInnerHTML={{
                      __html: `${!isEmptyContent(content) ? content.substring(0, 20) : "Empty"}`,
                    }}
                  ></div>
                  <Typography sx={{fontSize:"10px"}}>{moment(updatedAt).format("MMMM Do YYYY,h:mm:ss a")}</Typography>
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
