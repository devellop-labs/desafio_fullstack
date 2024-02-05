import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ProfileSidebar from './ProfileActions';
import { getUserImage } from '../../../helper';

function Profile({ userImage }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userImageURL, setUserImageURL] = useState("")
  
  useEffect(() => {
    setUserImageURL(getUserImage(userImage))
  }, [userImage])

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  //TODO: Improve how sidebar opens.
  return (
    <div>
      <ProfileSidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <IconButton color="inherit" aria-label="Open Sidebar" onClick={handleSidebarToggle}>
        {userImageURL ?
          <>
            <Avatar alt="Remy Sharp" sx={{ margin: "0 15px 0 0" }} src={userImageURL} />
          </> :
          <>
            <PersonIcon style={{ padding: "0 15px 0 0" }} />
          </>}
      </IconButton>
    </div>
  );
}

export default Profile;
