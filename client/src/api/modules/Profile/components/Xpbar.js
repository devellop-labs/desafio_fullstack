import React from 'react';
import { Box, LinearProgress, Tooltip } from '@mui/material';

const XPBar = ({ actualXP, maxXP }) => {
  const normalise = value => (value - 0) * 100 / (maxXP - 0);

  return (
    <Tooltip title={`XP: ${actualXP}/${maxXP}`} arrow placement="top">
      <Box sx={{ position: 'relative', width: '100%', height: 10, backgroundColor: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
        <LinearProgress
          variant="determinate"
          value={normalise(actualXP)}
          sx={{
            height: '100%',
            '& .MuiLinearProgress-bar': {
              transition: 'width .6s ease',
              backgroundColor: '#1a90ff',
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default XPBar;
