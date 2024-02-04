import BaseService from "./BaseService";

class BlogService extends BaseService {
    constructor() {
        super("blog")
    }

    createPost(data) {
        return this.post("post_blog", data);
    }
  }
  
  export default Object.freeze(new BlogService());