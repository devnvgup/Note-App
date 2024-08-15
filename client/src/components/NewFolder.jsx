import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
function NewFolder() {
    const handleOpenPopUp = () => {

    }
    return (
        <div>
            <Tooltip title="Add Folder" onClick={handleOpenPopUp}>
                <IconButton size="small">
                    <CreateNewFolderOutlinedIcon sx={{color:"white"}}/>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default NewFolder
