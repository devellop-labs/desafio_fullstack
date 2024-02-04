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
  }
  
  export default Object.freeze(new BlogService());