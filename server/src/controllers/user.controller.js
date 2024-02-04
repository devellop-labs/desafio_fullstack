const { createJWT, getOneHourExpiration } = require("../helper/helper");
const UserService = require("../services/user.service");
const jwtInB64 = "anNvbndlYnRva2Vu";


const getUserInformation = (req, res) => {
  try {
    const { User } = req.body;

    res.status(200).send(User);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const updateUserInformation = async (req, res) => {
  try {
    const { User, ExhibitionName, Email, PhoneNumber } = req.body;

    let profileImage = null;

    if (req.file) {
      profileImage = req.file.buffer;
      mimetype = req.file.mimetype;
    }

    const response = await UserService.updateUserInformation(User, ExhibitionName, Email, PhoneNumber, profileImage);

    res.cookie(jwtInB64, '', { expires: new Date(0), httpOnly: true });

    const jwt = createJWT(response)

    res.cookie(jwtInB64, jwt, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "None"
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const updateUserPassword = async (req, res) => {
  try {
    const { User, OldPassword, NewPassword } = req.body;

    const response = await UserService.updateUserPassword(User, OldPassword, NewPassword);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const deleteUserImage = async (req, res) => {
  try {
    const { User } = req.body;

    const response = await UserService.deleteUserImage(User);

    res.cookie(jwtInB64, '', { expires: new Date(0), httpOnly: true });

    const jwt = createJWT(response)

    res.cookie(jwtInB64, jwt, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "None"
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const deleteUserAccount = async (req, res) => {
  try {
    const { User } = req.body;

    const response = await UserService.deleteUserAccount(User);

    res.cookie(jwtInB64, '', { expires: new Date(0), httpOnly: true });

    const jwt = createJWT(response)

    res.cookie(jwtInB64, jwt, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite: "None"
    });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const saveDeleteAccountFeedback = async (req, res) => {
  try {
    const { User, Feedback } = req.body;

    const response = await UserService.saveDeleteAccountFeedback(User, Feedback);

    res.cookie(jwtInB64, '', { expires: new Date(0), httpOnly: true });

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getUserInformation,
  updateUserInformation,
  updateUserPassword,
  deleteUserImage,
  deleteUserAccount,
  saveDeleteAccountFeedback,
}
