import express from "express";
import PermissionController from "../../controller/permissionController";

const router = express.Router();

/**
 * @swagger
 * /permissions/read:
 *   get:
 *     tags:
 *       - Permissions
 *     summary: Get paginated list of permissions
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         required: true
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         required: true
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: Successfully retrieved permissions list
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
 *                   example: "Get list permissions at page 1, limit 10"
 *                 DT:
 *                   type: object
 *                   properties:
 *                     totalRows:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     permissions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Permission'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.get("/read", PermissionController.getListPermissions);
/**
 * @swagger
 * /permissions/create:
 *   post:
 *     tags:
 *       - Permissions
 *     summary: Create a new permission
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - description
 *             properties:
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Permission created successfully
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
 *                   example: "Create permission successfully"
 *                 DT:
 *                   $ref: '#/components/schemas/Permission'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post("/create", PermissionController.createPermission);
/**
 * @swagger
 * /permissions/assign-to-role:
 *   post:
 *     tags:
 *       - Permissions
 *     summary: Assign permissions to a role
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: object
 *                 required:
 *                   - roleId
 *                   - rolePermissions
 *                 properties:
 *                   roleId:
 *                     type: integer
 *                     example: 1
 *                   rolePermissions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       required:
 *                         - permissionId
 *                       properties:
 *                         permissionId:
 *                           type: integer
 *                     example:
 *                       - permissionId: 1
 *                       - permissionId: 2
 *                       - permissionId: 3
 *     responses:
 *       '200':
 *         description: Permission assigned successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.post("/assign-to-role", PermissionController.assignPermissionToRole);

/**
 * @swagger
 * /permissions/update/{id}:
 *   put:
 *     tags:
 *       - Permissions
 *     summary: Update permission by ID
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
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Permission updated successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.put("/update/:id", PermissionController.updatePermission);

/**
 * @swagger
 * /permissions/delete/{id}:
 *   delete:
 *     tags:
 *       - Permissions
 *     summary: Delete permission by ID
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
 *         description: Permission deleted successfully
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 */
router.delete("/delete/:id", PermissionController.deletePermission);

export default router;
