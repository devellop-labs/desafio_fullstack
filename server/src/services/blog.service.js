const crud = require("../crud/crud");
const { saveUserImage } = require("../helper/helper");

const addNewPost = async (baseUser, title, description, image) => {
  const imageURL = await saveUserImage(baseUser, image);

  const saveData = {
    Title: title,
    Description: description,
    PostImage: imageURL
  }

  delete baseUser.Namespace;

  const response = await crud.create(baseUser, "Posts", saveData);

  return response;
}

const editPost = (baseUser) => {

}

const getPosts = (baseUser) => {

}

const getPostById = (baseUser) => {

}

const deletePost = (baseUser) => {

}


module.exports = {
  addNewPost,
  editPost,
  getPosts,
  getPostById,
  deletePost,
}
