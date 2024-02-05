import React from 'react';
import { Box, Button, Typography, Container, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import XPBar from './Xpbar';

const UserProfile = ({ username, level, actualXP, maxXP, image, getRightImage, onImageClick, handleDeleteImage, capitalizeFirstLetter }) => {
  return (
    <Box
      sx={{
        width: 200,
        bgcolor: '#1A2027',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        textAlign: 'center',
        mr: 2,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          pt: '140%',
          position: 'relative',
          bgcolor: '#1A2027',
        }}
      >
        <img
          src={getRightImage()}
          onClick={() => onImageClick()}
          alt="Profile"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            bgcolor: "#1A2027",
          }}
        />
        {image &&
          <Button
            onClick={handleDeleteImage}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              minWidth: '32px',
              minHeight: '32px',
              padding: 0,
              borderRadius: '50%',
              backgroundColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.dark',
              },
            }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>
        }
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" color="white" noWrap>
          {capitalizeFirstLetter(username)}
        </Typography>
        <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
          Blogueiro
        </Typography>
        <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
          LV {level}
        </Typography>
        <XPBar actualXP={actualXP} maxXP={maxXP} />
      </Box>
    </Box>
  );
};

export default UserProfile;
