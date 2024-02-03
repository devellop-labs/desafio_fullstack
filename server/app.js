const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./src/routes/index")

const port = 3002;
const app = express();
const router = express.Router();

const allowedOrigin = 'http://localhost:3000';

const corsOptions = {
  origin: allowedOrigin,
  credentials: true, // Allow credentials (cookies)
};

const ipLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: {
    message: "Too many requests, please try again later!"
},
});


app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(ipLimiter);
router.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
	console.log(`Server port: ${port}`);
});

module.exports = app;
