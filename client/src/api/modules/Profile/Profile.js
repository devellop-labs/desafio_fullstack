import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkCookiesPermission, getLastURLPath } from '../../helper';
import { Tabs, Tab, Box } from '@mui/material';
import Header from '../Blog/components/Header';
import TabPanel from './components/TabPanel';
import AccountInformation from './components/AccountInformation';
import BlogFeed from '../Blog/components/BlogFeed';

const Profile = ({ tabIndex = 0 }) => {
  const [newPost, setNewPost] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(false);
  const [tabValue, setTabValue] = useState(tabIndex);
  const navigate = useNavigate();

  const changeURLPath = (path) => {
    navigate(path);
  }

  const location = useLocation();
  const defaultProfilePath = "/profile"

  useEffect(() => {
    const path = location.pathname;

    switch (path) {
      case '/profile':
        setTabValue(tabIndex);
        break;
      case '/profile/myposts':
        setTabValue(tabIndex);
        break;
      case '/profile/historic':
        setTabValue(tabIndex);
        break;
      default:
        setTabValue(0);
    }
  }, [location]);

  useEffect(() => {
    getLastURLPath();
    checkCookiesPermission((res) => {
      if (res) {
        changeURLPath('/');
      }
    });
  }, [navigate]);

  const handleTabChange = (event, newValue) => {
    const possibilities = {
      0: () => changeURLPath(defaultProfilePath),
      1: () => changeURLPath(`${defaultProfilePath}/myposts`),
      2: () => changeURLPath(`${defaultProfilePath}/historic`),
    }

    possibilities[newValue]()
  };

  return (
    <div>
      <style>
        {`  html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #121212; /* Dark gray background */
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Consistent font */
                }`}
      </style>
      <Header updatedUser={updatedUser} />
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="profile tabs"
          sx={{
            '& .MuiTab-root': {
              color: 'gray',
            },
            '& .Mui-selected': {
              color: 'white',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
            }
          }}
        >
          <Tab label="Perfil" sx={{ color: 'gray', marginRight: '20px' }} />
          <Tab label="Meus posts" sx={{ color: 'gray', marginRight: '20px' }} />
          <Tab label="Histórico" sx={{ color: 'gray', marginRight: '20px' }} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <AccountInformation setUpdatedUser={setUpdatedUser} updatedUser={updatedUser} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <BlogFeed newPost={newPost} setNewPost={setNewPost} filterPostByUser={"X"}/>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {/* Maybe add your history of interactions, likes, comments, etc... */}
        </TabPanel>
      </Box>
    </div>
  );
}

export default Profile;
