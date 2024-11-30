// require("dotenv").config();
// import allowedOrigins from "./allowedOrigin";
// const configCors = (app) => {
//   //check if the origin is allowed
//   const isAllowedOrigin = (origin) => {
//     return allowedOrigins.includes(origin) || !origin;
//   };
//   // Handle CORS headers for preflight OPTIONS requests
//   app.options("*", (req, res) => {
//     const origin = req.headers.origin;
//     if (isAllowedOrigin(origin)) {
//       res.setHeader("Access-Control-Allow-Origin", origin);
//     }
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type,Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     res.sendStatus(200); // Response for OPTIONS request
//   });

//   // Middleware for all requests
//   app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", process.env.REACT_PATH_SSO);
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "X-Requested-With,content-type,Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
//   });
// };

// export default configCors;
// require("dotenv").config();
// import allowedOrigins from "./allowedOrigin";

// const configCors = (app) => {
//   const isAllowedOrigin = (origin) => {
//     // For local development or same-origin requests
//     if (!origin) return true;
//     return allowedOrigins.includes(origin);
//   };

//   app.use(function (req, res, next) {
//     const origin = req.headers.origin;

//     if (isAllowedOrigin(origin)) {
//       // Only set the header if origin exists
//       if (origin) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//       }
//       res.setHeader("Access-Control-Allow-Credentials", true);
//       res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//       );
//       res.setHeader(
//         "Access-Control-Allow-Headers",
//         "X-Requested-With,content-type,Authorization"
//       );
//     }

//     if (req.method === "OPTIONS") {
//       return res.sendStatus(200);
//     }
//     next();
//   });
// };

import allowedOrigins from "./allowedOrigin";

const corsOption = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Access-Control-Allow-Credentials",
    "Cookie",
    "Set-Cookie",
  ],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200,
};

export default corsOption;
