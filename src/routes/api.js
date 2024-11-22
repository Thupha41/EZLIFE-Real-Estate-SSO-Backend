import express from "express";
import permissionRoutes from "./permission/permission.routes";
import {
  checkUserJWT,
  checkUserPermission,
  checkServicesJWT,
} from "../middleware/JWTAction";
import authRoutes from "./auth/auth.routes";
import roleRoutes from "./role/role.routes";
import userRoutes from "./user/user.routes";

const router = express.Router();

const initApiRoute = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);

  //check services JWT
  router.post("/verify-services-jwt", checkServicesJWT);
  //auth route
  router.use("/auth", authRoutes);

  //user route
  router.use("/users", userRoutes);

  //roles route
  router.use("/roles", roleRoutes);

  //permission route
  router.use("/permissions", permissionRoutes);

  return app.use("/api/v1", router);
};

export default initApiRoute;
