import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Notification from './Notification';
import PostBlog from './PostBlog';
import Profile from './Profile';
import Logo from './Logo';
import { getUserInfo } from '../../../helper';

function Header({ updatedUser, setNewPost, newPost }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo()
      .then(res => setUserInfo(res));
  }, [updatedUser]);

  const appBarStyle = {
    backgroundColor: '#1E1E30'
  };
  
  const sideBySideDivStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          <Logo />
          <div style={sideBySideDivStyle}>
            <Notification />
            <Profile userImage={userInfo.StoredImageFileName}/>
            <PostBlog setNewPost={setNewPost} newPost={newPost}/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
