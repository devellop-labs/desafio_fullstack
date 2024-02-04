import { Button } from '@mui/material';
import React, { useState } from 'react';
import BlogPostModal from './BlogPostModal';

function PostBlog() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <BlogPostModal showModal={showModal} setShowModal={setShowModal}/>
      <Button color="inherit" onClick={() => setShowModal(true)} style={{
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
