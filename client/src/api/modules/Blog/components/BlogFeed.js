import React, { useEffect, useState } from 'react';
import BlogBody from './BlogBody';
import BlogService from '../../../services/Blog.service';
import { getUserImage } from '../../../helper';
import { Box, Container } from '@mui/material';

const BlogFeed = ({newPost}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    BlogService.getPosts()
      .then(res => {
        setPosts(res);
      })
  }, [newPost])
  //TODO: with more time could add a like intereaction, or a smart feed.
  return (
    <Box
      sx={{
        overflow: 'auto',
        maxHeight: '100vh',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {(posts || []).map((post, index) => (
        <Box
          key={index}
          sx={{
            maxWidth: 600,
            margin: 'auto',
            marginBottom: 2,
          }}
        >
          <BlogBody
            title={post.Title}
            description={post.Description}
            imageUrl={getUserImage(post.PostImage)}
            userImageUrl={getUserImage(post.UserProfileImage)}
            userExhibitionName={post.ExhibitionName}
            postCreateDate={post.z_Inserted_Date}
            postId={post.id}
          />
        </Box>
      ))}
    </Box>
  );
};

export default BlogFeed;
