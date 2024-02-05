import React from 'react';
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Notification() {
  return (
    <div>
      <IconButton color="inherit" aria-label="Delete" onClick={() => {}}>
        <NotificationsIcon style={{ padding: "0 5px 0 20px" }} />
      </IconButton>
    </div>
  );
}

export default Notification;
