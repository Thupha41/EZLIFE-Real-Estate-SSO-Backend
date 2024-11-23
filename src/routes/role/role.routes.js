import express from "express";
import RoleController from "../../controller/roleController";
import PermissionController from "../../controller/permissionController";
const router = express.Router();

/**
 * @swagger
 * /roles/read:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get all roles
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved roles
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
 *                   example: "get list roles"
 *                 DT:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get("/read", RoleController.getListRoles);

/**
 * @swagger
 * /roles/create:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "string"
 *               description:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       '200':
 *         description: Role created successfully
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
 *                   $ref: '#/components/schemas/Role'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post("/create", RoleController.createRole);

/**
 * @swagger
 * /roles/update/{id}:
 *   put:
 *     tags:
 *       - Roles
 *     summary: Update role by ID
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Role updated successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put("/update/:id", RoleController.updateRole);

/**
 * @swagger
 * /roles/delete/{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     summary: Delete role by ID
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
 *         description: Role deleted successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete("/delete/:id", RoleController.deleteRole);

/**
 * @swagger
 * /roles/{id}/permissions:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Get permissions for a specific role
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       '200':
 *         description: Successfully retrieved role permissions
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
 *                   example: "Get permissions by role successfully"
 *                 DT:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     Permissions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Permission'
 *                   example:
 *                     id: integer
 *                     name: string
 *                     description: string
 *                     Permissions:
 *                       - id: integer
 *                         url: string
 *                         description: string
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get("/:id/permissions", PermissionController.getPermissionByRole);
export default router;
