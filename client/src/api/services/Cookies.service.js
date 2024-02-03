import BaseService from "./BaseService";

class CookiesService extends BaseService {
    constructor() {
        super("cookies")
    }

    check() {
        return this.get("check");
    }

    reset() {
        return this.get("reset");
    }
  }
  
  export default Object.freeze(new CookiesService());