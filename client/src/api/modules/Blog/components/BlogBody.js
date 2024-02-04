import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { format } from 'date-fns';

const BlogBody = ({ title, description, imageUrl, userImageUrl, userExhibitionName, postCreateDate, postId }) => {
  const formattedDate = format(new Date(postCreateDate), 'MMMM dd, yyyy');

  return (
    <Card sx={{
      maxWidth: '100%',
      margin: 'auto',
      marginTop: 2,
      backgroundColor: 'background.default',
      boxShadow: 3,
    }}>
      <CardHeader
        avatar={<Avatar alt="User" src={userImageUrl} />}
        title={title}
        subheader={formattedDate}
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
