import express from "express";
import AuthController from "../../controller/authController";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - first_name
 *               - last_name
 *               - phone
 *               - address
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "1234"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City"
 *     responses:
 *       '200':
 *         description: User registered successfully
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
 *                   example: "Register user succeed"
 *                 DT:
 *                   $ref: '#/components/schemas/User'
 *       '409':
 *         description: Conflict - email or phone number already exists
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
 *                   oneOf:
 *                     - example: "Email already exists"
 *                     - example: "Phone number already exists"
 *                 DT:
 *                   type: object
 */

router.post("/register", AuthController.handleRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate user with email/password and return tokens
 *     operationId: login
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - valueLogin
 *               - password
 *             properties:
 *               valueLogin:
 *                 type: string
 *                 description: User email address
 *                 example: username@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *                 example: "1234"
 *     responses:
 *       '200':
 *         description: Successful login
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
 *                   example: "Login successfully"
 *                 DT:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       format: char(36)
 *                     access_token:
 *                       type: string
 *                     roleWithPermission:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         description:
 *                           type: string
 *                         permissions:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               url:
 *                                 type: string
 *                               description:
 *                                 type: string
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized - email or password is incorrect
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
 *                   oneOf:
 *                     - example: "Your email is incorrect"
 *                     - example: "Your password is incorrect"
 *                 DT:
 *                   type: object
 */
router.post("/login", AuthController.handleLogin);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Logout successful
 */
router.post("/logout", AuthController.handleLogout);
export default router;
