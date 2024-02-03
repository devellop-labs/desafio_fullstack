const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const secretKey = "c3a1bac02ae0f0d8e95a38dc657ab3cbf1e175b716eb43d60147f49dfc1e78b9";
const jwtInB64 = "anNvbndlYnRva2Vu";

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    keyGenerator: (req) => {
        const token = req.headers.cookie;
        const cookieValue = getCookieValue(token);
        try {
            const decoded = jwt.verify(cookieValue, secretKey);
            return decoded.userId;
        } catch (error) {
            return req.ip;
        }
    },
    handler: (req, res) => {
        return res.status(429).json({ message: 'Too many requests, please try again later!' });
    }
});

const getCookieValue = (token) => {
    const cookies = token.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [name, value] = cookie.split('=');
        if (name === jwtInB64) {
            return value;
        }
    }
    return null;
}

const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.cookie;

    if (!token) {
        return res.status(401).send({ Unauthorized: "X" });
    }

    try {
        const cookieValue = getCookieValue(token)
        const decoded = jwt.verify(cookieValue, secretKey);

        if (decoded) {
            delete decoded.Password;
            delete decoded.iat;
            delete decoded.exp;
        } else {
            res.status(401).send({ Unauthorized: "X" });
            return;
        }

        req.body.User = decoded;
        limiter(req, res, next);
    } catch (error) {
        return res.status(401).send('Invalid token.');
    }
};

module.exports = verifyTokenMiddleware;
