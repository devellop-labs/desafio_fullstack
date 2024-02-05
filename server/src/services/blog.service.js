const crud = require("../crud/crud");
const CONST = require("../helper/constants");
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

const editPost = async (baseUser, title, description, image, postId) => {
  const postData = await crud.getById({ id: -1 }, "Posts", postId);

  if (postData.z_Create_UserId != baseUser.id) {
    return { Unauthorized: "X" }
  }

  const imageURL = await saveUserImage(baseUser, image); //sometimes creating unnecessary image on storage

  const updatedPostData = {
    ...postData,
    Title: title,
    Description: description,
    PostImage: imageURL
  }

  await crud.update({ id: -1 }, "Posts", updatedPostData);
}

const getPosts = async (baseUser) => {
  const filters = [];

  if (baseUser) {
    const filter = {
      [CONST.Filter.Property]: "z_Create_UserId",
      [CONST.Filter.Operator]: CONST.Filter.Operators.Equal,
      [CONST.Filter.Value]: baseUser.id,
    };

    filters.push(filter)
  }

  const posts = await crud.getByFilter({ id: -1 }, "Posts", filters)
    .then(res => res.filter(post => !post.Deleted));

  const postsWithUserDataPromises = posts.map(async (post) => {
    const userThatCreatedPost = await crud.getById({ id: -1 }, "Users", post.z_Create_UserId); //sometimes is not necessary do this request, just get from jwt...

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

const deletePost = async (baseUser, postId) => {
  const postData = await crud.getById({ id: -1 }, "Posts", postId);

  if (postData.z_Create_UserId != baseUser.id) {
    return { Unauthorized: "X" }
  }

  const deletedPostData = {
    ...postData,
    Deleted: "X",
  }

  await crud.update({ id: -1 }, "Posts", deletedPostData);
}


module.exports = {
  addNewPost,
  editPost,
  getPosts,
  getPostById,
  deletePost,
}
