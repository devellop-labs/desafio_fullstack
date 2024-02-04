const BlogService = require("../services/blog.service");
const jwtInB64 = "anNvbndlYnRva2Vu";

const addNewPost = async (req, res) => {
  try {
    const { User, Title, Description } = req.body;

    let image = null;

    if (req.file) {
      image = req.file.buffer;
      mimetype = req.file.mimetype;
    }

    await BlogService.addNewPost(User, Title, Description, image);

    res.status(200).send('New Post added');
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const editPost = async (req, res) => {
  try {
    const { User, postId, newInfo } = req.body;

    await BlogService.editPost(User);

    res.status(200).send('Post Updated');
  } catch (error) {
    res.status(500).send(error.message);

  }
}

const getPosts = async (req, res) => {
  try {
    const { User } = req.body;

    const posts  = await BlogService.getPosts(User);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);

  }
}

const getPostById = async (req, res) => {
  try {
    const { User, Id } = req.body;

    const posts  = await BlogService.getPostById(User);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);

  }
}

const deletePost = async (req, res) => {
  try {
    const { User, PostId} = req.body;

    const posts  = await BlogService.deletePost(User);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);

  }
}

module.exports = {
  addNewPost,
  editPost,
  getPosts,
  getPostById,
  deletePost,
}