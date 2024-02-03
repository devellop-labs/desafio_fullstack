import { post, get, put, delete as _delete, getCurrentURL, resetUserCookies, getLastURLPath } from "../helper";

class BaseService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async #checkUserPermission(response) {
    const pathHistory = getLastURLPath();

    if (response?.Unauthorized && pathHistory.CurrentPath !== "/") {
      const url = getCurrentURL();
      const baseURL = `${url.origin}/`;

      window.location.href = baseURL;
      await resetUserCookies();
    }
  }

  async #handleRequest(method, url, data, headers) {
    const endPointWithPath = `${this.endpoint}/${url}`;

    try {
      const response = await method(endPointWithPath, data, headers);
      const responseData = response?.response?.data || response?.data;

      if (response?.response?.status === 429) {
        return response.response.data.message;
      }

      await this.#checkUserPermission(responseData);

      return responseData;
    } catch (error) {
      return { Error: "X", ErrorMessage: error.message || JSON.stringify(error) };
    }
  }

  async delete(url, headers) {
    return await this.#handleRequest(_delete, url, headers);
  }

  async put(url, data, headers) {
    return await this.#handleRequest(put, url, data, headers);
  }

  async get(url, headers) {
    return await this.#handleRequest(get, url, headers);
  }

  async post(url, data, headers) {
    return await this.#handleRequest(post, url, data, headers);
  }
}

export default Object.freeze(BaseService);
