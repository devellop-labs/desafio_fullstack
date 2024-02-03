import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormHelperText,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { showToast } from '../../../helper';

const DeleteProfileFeedback = ({ open, onClose, setFeedback, feedback }) => {
  const handleFeedbackChange = (event) => {
    const inputText = event.target.value;

    if (inputText.length <= 500) {
      setFeedback(inputText);
    }
  };

  const showMessage = () => {
    showToast(toast, "É necessário enviar o Feedback!", "warn", {}, "X");
  };

  const dialogStyles = {
    backgroundColor: '#1E1E30',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
  };

  const buttonStyles = {
    color: '#fff',
    backgroundColor: '#4CAF50',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#45a049',
      color: '#fff',
    },
  };

  return (
    <Dialog
      open={open}
      onClose={showMessage}
      PaperProps={{
        style: dialogStyles,
      }}
    >
      <DialogTitle>
        <Typography variant="h6" style={{ color: '#fff' }}>
          Sua conta foi deletada!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography style={{ color: '#ddd' }}>
            Se desejar reabrir sua conta, entre em contato com nosso suporte.
          </Typography>

          <TextField
            label="Motivo da Exclusão"
            placeholder="O que te levou a deletar a sua conta?"
            multiline
            rows={4}
            fullWidth
            value={feedback}
            onChange={handleFeedbackChange}
            variant="outlined"
            InputProps={{
              style: { color: '#fff' },
              maxLength: 500,
            }}
            InputLabelProps={{ style: { color: '#fff' } }}
            style={{ marginTop: '16px', marginBottom: '16px' }}
          />
          <Typography variant="caption" style={{ color: '#ddd', float: "right" }}>
            {`${feedback.length}/500 caracteres`}
          </Typography>
          <FormHelperText style={{ color: '#ddd' }}>
            Nos ajude a melhorar, compartilhe seu feedback.
          </FormHelperText>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={dialogStyles}>
        <Button onClick={onClose} color="error" style={buttonStyles}>
          Enviar Feedback
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProfileFeedback;
