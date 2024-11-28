require("dotenv").config();
const allowedOrigins = [
  "http://localhost:5173",
  "http://52.65.28.64:8080",
  process.env.REACT_PATH,
  process.env.REACT_PATH_SSO,
  process.env.SERVICE_PATH,
  process.env.DOCKER_SSO_PATH,
  process.env.DOCKER_SSO_PATH + "/api/v1",
  "http://" + process.env.HOST_NAME + ":" + process.env.PORT,
  process.env.PUBLIC_SSO_PATH,
  process.env.PUBLIC_SSO_PATH + "/api/v1",
  process.env.SERVICE_PATH,
].filter(Boolean);

module.exports = allowedOrigins;
