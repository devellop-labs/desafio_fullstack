import BaseService from "./BaseService";

class BlogService extends BaseService {
    constructor() {
        super("blog")
    }

    createPost(data) {
        return this.post("post_blog", data);
    }

    getPosts() {
        return this.get("get_posts")
    }

    getPostsByUser() {
        return this.get("get_posts_by_user")
    }

    deletePost(id) {
        return this.delete(`delete_post/${id}`)
    }

    editPost(data) {
        return this.put("edit_post", data)
    }
  }
  
  export default Object.freeze(new BlogService());