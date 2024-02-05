import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, CardMedia, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';
import BlogService from '../../../services/Blog.service';
import { showToast } from '../../../helper';
import { toast } from 'react-toastify';
import EditPostModal from './EditPost';

const BlogBody = ({ title, description, imageUrl, userImageUrl, userExhibitionName, postCreateDate, postId, postOwner, userId, setNewPost, newPost }) => {
  const [canEditPost, setCanEditPost] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setCanEditPost(postOwner === userId);
  }, [postId, userId, postOwner]);

  const renderPosts = () => {
    setNewPost(!newPost);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setShowEditPostModal(true);
    handleClose();
  };

  const handleDelete = async (postId) => {
    await BlogService.deletePost(postId)
    renderPosts();
    handleClose();
    showToast(toast, "Post deletado!", "success");
  };

  const formattedDate = format(new Date(postCreateDate), 'MMMM dd, yyyy');

  return (
    <Card sx={{ maxWidth: '100%', margin: 'auto', marginTop: 2, backgroundColor: 'background.default', boxShadow: 3 }}>
      <EditPostModal
        showModal={showEditPostModal}
        setShowModal={setShowEditPostModal}
        renderPosts={renderPosts}
        defaultTitle={title}
        defaultDescription={description}
        defaultImage={imageUrl}
        postId={postId}
      />
      <CardHeader
        avatar={<Avatar alt="User" src={userImageUrl} />}
        title={title}
        subheader={formattedDate}
        action={
          canEditPost && (
            <div>
              <IconButton aria-label="settings" aria-controls="post-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="post-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleEdit}>Editar</MenuItem>
                <MenuItem onClick={() => handleDelete(postId)}>Deletar</MenuItem>
              </Menu>
            </div>
          )
        }
      />
      <CardMedia
        component="img"
        height="auto"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ textAlign: 'right', marginTop: 2 }}>
          <Typography variant="body2" color="text.secondary">
            by {userExhibitionName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogBody;
