import BaseService from "./BaseService";

class AuthenticationService extends BaseService {
    constructor() {
        super("authentication")
    }

    signUp(data) {
        return this.post("signup", data);
    }

    signIn(data) {
        return this.post("signin", data);
    }
  }
  
  export default Object.freeze(new AuthenticationService());