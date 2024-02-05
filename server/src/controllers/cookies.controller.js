const CookiesService = require("../services/cookies.service");
const jwtInB64 = "anNvbndlYnRva2Vu";

const resetCookies = async (req, res) => {
  try {
    res.cookie(jwtInB64, '', { expires: new Date(0), httpOnly: true });

    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const checkCookies = async (req, res) => {
  try {
    return res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  resetCookies,
  checkCookies,
}