require("dotenv").config();
const allowedOrigins = [
  "*",
  process.env.REACT_PATH,
  process.env.REACT_PATH_SSO,
  process.env.SERVICE_PATH,
  "0.0.0.0:8080",
  "0.0.0.0:8080/api/v1",
  "127.0.0.1:8080",
  "localhost:8080",
];

module.exports = allowedOrigins;
