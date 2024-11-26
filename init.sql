INSERT into Permission (url, description) VALUES ('/users/read', 'read list users');
INSERT into Permission (url, description) VALUES ('/users/update', 'edit user');
INSERT into Permission (url, description) VALUES ('/users/delete', 'delete users');
INSERT into Permission (url, description) VALUES ('/users/create', 'Create users');
INSERT into Permission (url, description) VALUES ('/users/bulk-delete', 'Bulk delete users');
INSERT into Permission (url, description) VALUES ('/users/bulk-update', 'Bulk update users');
INSERT into Permission (url, description) VALUES ('/roles/read', 'read list roles');
INSERT into Permission (url, description) VALUES ('/roles/update', 'edit role');
INSERT into Permission (url, description) VALUES ('/roles/delete', 'delete role');
INSERT into Permission (url, description) VALUES ('/roles/create', 'Create role');
INSERT into Permission (url, description) VALUES ('/permissions/read', 'read list permissions');
INSERT into Permission (url, description) VALUES ('/permissions/update', 'edit permission');
INSERT into Permission (url, description) VALUES ('/permissions/delete', 'delete permission');
INSERT into Permission (url, description) VALUES ('/permissions/create', 'Create permission');
INSERT into Permission (url, description) VALUES ('/permissions/assign-to-role', 'Assign permissions to role');
INSERT into Permission (url, description) VALUES ('/roles/permissions', 'Get all permissions by role');
INSERT into Permission (url, description) VALUES ('/blogs/posts/create-post', 'Create a blog');
INSERT into Permission (url, description) VALUES ('/blogs/posts', 'Update or delete a post');
INSERT into Permission (url, description) VALUES ('/blogs/posts/comments/create', 'Create comment for post');
INSERT into Permission (url, description) VALUES ('/blogs/posts/images/upload', 'Create images for post');
INSERT into Permission (url, description) VALUES ('/blogs/post/comment', 'Modify or Delete a post');
INSERT into Permission (url, description) VALUES ('/blogs/posts/like', 'Like or Unlike a post');
INSERT into Permission (url, description) VALUES ('/blogs/notifications', 'Get notification from blogs for user');
INSERT into Permission (url, description) VALUES ('/blogs/notifications/delete', 'Delete a notification');
INSERT into Permission (url, description) VALUES ('/blogs/notifications/mark-read', 'Mark a notification as read');


INSERT into Role (name, description) VALUES ('admin', 'Admin');
INSERT into Role (name, description) VALUES ('employee', 'Employee');


-- Add new permission to role
INSERT into Permission_Role (roleId, permissionId) VALUES (1,1);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,2);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,3);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,4);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,5);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,6);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,7);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,8);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,9);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,10);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,11);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,12);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,13);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,14);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,15);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,16);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,17);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,18);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,19);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,20);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,21);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,22);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,23);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,24);
INSERT into Permission_Role (roleId, permissionId) VALUES (1,25);


-- Employee Permission_role
INSERT into Permission_Role (roleId, permissionId) VALUES (2,17);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,18);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,19);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,20);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,21);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,22);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,23);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,24);
INSERT into Permission_Role (roleId, permissionId) VALUES (2,25);