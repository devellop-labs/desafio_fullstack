const AuthenticationService = require("../services/authentication.service")
const jwtInB64 = "anNvbndlYnRva2Vu";

const signUpController = async (req, res) => {
    try {
        const {Username, Email, Password } = req.body;

        const result = await AuthenticationService.signUpService(Username, Email, Password);

        if (result) { //set cookies as None and true is not 100% safe.
            res.cookie(jwtInB64, result, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                sameSite: "None"
            });
        }
        
        res.status(200).send('Signup successful and token set');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const signInController = async (req, res) => {
    try {
        const { Username, Password } = req.body

        const result = await AuthenticationService.signInService(Username, Password)

        if (result) {
            res.cookie(jwtInB64, result, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                sameSite: "None"
            });
        }

        res.status(200).send('SignIn successful and token set');
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    signUpController,
    signInController
}