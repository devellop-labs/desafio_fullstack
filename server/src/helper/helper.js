const CONST = require("./constants");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const datastoreCredential = require("../../database/datastore-credentials.json");

const storage = new Storage({
    projectId: "devellop-labs",
    credentials: datastoreCredential,
});
const secretKey = "c3a1bac02ae0f0d8e95a38dc657ab3cbf1e175b716eb43d60147f49dfc1e78b9";

const createJWT = (userData) => {
    const expiresIn = '24h';
    const token = jwt.sign(userData, secretKey, { expiresIn: expiresIn });

    return token;
}

const buildErrorReturn = (error) => {
    const errorMessage = error.message || JSON.stringify(error);
    const errorTrace = error.stack || "Error Has no Trace";

    return {
        Error: "X",
        Errormessage: errorMessage,
        Trace: errorTrace,
    }
}

const checkIfObjectHasKeys = (obj) => {
    return Object.keys(obj).length > 0;
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

const getUserFromDatabase = async (user, property, value) => {
    const crud = require("../crud/crud");

    const filter = [{
        [CONST.Filter.Property]: property,
        [CONST.Filter.Operator]: CONST.Filter.Operators.Equal,
        [CONST.Filter.Value]: value,
    }];

    const users = await crud.getByFilter(user, "Users", filter);
    const notDeletedUsers = (users || []).filter(user => !user.Deleted);

    return notDeletedUsers;
};

const checkUserExistence = async (user, property, value) => {
    const users = await getUserFromDatabase(user, property, value);

    if (users.length) {
        throw new Error(`${property} already taken.`);
    }
}

const comparePassword = async (password, otherPassword) => {
    if (password && otherPassword) {
        const isPasswordValid = await bcrypt.compare(password, otherPassword);

        return isPasswordValid;
    }
    return password && otherPassword
}

const createNewPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

const decodeFromBase64 = (encodedStr) => {
    return atob(encodedStr);
}

const determineFileType = async (buffer) => {
    const fileType = await import('file-type');
    return fileType.fileTypeFromBuffer(buffer);
}

const saveUserImage = async (user, imageBuffer) => {
    const bucketName = 'devellop-labs-images';

    const type = await determineFileType(imageBuffer);
    const extension = type ? type.ext : 'png';

    const destFileName = `${user.Namespace}-${uuidv4()}.${extension}`;

    const tempFilePath = `/tmp/${destFileName}`;
    fs.writeFileSync(tempFilePath, imageBuffer);

    await storage.bucket(bucketName).upload(tempFilePath, {
        destination: destFileName,
    });

    fs.unlinkSync(tempFilePath);

    return destFileName;
}

const deleteUserImageBucket = async (user) => {
    const bucketName = 'devellop-labs-images';
    const fileName = user.StoredImageFileName;

    if (!fileName) {
        throw new Error('No stored image filename found for the user.');
    }

    try {
        await storage.bucket(bucketName).file(fileName).delete();
    } catch (error) {
        throw error;
    }
}

const getOneHourExpiration = () => {
    const currentTime = new Date();
    const oneHourFromNow = new Date(currentTime.getTime() + 60 * 60 * 1000);

    return oneHourFromNow;
}

module.exports = {
    buildErrorReturn,
    checkIfObjectHasKeys,
    ensureSignUpArguments,
    checkUserExistence,
    getUserFromDatabase,
    createJWT,
    createNewPassword,
    comparePassword,
    decodeFromBase64,
    saveUserImage,
    deleteUserImageBucket,
    getOneHourExpiration,
}
