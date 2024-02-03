import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import UserService from '../../../services/User.service';
import EditPasswordModal from './EditPasswordModal';
import { ToastContainer, toast } from "react-toastify";
import { capitalizeFirstLetter, getLevelsConfiguration, getUserImage, showToast, validateEmail, validatePhoneNumber, validateUsername } from '../../../helper';
import NoImage from "../../../assets/images/NoImage.png"
import UserProfile from './UserProfile';
import DeleteProfile from './DeleteProfile';
import LoadingScreen from '../../../components/LoadingScreen';

const AccountInformation = ({ setUpdatedUser, updatedUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [level, setLevel] = useState("1"); //TODO: IMPROVE LV DESIGN
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState(false);
  const [image, setImage] = useState(null);
  const [userExp, setUserExp] = useState(1);
  const [expLimitPerLv, setExpLimitPerLv] = useState(50);
  const imageInputRef = useRef(null);

  useEffect(() => {
    UserService.getUserInfo()
      .then(res => {
        setIsLoading(false);
        const { ExhibitionName, Email, PhoneNumber = "", StoredImageFileName, Level, Exp } = res;

        setUsername(ExhibitionName);
        setEmail(Email);
        setPhoneNumber(PhoneNumber);
        setLevel(Level);
        setUserExp(Exp);
        setImage(getUserImage(StoredImageFileName));
      })
  }, []);


  useEffect(() => {
    const levelConfig = getLevelsConfiguration(level);

    if (typeof levelConfig !== "string") {
      setExpLimitPerLv(levelConfig.ExpLimit);
    }
  }, [level])

  const displayPhone = (phoneNumber) => {
    if (!phoneNumber) {
      setPhoneNumber("");
      return;
    }
    let formattedNumber = String(phoneNumber);
    formattedNumber = formattedNumber.replace(/\D/g, "").substr(0, 11);
    formattedNumber = formattedNumber.replace(/(\d{2})(\d)/, "($1) $2");
    formattedNumber = formattedNumber.replace(/(\d)(\d{4})$/, "$1-$2");
    setPhoneNumber(formattedNumber);
  }

  const convertToBuffer = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleDeleteImage = async () => {
    setImage(null);
    await UserService.deleteUserImage();
    showToast(toast, "Imagem removida com sucesso!", "success");
    setUpdatedUser(!updatedUser);
  };

  const saveUserInfo = async () => {
    try {
      validateUsername(username);
      validateEmail(email);
      validatePhoneNumber(phoneNumber);
      setIsLoading(true);

      const formData = new FormData();
      formData.append('ExhibitionName', username);
      formData.append('Email', email);
      formData.append('PhoneNumber', phoneNumber);

      if (image && typeof image !== "string") {
        const buffer = await convertToBuffer(image);
        formData.append('ProfileImage', new Blob([buffer]));
      }

      const res = await UserService.updateUserInfo(formData);

      setIsLoading(false);
      if (res.Error || typeof res === "string") {
        throw new Error(res?.ErrorMessage || res);
      } else {
        showToast(toast, "Perfil atualizado com sucesso!", "success");
        setUpdatedUser(!updatedUser);
      }
    } catch (error) {
      setIsLoading(false);
      showToast(toast, error.message, "error");
    }
  };

  const textFieldStyles = {
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      "-webkit-text-fill-color": "white",
      "color": "white",
      "caret-color": "transparent"
    }
  };

  const getRightImage = () => {
    if (typeof image === "string") {
      return image;
    }

    if (image) {
      return URL.createObjectURL(image);
    }

    return NoImage;
  }

  const onImageClick = () => {
    imageInputRef.current.click();
  };

  return (
    <Container maxWidth="sm" sx={{ position: 'relative', mt: 4, mb: 4 }}>
      {isLoading && <LoadingScreen />}
      <ToastContainer />
      <EditPasswordModal openEditPasswordModal={openEditPasswordModal} setOpenEditPasswordModal={() => setOpenEditPasswordModal(false)} />
      <input type="file" hidden onChange={handleImageChange} ref={imageInputRef} /> 
      <Box sx={{ display: 'flex' }}>
        <UserProfile
          username={username}
          level={level}
          actualXP={userExp}
          maxXP={expLimitPerLv}
          image={image}
          getRightImage={getRightImage}
          onImageClick={onImageClick}
          handleDeleteImage={handleDeleteImage}
          capitalizeFirstLetter={capitalizeFirstLetter}
        />
        <Box
          sx={{
            bgcolor: '#1A2027',
            p: 3,
            borderRadius: 2,
            color: 'white',
            flex: 2,
            minWidth: "400px"
          }}
        >
          <Typography variant="h6" gutterBottom component="div">
            Informações da Conta
          </Typography>
          <TextField
            fullWidth
            label="Nome De Exibição"
            value={capitalizeFirstLetter(username)}
            InputProps={{
              readOnly: false,
            }}
            inputProps={{
              maxLength: 20,
            }}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Endereço De Email"
            value={capitalizeFirstLetter(email)}
            InputProps={{
              readOnly: false,
            }}
            inputProps={{
              maxLength: 50,
            }}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            sx={{ mt: 2, ...textFieldStyles }}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="DDD"
                value="+55"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Telefone"
                value={phoneNumber}
                InputProps={{
                  readOnly: false,
                }}
                onChange={(e) => displayPhone(e.target.value)}
                variant="filled"
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Senha Atual"
            defaultValue={"default_password"}
            type="password"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
            sx={{ mt: 2, ...textFieldStyles }}
            onClick={() => setOpenEditPasswordModal(true)}
          />
          <DeleteProfile username={capitalizeFirstLetter(username)}/>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={saveUserInfo}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AccountInformation;