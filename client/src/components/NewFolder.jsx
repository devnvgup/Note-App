import React, { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import { addNewFolder } from "../utils/folderUtil.js";
import { useSearchParams, useNavigate } from "react-router-dom";
function NewFolder() {
  const navigate = useNavigate();
  const [newFolderName, setNewFolderName] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const handleNewFolderChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const popupName = searchParams.get("popup");
  const handleOpenPopUp = () => {
    setSearchParams({ popup: "add-folder" });
  };
  useEffect(() => {
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }
    setOpen(false);
  }, [popupName]);

  const handleClose = () => {
    // setOpen(false);
    setNewFolderName("");
    navigate(-1);
  };
  const handleAddNewFolder = async () => {
    await addNewFolder({ name: newFolderName });
    setOpen(false)
    navigate(-1);
  };
  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopUp}>
        <IconButton size="small">
          <CreateNewFolderOutlinedIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewFolder;
