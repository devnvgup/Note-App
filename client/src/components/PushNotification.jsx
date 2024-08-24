import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import { gql, useSubscription } from '@apollo/client';
import { Badge, Menu, MenuItem } from '@mui/material';



function PushNotification() {

    const query = gql`subscription Subscription {
        notification {
          message
        }
      }`;

    const [notification, setNotification] = useState('');
    const [invisible, setInvisible] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const { data, loading, error } = useSubscription(query);

    useEffect(() => {
        if (error) {
            console.error('Subscription error:', error);
        }
        if (!loading && data) {
            setInvisible(false)
            setNotification(data.notification.message);
        }
        console.log('[PUSH NOTIFICATION]', { data });
    }, [loading, data, error]);

    const handleClick = (e) => {
        if (notification) {
            setAnchorEl(e.currentTarget);
        }
    }

    const handleClose = () => {
        setAnchorEl(null);
        setNotification('');
        setInvisible(true);
    }


    return (
        <div>
            <Badge
                color='error'
                variant='dot'
                invisible={invisible}
                overlap='circular'
                sx={{ '&:hover': { cursor: 'pointer' }, ml: '5px' }}
            >
                <NotificationsIcon onClick={handleClick} sx={{ color: '#7D9D9C' }} />
            </Badge>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>{notification}</MenuItem>
            </Menu>
        </div>
    )
}

export default PushNotification
