require("dotenv").config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";
import initApiRoute from "./routes/api";
// import configCors from "./configs/CORS/corsOption";
import cookieParser from "cookie-parser";
import { configPassport } from "./controller/passportController";
import configSession from "./configs/config.session";
import flash from "connect-flash";
import configLoginWithGoogle from "./controller/googleController";
import configLoginWithFacebook from "./controller/facebookController";
import fs from "fs";
import YAML from "yaml";
const file = fs.readFileSync("./sso-swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import credentials from "./middleware/credentials";
import { corsOption, additionalHeaders } from "./configs/CORS/corsOption";
import cors from "cors";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EZLIFE Real Estate SSO API",
      version: "1.0.0",
      description: "API documentation for EZLIFE Real Estate SSO Backend",
    },
    servers: [
      {
        url: `${process.env.PUBLIC_SSO_PATH}/api/v1`,
        description: "Development server",
      },
      {
        url: `${process.env.PUBLIC_SSO_PATH}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "char(36)",
            },
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
              writeOnly: true,
            },
            first_name: {
              type: "string",
            },
            last_name: {
              type: "string",
            },
            address: {
              type: "string",
            },
            phone: {
              type: "string",
            },
            roleId: {
              type: "integer",
              format: "int11",
            },
            typeLogin: {
              type: "string",
            },
            refreshToken: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Role: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int11",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Permission: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int11",
            },
            url: {
              type: "string",
            },
            description: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        ResetPasswordToken: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "char(36)",
            },
            userId: {
              type: "string",
              format: "char(36)",
            },
            verifyToken: {
              type: "string",
            },
            consumed: {
              type: "integer",
              format: "tinyint",
              default: 0,
            },
            expired: {
              type: "integer",
              format: "tinyint",
              default: 0,
            },
            expirationDate: {
              type: "string",
              format: "date-time",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
      responses: {
        ForbiddenError: {
          description: "Forbidden",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  EC: {
                    type: "integer",
                    example: -1,
                  },
                  EM: {
                    type: "string",
                    example:
                      "You don't have permission to access this resource!",
                  },
                  DT: {
                    type: "string",
                    example: "",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    "./src/routes/auth/*.js",
    "./src/routes/user/*.js",
    "./src/routes/role/*.js",
    "./src/routes/permission/*.js",
    "./src/models/*.js",
    "./src/routes/web.js",
    "./src/routes/api.js",
  ],
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.set("trust proxy", 1);
//Khai bao config cors
app.use(credentials);
// app.use(corsOption(app));
app.use(cors(corsOption));
app.use(additionalHeaders);

//config cookie parse
app.use(cookieParser());

configSession(app);

//config flash
app.use(flash());

//config template engine
configViewEngine(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification, {
    customSiteTitle: "EZLIFE Real Estate SSO API",
  })
);

//Khai bao web route
app.use("/", webRoutes);

// Khai bao api route
initApiRoute(app);

configPassport();
configLoginWithGoogle();
configLoginWithFacebook();
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
