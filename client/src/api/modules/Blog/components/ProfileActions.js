import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { resetUserCookies, setLocalStorageLogOff } from '../../../helper';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

function ProfileSidebar({ open, onClose }) {
  const navigate = useNavigate();

  const changeURLPath = (path) => {
    navigate(path)
  }

  const baseURLPath = "/profile";

  const handleUserLogoff = async() => {
    setLocalStorageLogOff();
    await resetUserCookies();
    changeURLPath("/");
  }

  const itemList = [
    { text: 'Conta', icon: <AccountCircleIcon />, func: () => changeURLPath(baseURLPath)},
    { text: 'Meus Blogs', icon: <MultipleStopIcon />, func: () => changeURLPath(`${baseURLPath}/myposts`)},
    { text: 'Histórico', icon: <AccessTimeIcon />, func: () => changeURLPath(`${baseURLPath}/historic`)},
    { text: 'Sair', icon: <LogoutIcon />, Line: true, func: async () => await handleUserLogoff() },
  ];

  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer 
      anchor='left' 
      open={open} 
      onClose={handleDrawerClose}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#1E1E30',
          color: 'white'
        }
      }}
    >
      <div
        role="presentation"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
      >
        <List>
          {itemList.map((item, index) => (
            <React.Fragment key={index}>
              {item.Line && <Divider />}
              <ListItem button onClick={() => item.func()}>
                <ListItemIcon sx={{ color: 'lightgray' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default ProfileSidebar;
