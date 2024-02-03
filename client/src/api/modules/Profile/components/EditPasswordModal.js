import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from "react-toastify";
import UserService from '../../../services/User.service';
import { encodeToBase64, isPasswordSafe, showToast } from '../../../helper';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: '#1E1E30',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  color: '#FFFFFF',
  '.MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  '.MuiInputBase-root': {
    color: '#FFFFFF',
    '&::after, &::before': {
      borderBottom: '2px solid rgba(255, 255, 255, 0.7)',
    },
    '&:hover:not(.Mui-disabled)::before': {
      borderBottom: '2px solid rgba(255, 255, 255, 0.9)',
    },
  },
  '.MuiButton-root': {
    bgcolor: '#BB86FC',
    '&:hover': {
      bgcolor: '#BB86FC',
      opacity: 0.8,
    },
  },
};

export default function EditPasswordModal({ openEditPasswordModal, setOpenEditPasswordModal }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPasswordData({ ...passwordData, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => {
    setShowPassword({ ...showPassword, [prop]: !showPassword[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkIfPasswordsAreEqual = () => {
    if (passwordData.newPassword !== passwordData.repeatNewPassword) {
      showToast(toast, "Senhas inseridas não estão iguais!", "error");
      return true;
    }
  }

  const checkIfNewPasswordIsSafe = (password) => {
    try {
      isPasswordSafe(password);

      return true;
    } catch (error) {
      showToast(toast, error.message, "error");
    }
  }

  const updateUserPassword = async () => {
    const { currentPassword, newPassword } = passwordData;

    const dataToSend = {
      OldPassword: encodeToBase64(currentPassword),
      NewPassword: encodeToBase64(newPassword),
    }

    const response = await UserService.updateUserPassword(dataToSend);

    return response;
  }

  const showMessageResponse = (response) => {
    if (typeof response === "string" && (response?.includes("Senha atual está incorreta!") || response?.includes("A nova senha não pode ser a mesma que a senha atual!"))) {
      showToast(toast, response, "error");
      return false;
    }

    showToast(toast, "Senha alterada com sucesso!", "success");

    return response?.Ok
  }

  const handleSave = async () => {
    const verificationResponse = checkIfPasswordsAreEqual();
    if (!verificationResponse) {
      const passwordIsSafe = checkIfNewPasswordIsSafe(passwordData.newPassword);

      if (passwordIsSafe) {
        const response = await updateUserPassword();
        const messageResponse = showMessageResponse(response);

        if (messageResponse) {
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
          });
          setOpenEditPasswordModal();
        }
      }
    }
  };

  const renderPasswordInput = (label, prop) => (
    <TextField
      margin="normal"
      required
      fullWidth
      name={prop}
      label={label}
      type={showPassword[prop] ? 'text' : 'password'}
      id={prop}
      value={passwordData[prop]}
      inputProps={{
        maxLength: 30
      }}
      onChange={handleChange(prop)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => handleClickShowPassword(prop)}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword[prop] ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <div>
      <ToastContainer />
      <Modal
        open={openEditPasswordModal}
        onClose={() => handleSave()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography id="modal-title" variant="h6" component="h2" textAlign="center" flexGrow={1}>
              Editar Senha
            </Typography>
            <IconButton aria-label="close" onClick={() => setOpenEditPasswordModal(false)}>
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          {renderPasswordInput('Senha Atual', 'currentPassword')}
          {renderPasswordInput('Nova Senha', 'newPassword')}
          {renderPasswordInput('Repita A Nova Senha', 'repeatNewPassword')}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSave}
          >
            Alterar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
