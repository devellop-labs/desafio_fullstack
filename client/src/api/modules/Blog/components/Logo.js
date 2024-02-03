import React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate();

  const returnToDefaultPath = () => {
    navigate("/blog");
  }

  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => returnToDefaultPath()}>
      Blog
    </Typography>
  );
}

export default Logo;
