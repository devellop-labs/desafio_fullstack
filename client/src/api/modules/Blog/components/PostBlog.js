import { Button } from '@mui/material';
import React from 'react';

function PostBlog() {
  return (
    <div>
      <Button color="inherit" onClick={() => {}} style={{
        backgroundColor: "#ff5a00",
        width: "105px",
        height: "40px",
        marginLeft: '15px',
        borderRadius: "10px",
        textTransform: "none",
        fontFamily: "Arial, sans-serif",
      }}>
        Postar
      </Button>
    </div>
  );
}

export default PostBlog;
