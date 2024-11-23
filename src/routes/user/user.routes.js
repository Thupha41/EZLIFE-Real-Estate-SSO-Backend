import express from "express";
import UserController from "../../controller/userController";

const router = express.Router();

/**
 * @swagger
 * /users/read:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get list of users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRows:
 *                   type: integer
 *                   example: 4
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */

router.get("/read", UserController.getListUser);

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     security:
 *       - BearerAuth: []
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
 *               - roleId
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
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
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '200':
 *         description: User created successfully
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
 *                   example: "Create user succeed"
 *                 DT:
 *                   $ref: '#/components/schemas/User'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
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
router.post("/create", UserController.createUser);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@email.com"
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
 *               roleId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */

router.put("/update/:id", UserController.updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete("/delete/:id", UserController.deleteUser);

/**
 * @swagger
 * /users/search:
 *   get:
 *     tags:
 *       - Users
 *     summary: Search users
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term to filter users
 *     responses:
 *       '200':
 *         description: Successful search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EC:
 *                   type: integer
 *                 EM:
 *                   type: string
 *                 DT:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       '404':
 *         description: No users found
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
 *                   example: "No query users found"
 *                 DT:
 *                   type: object
 *                   example: {}
 */
router.get("/search", UserController.searchUser);

/**
 * @swagger
 * /users/account:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user account details
 *     description: Retrieve authenticated user's account information
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user account details
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
 *                   example: "get user detail successfully"
 *                 DT:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       format: char(36)
 *                       example: "string"
 *                     access_token:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                       example: "Ngo"
 *                     last_name:
 *                       type: string
 *                       example: "Phat"
 *                     email:
 *                       type: string
 *                       example: "username@gmail.com"
 *                     phone:
 *                       type: string
 *                       example: "0399245850"
 *                     address:
 *                       type: string
 *                       example: "67 Hoang Hoa Tham"
 *                     roleWithPermission:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         name:
 *                           type: string
 *                           example: "employee"
 *                         description:
 *                           type: string
 *                           example: "Employee"
 *                         permissions:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Permission'
 *       '401':
 *         description: Unauthorized - Invalid or missing token
 */

router.get("/account", UserController.getUserAccount);

/**
 * @swagger
 * /users/bulk-delete:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete multiple users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Users deleted successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete("/bulk-delete", UserController.bulkDeleteUsers);

/**
 * @swagger
 * /users/bulk-update:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update multiple users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: string
 *                     role:
 *                       type: integer
 *                       example: integer
 *                     address:
 *                       type: string
 *                       example: string
 *                     first_name:
 *                       type: string
 *                       example: string
 *                     last_name:
 *                       type: string
 *                       example: string
 *                     phone:
 *                       type: string
 *                       example: string
 *                     email:
 *                       type: string
 *                       example: string
 *     responses:
 *       '200':
 *         description: Users updated successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put("/bulk-update", UserController.bulkUpdateUsers);

export default router;
