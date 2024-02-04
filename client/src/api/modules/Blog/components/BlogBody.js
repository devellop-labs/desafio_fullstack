import React from 'react';
import { Card, CardHeader, Avatar, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { format } from 'date-fns';

const BlogBody = ({ title = "Yago", description = "Descrição", imageUrl = "https://storage.googleapis.com/devellop-labs-images/e76edd09-6e76-4d99-bd29-2e4e8b47f76e-da7ce3ef-1b2d-45e9-a54f-fe2c39e22d44.png", userImageUrl = "https://storage.googleapis.com/devellop-labs-images/e76edd09-6e76-4d99-bd29-2e4e8b47f76e-da7ce3ef-1b2d-45e9-a54f-fe2c39e22d44.png", postCreateDate = new Date() }) => {
  // Format the date
  const formattedDate = format(new Date(postCreateDate), 'MMMM dd, yyyy');

  return (
    <Card sx={{
      maxWidth: '100%', // Set maximum width to 100%
      margin: 'auto',
      marginTop: 2,
      backgroundColor: 'background.default', // Use the default background color from the theme
      boxShadow: 3, // Adjust the shadow of the card
    }}>
      <CardHeader
        avatar={<Avatar alt="User" src={userImageUrl} />}
        title={title}
        subheader={formattedDate}
      />
      <CardMedia
        component="img"
        height="auto" // Adjust the height to be auto so the image can be bigger
        image={imageUrl}
        alt={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Box sx={{ textAlign: 'right', marginTop: 2 }}> {/* This Box will align the text to the right */}
          <Typography variant="body2" color="text.secondary">
            by Yago
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogBody;
