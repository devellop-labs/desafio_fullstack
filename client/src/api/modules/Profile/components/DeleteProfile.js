import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import UserService from '../../../services/User.service';
import { refreshWebsite, showToast } from '../../../helper';
import { toast } from 'react-toastify';
import DeleteProfileFeedback from './DeleteProfileFeedback';

const DeleteProfile = ({ username = "" }) => {
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [openDeleteFeedback, setDeleteFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleDeleteAccount = async () => {
    const response = await UserService.deleteUserAccount()

    if (response.Error) {
      showToast(toast, response.ErrorMessage, "warn");
      return;
    }

    if (response.Deleted) {
      setOpenDeleteConfirmation(false);
      setDeleteFeedback(true);
    }
  };

  const onCloseDeleteFeedbackModal = async () => {
    if (!feedback) {
      showToast(toast, "Não é possível enviar em branco!", "warn", {}, "X");
    } else {
      await UserService.saveDeleteAccountFeedback(feedback)
      setDeleteFeedback(false);
      showToast(toast, "Feedback enviado com sucesso. Obrigado!", "success");
      setTimeout(refreshWebsite, 5000);
    }
  }

  const dialogStyles = {
    backgroundColor: '#1A2027',
    color: 'white',
  };

  const buttonStyles = {
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  };

  return (
    <>
      <DeleteProfileFeedback open={openDeleteFeedback} onClose={onCloseDeleteFeedbackModal} setFeedback={setFeedback} feedback={feedback} />
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => setOpenDeleteConfirmation(true)}
      >
        Deletar Conta
      </Button>

      <Dialog
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        PaperProps={{
          style: dialogStyles,
        }}
      >
        <DialogTitle sx={dialogStyles}>{"Confirmar exclusão da conta"}</DialogTitle>
        <DialogContent sx={dialogStyles}>
          <DialogContentText sx={dialogStyles}>
            Você tem certeza que quer deletar sua conta, {username}? Essa ação <b>NÃO</b> pode ser revertida.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={dialogStyles}>
          <Button onClick={() => setOpenDeleteConfirmation(false)} sx={buttonStyles}>
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error" sx={buttonStyles}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProfile;
