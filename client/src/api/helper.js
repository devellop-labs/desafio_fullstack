import axios from "axios";
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { CookieJar, MemoryCookieStore } from 'tough-cookie';

axiosCookieJarSupport(axios);

const memoryJar = new MemoryCookieStore();
const cookieJar = new CookieJar();

const api = axios.create({
    baseURL: "http://localhost:3002",
    withCredentials: true,
    jar: cookieJar,
});

const handleRequest = async (requestType, endpoint, data = {}, headers) => {
    try {
        const response = await api[requestType](endpoint, data, { headers });
        return response;
    } catch (error) {
        return error;
    }
};

const get = (endpoint, headers = {}) => handleRequest('get', endpoint, {}, headers);
const post = (endpoint, data, headers = {}) => handleRequest('post', endpoint, data, headers);
const put = (endpoint, data, headers = {}) => handleRequest('put', endpoint, data, headers);
const del = (endpoint, headers = {}) => handleRequest('delete', endpoint, {}, headers);

const getCurrentURL = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);

    return url;
}

const getCurrentPathURL = () => {
    const url = getCurrentURL();

    return url.pathname;
}

const checkCookiesPermission = async (cb) => {
    const CookiesService = (await import('./services/Cookies.service')).default;


    return CookiesService.check()
        .then((res) => {
            cb(res?.Unauthorized);
        })
}

const getLogOffLocalStorage = () => {
    const item = localStorage.getItem('logoff');

    return item;
}

const setLocalStorageLogOff = () => {
    const data = {
        LogOff: "X",
    };

    localStorage.setItem("logoff", JSON.stringify(data));
}

const removeLocalStorageLogOff = () => {
    localStorage.removeItem("logoff");
}

const getLastURLPath = () => {
    const path = getCurrentPathURL();

    const pathHistory = localStorage.getItem('path-history');
    const parsedHistory = JSON.parse(pathHistory);

    if (pathHistory && parsedHistory.CurrentPath !== path) {

        const updatedHistory = {
            LastPath: parsedHistory.CurrentPath,
            CurrentPath: path,
        };

        const stringifyHistory = JSON.stringify(updatedHistory);

        localStorage.setItem('path-history', stringifyHistory);

        return updatedHistory;
    }

    if (!pathHistory) {
        const newHistory = {
            LastPath: "",
            CurrentPath: path,
        };

        const stringifyHistory = JSON.stringify(newHistory);

        localStorage.setItem('path-history', stringifyHistory);

        return newHistory;
    }

    return parsedHistory;
}

const resetLocalStorage = () => {
    localStorage.clear();
}

const resetUserCookies = async () => {
    const CookiesService = (await import('./services/Cookies.service')).default;

    await CookiesService.reset();

    return { Ok: "X" };
}

const removeBlankSpace = (str) => {
    return str.replace(/ /g, '');
}

const isPasswordSafe = (password) => {
    const MIN_LENGTH = 8;

    if (password.length < MIN_LENGTH) {
        throw new Error(`Password length must be higher than ${MIN_LENGTH}`);
    }

    if (!/[a-z]/.test(password)) {
        throw new Error("Password must have a lower case letter");
    }

    if (!/[A-Z]/.test(password)) {
        throw new Error("Password must have an upper case letter");
    }

    if (!/[0-9]/.test(password)) {
        throw new Error("Password must have a number");
    }

    if (!/[!@#$%^&*]/.test(password)) {
        throw new Error("Password must have a special character");
    }
};

const validateUsername = (username) => {
    if (!username || typeof username !== "string") {
        throw new Error("Username is not valid or not a string");
    }
}

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
        throw new Error("Email is not valid");
    }
}

const ensureSignUpArguments = (username, email, password) => {
    validateUsername(username);
    validateEmail(email);
    isPasswordSafe(password);
};

const validatePhoneNumber = (phoneNumber) => {
    var regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (regex.test(phoneNumber)) {
        return true;
    } else {
        throw new Error("Invalid phone number format. The correct format is (XX) XXXXX-XXXX.");
    }
}

const capitalizeFirstLetter = (str = "") => {
    if (str.length === 0) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str?.slice(1);
}

const encodeToBase64 = (str) => {
    return btoa(str);
}

const getOursPath = () => {
    return [
        "/",
        "/blog",
        "/profile",
        "/profile/myposts",
        "/profile/historic",
    ]
}

