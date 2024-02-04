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

const getPosts = async () => {
  const posts = await crud.get({id: -1}, "Posts");

  const postsWithUserDataPromises = posts.map(async (post) => {
    const userThatCreatedPost = await crud.getById({id: -1}, "Users", post.z_Create_UserId);

    const postWithUser = {
      ...post,
      ExhibitionName: userThatCreatedPost.ExhibitionName,
      UserProfileImage: userThatCreatedPost.StoredImageFileName,
    }

    return postWithUser;
  })

  const unsortedResult = await Promise.all(postsWithUserDataPromises);

  const sortedResult = unsortedResult.sort((a, b) => {
    const dateA = new Date(a.z_Inserted_Date);
    const dateB = new Date(b.z_Inserted_Date);

    return dateB - dateA;
  });

  return sortedResult;
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
