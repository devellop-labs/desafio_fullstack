import BaseService from "./BaseService";

class UserService extends BaseService {
    constructor() {
        super("user")
    }

    getUserInfo() {
    return this.get("get_information");
    }

    updateUserInfo(data) {
        return this.put("update_user_information", data);
    }

    updateUserPassword(data) {
        return this.put("update_user_password", data);
    }

    deleteUserImage() {
        return this.delete("delete_user_image");
    }

    deleteUserAccount() {
        return this.delete("delete_user_account");
    }

    saveDeleteAccountFeedback(data) {
        return this.post("save_delete_account_feedback", {Feedback: data});
    }

  }
  
  export default Object.freeze(new UserService());