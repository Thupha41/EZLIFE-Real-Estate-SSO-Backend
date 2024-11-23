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

  /**
   * @swagger
   * /verify-services-jwt:
   *   post:
   *     tags:
   *       - Services
   *     summary: Verify services JWT
   *     description: Validates a JWT token from the Authorization header (Bearer token)
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       '200':
   *         description: JWT verified successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EC:
   *                   type: integer
   *                   example: 1
   *                 EM:
   *                   type: string
   *                   example: "Verify services JWT successfully"
   *                 DT:
   *                   type: string
   *                   example: ""
   *       '401':
   *         description: Authentication failed
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 EC:
   *                   type: integer
   *                   example: -1
   *                 EM:
   *                   type: string
   *                   example: "User not authenticated"
   *                 DT:
   *                   type: string
   *                   example: ""
   */
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
