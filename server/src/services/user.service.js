const crud = require("../crud/crud");
const { checkUserExistence, getUserFromDatabase, comparePassword, decodeFromBase64, createNewPassword, saveUserImage, deleteUserImageBucket } = require("../helper/helper");

const updateUserInformation = async (baseUser, exhibitionName, email, phonenumber, profileImage) => {
  const user = { id: baseUser.id };

  const updatedBaseUser = await crud.getById(user, "Users", baseUser.id);

  const updatedBaseUserWithoutReference = {...updatedBaseUser}

  const {ExhibitionName, Email, PhoneNumber} = updatedBaseUserWithoutReference;

  const lowerCaseExhibitionName = exhibitionName.toLocaleLowerCase().trim();
  const lowerCaseEmail = email.toLocaleLowerCase().trim();

  if (ExhibitionName !== lowerCaseExhibitionName) {
    await checkUserExistence(user, "ExhibitionName", lowerCaseExhibitionName);
  }

  if (Email !== lowerCaseEmail) {
    await checkUserExistence(user, "Email", lowerCaseEmail);
  }

  if (PhoneNumber !== phonenumber) {
    await checkUserExistence(user, "PhoneNumber", phonenumber);
  }

  const updatedUser = {
    ...updatedBaseUser,
    ExhibitionName: lowerCaseExhibitionName,
    Email: lowerCaseEmail,
    PhoneNumber: phonenumber
  }

  if(updatedUser.StoredImageFileName && profileImage) {
    await deleteUserImageBucket(updatedUser);
    delete updatedUser.StoredImageFileName;
  }

  if(profileImage) {
    const imageName = await saveUserImage(updatedBaseUser, profileImage);
    updatedUser.StoredImageFileName = imageName;
  }

  const response = await crud.update(user, "Users", updatedUser)

  delete response.Password;

  return response
}

const updateUserPassword = async (baseUser, oldPassword, newPassword) => {
  const { Username, id } = baseUser;
  const user = { id };

  const decodedOldPassword = decodeFromBase64(oldPassword);
  const decodedNewPassword = decodeFromBase64(newPassword);

  const [userFromDatabase] = await getUserFromDatabase(user, "Username", Username.toLocaleLowerCase().trim());

  const oldPasswordIsRight = await comparePassword(decodedOldPassword, userFromDatabase.Password);

  if(!oldPasswordIsRight) {
    throw new Error("Senha atual está incorreta!");
  }

  const isPasswordValid = await comparePassword(decodedNewPassword, userFromDatabase.Password);

  if (isPasswordValid) {
    throw new Error("A nova senha não pode ser a mesma que a senha atual!");
  }
  const newHashedPassword = await createNewPassword(decodedNewPassword);

  const updatedUser = {
    ...userFromDatabase,
    Password: newHashedPassword,
  }

  await crud.update(user, "Users", updatedUser);

  delete userFromDatabase.Password;

  return {Ok: true};
}

const deleteUserImage = async (baseUser) => {
  const user = { id: baseUser.id };

  const updatedBaseUser = await crud.getById(user, "Users", baseUser.id);

  if(updatedBaseUser.StoredImageFileName) {
    await deleteUserImageBucket(updatedBaseUser);
    delete updatedBaseUser.StoredImageFileName;
  }

  await crud.update(user, "Users", updatedBaseUser);

  delete updatedBaseUser.Password;

  return updatedBaseUser;
}

const deleteUserAccount = async (baseUser) => {
  const user = { id: baseUser.id };

  const updatedBaseUser = await crud.getById(user, "Users", baseUser.id);

  updatedBaseUser.Deleted = "X";
  updatedBaseUser.DeletedDate = new Date();

  await crud.update(user, "Users", updatedBaseUser);

  delete updatedBaseUser.Password;

  return updatedBaseUser;
}

const saveDeleteAccountFeedback = async (baseUser, feedback) => {
  const user = { id: baseUser.id };

  const updatedBaseUser = await crud.getById(user, "Users", baseUser.id);

  updatedBaseUser.DeleteAccountFeedback = feedback;

  await crud.update(user, "Users", updatedBaseUser);

  delete updatedBaseUser.Password;

  return updatedBaseUser;
}

module.exports = {
  updateUserInformation,
  updateUserPassword,
  deleteUserImage,
  deleteUserAccount,
  saveDeleteAccountFeedback,
}