const showToast = (toast, message, type, options = {}, ignoreCSS) => {
    const customStyle = {
        position: 'absolute',
        top: '50px',
        right: '10px',
        width: "312px",
    };

    const defaultOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        ...options,
    };

    if (!ignoreCSS) {
        defaultOptions.style = customStyle;
    }
    //TODO: IMPROVE
    // if (toast.isActive()) {
    //     toast.dismiss();
    // }

    switch (type) {
        case "success":
            toast.success(message, defaultOptions);
            break;
        case "error":
            toast.error(message, defaultOptions);
            break;
        case "info":
            toast.info(message, defaultOptions);
            break;
        case "warn":
            toast.warn(message, defaultOptions);
            break;
        default:
            toast(message, defaultOptions);
    }
}

const refreshWebsite = () => {
    window.location.reload(true);
}

const getUserInfo = async () => {
    const UserService = (await import('./services/User.service')).default;

    return UserService.getUserInfo()
}

const getUserImage = (image) => {
    if (image) {
        const baseImageUrl = `https://storage.googleapis.com/devellop-labs-images/${image}`
        return baseImageUrl;
    }
    return null;
}

const getLevelsConfiguration = (lvName) => {
    const lvls = [
        { Name: "1", ExpLimit: 100, Permissions: "Permissions" },
        { Name: "2", ExpLimit: 1000, Permissions: "Permissions" },
        { Name: "3", ExpLimit: 1900, Permissions: "Permissions" },
        { Name: "4", ExpLimit: 2800, Permissions: "Permissions" },
        { Name: "5", ExpLimit: 3700, Permissions: "Permissions" },
        { Name: "6", ExpLimit: 4600, Permissions: "Permissions" },
        { Name: "7", ExpLimit: 5500, Permissions: "Permissions" },
        { Name: "8", ExpLimit: 6400, Permissions: "Permissions" },
        { Name: "9", ExpLimit: 7300, Permissions: "Permissions" },
        { Name: "10", ExpLimit: 8200, Permissions: "Permissions" },
        { Name: "11", ExpLimit: 12300, Permissions: "Permissions" },
        { Name: "12", ExpLimit: 18500, Permissions: "Permissions" },
        { Name: "13", ExpLimit: 30000, Permissions: "Permissions" },
        { Name: "14", ExpLimit: 42000, Permissions: "Permissions" },
        { Name: "15", ExpLimit: 62000, Permissions: "Permissions" },
        { Name: "16", ExpLimit: 100000, Permissions: "Permissions" },
        { Name: "17", ExpLimit: 140000, Permissions: "Permissions" },
        { Name: "18", ExpLimit: 210000, Permissions: "Permissions" },
        { Name: "19", ExpLimit: 315000, Permissions: "Permissions" },
        { Name: "20", ExpLimit: 475000, Permissions: "Permissions" },
        { Name: "21", ExpLimit: 950000, Permissions: "Permissions" },
        { Name: "22", ExpLimit: 2000000, Permissions: "Permissions" },
        { Name: "23", ExpLimit: 4000000, Permissions: "Permissions" },
        { Name: "24", ExpLimit: 8000000, Permissions: "Permissions" },
        { Name: "25", ExpLimit: 15000000, Permissions: "Permissions" },
        { Name: "26", ExpLimit: 45000000, Permissions: "Permissions" },
        { Name: "27", ExpLimit: 135000000, Permissions: "Permissions" },
        { Name: "28", ExpLimit: 400500000, Permissions: "Permissions" },
        { Name: "29", ExpLimit: 1000000000, Permissions: "Permissions" },
        { Name: "30", ExpLimit: 4000000000, Permissions: "Permissions" },
    ]

    const desireLvConfig = lvls.find(lv => lv.Name === lvName);

    if (!desireLvConfig) {
        return "Level não encontrado";
    }

    return desireLvConfig;
}

export {
    get,
    post,
    put,
    del as delete,
    getCurrentURL,
    getLastURLPath,
    checkCookiesPermission,
    resetUserCookies,
    removeBlankSpace,
    isPasswordSafe,
    validateUsername,
    validateEmail,
    ensureSignUpArguments,
    validatePhoneNumber,
    capitalizeFirstLetter,
    encodeToBase64,
    resetLocalStorage,
    getLogOffLocalStorage,
    setLocalStorageLogOff,
    removeLocalStorageLogOff,
    getOursPath,
    showToast,
    refreshWebsite,
    getUserInfo,
    getUserImage,
    getLevelsConfiguration,
};
