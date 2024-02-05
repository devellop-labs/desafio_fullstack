const crud = require("../crud/crud");
const { v4: uuidv4 } = require('uuid');
const { ensureSignUpArguments, checkUserExistence, getUserFromDatabase, createJWT, comparePassword, createNewPassword } = require("../helper/helper");

const globalUser = {id: -1}

const signUpService = async (username, email, password) => {
    ensureSignUpArguments(username, email, password);

    const lowerCaseUser = username.toLocaleLowerCase().trim();
    const lowerCaseEmail = email.toLocaleLowerCase().trim();

    await checkUserExistence(globalUser, "Email", lowerCaseEmail);
    await checkUserExistence(globalUser, "Username", lowerCaseUser);

    const hashedPassword = await createNewPassword(password);

    const newUserEntity = {
        Email: email,
        Username: lowerCaseUser,
        ExhibitionName: lowerCaseUser,
        Level: "1",
        Exp: "0",
        Namespace: uuidv4(),
        Password: hashedPassword,
    };

    const response = await crud.create(globalUser, "Users", newUserEntity);

    return createJWT(response);
};

const signInService = async (username, password) => {
    // TODO: Improve to add login by email

    const [userFromDatabase] = await getUserFromDatabase(globalUser, "Username", username.toLocaleLowerCase().trim());

    if (!userFromDatabase?.Username) {
        throw new Error("User not found.");
    }
    
    const isPasswordValid = await comparePassword(password, userFromDatabase.Password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    return createJWT(userFromDatabase)
}

module.exports = {
    signUpService,
    signInService
}
