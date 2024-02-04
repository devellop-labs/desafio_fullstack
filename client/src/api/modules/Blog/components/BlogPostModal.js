import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, FormHelperText } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { toast } from 'react-toastify';
import { showToast } from '../../../helper';
import BlogService from '../../../services/Blog.service';

const BlogPostModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const dialogStyles = {
    backgroundColor: '#1E1E30',
    color: 'white',
    padding: '20px',
    borderRadius: '8px',
  };

  const handleClose = () => {
    setShowModal(false);
    showToast(toast, "Blog post creation cancelled", "info");
  };

  const convertToBuffer = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSave = async () => {
    console.log({ title, description, image });

    if(!title) {
      showToast(toast, "É necessário ter um título!", "warn");
      return;
    }

    if(!description) {
      showToast(toast, "É necessário ter um descrição!", "warn");
      return;
    }

    if(!image) {
      showToast(toast, "É necessário ter uma imagem!", "warn");
      return;
    }

    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);

    const buffer = await convertToBuffer(image);
    formData.append('Image', new Blob([buffer]));

    await BlogService.createPost(formData);
    setShowModal(false);
    showToast(toast, "Post criado com sucesso!", "success");
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={showModal} onClose={handleClose} PaperProps={{ style: dialogStyles }}>
      <DialogTitle>
        <Typography variant="h6" style={{ color: 'white' }}>
          Add Blog Post
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputLabelProps={{ style: { color: 'grey' } }}
          inputProps={{ style: { color: 'white' }, maxLength: 40 }}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputLabelProps={{ style: { color: 'grey' } }}
          inputProps={{ style: { color: 'white' }, maxLength: 500 }}
          style={{ marginTop: '16px', marginBottom: '16px' }}
        />
        <Typography variant="caption" style={{ color: 'grey', float: "right" }}>
          {`${description.length}/500 characters`}
        </Typography>
        <FormHelperText style={{ color: 'grey' }}>
          Share the details of your blog post.
        </FormHelperText>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="image-upload">
          <IconButton color="default" aria-label="upload picture" component="span">
            <PhotoCamera style={{ color: 'white' }} />
          </IconButton>
        </label>
        {imagePreview && <img src={imagePreview} alt="preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      </DialogContent>
      <DialogActions style={dialogStyles}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} style={{
          color: 'white',
          backgroundColor: '#4CAF50',
          borderRadius: '4px',
        }}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlogPostModal;
