import express from "express";
import {
  getHomePage,
  getUserPage,
  postCreateUser,
  handleDeleteUser,
  getEditUserPage,
  handleEditUser,
} from "../controller/homeController";
import loginController from "../controller/loginController";
import passport from "passport";
import checkUser from "../middleware/checkUser";
import { handleLogout } from "../controller/passportController";
const router = express.Router();

router.get("/", checkUser.isLogin, getHomePage);
router.get("/user", getUserPage);
router.post("/user/create-user", postCreateUser);
router.post("/delete-user/:id", handleDeleteUser);
router.get("/user/update-user/:id", getEditUserPage);
router.post("/user/update-user", handleEditUser);
router.get("/login", checkUser.isLogin, loginController.getLoginPage);

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (error, user, info) {
    if (error) {
      return res.status(500).json(error);
    }
    if (!user) {
      return res.status(401).json(info.message);
    }
    req.login(user, function (err) {
      if (err) return next(err);
      console.log("check req.body login", req.body);
      console.log("check user login", user);

      return res
        .cookie("access_token", user.access_token, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          secure: true,
          domain: "ezlife-real-estate-frontend.vercel.app",
          sameSite: "none",
          path: "/",
        })
        .status(200)
        .json({ ...user, redirectURL: req.body.redirectURL });
    });
  })(req, res, next);
});

router.post("/logout", handleLogout);

router.post("/verify-token", loginController.verifySSOToken);

//google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(">>> checkout req.user", req.user);

    //save cookies

    return res.render("social.ejs", { ssoToken: req.user.code });
  }
);

//facebook
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    session: true,
  }),
  function (req, res) {
    console.log(">>> checkout req.user", req.user);
    return res.render("social.ejs", { ssoToken: req.user.code });
  }
);

router.get("/signup", loginController.getSignupPage);
/**
 * @swagger
 * /send-code:
 *   post:
 *     tags:
 *       - Password Reset
 *     summary: Send reset password code
 *     description: Sends a verification code to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       '200':
 *         description: Code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EC:
 *                   type: integer
 *                   example: 0
 *                 EM:
 *                   type: string
 *                   example: "Code sent successfully"
 *                 DT:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       '401':
 *         description: Email not found
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
 *                   example: "Email user@example.com not found"
 *
 * /resend-code:
 *   post:
 *     tags:
 *       - Password Reset
 *     summary: Resend verification code
 *     description: Resends the verification code to user's email
 *     responses:
 *       '200':
 *         description: Code resent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EC:
 *                   type: integer
 *                   example: 0
 *                 EM:
 *                   type: string
 *                   example: "Code resent successfully"
 *       '500':
 *         description: Error resending code
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
 *                   example: "Email not found. Please start the forgot password process again."
 * /verify-forgot-code:
 *   post:
 *     tags:
 *       - Password Reset
 *     summary: Verify reset code
 *     description: Verifies the OTP code sent to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: 6-digit OTP code
 *                 example: "123456"
 *     responses:
 *       '200':
 *         description: Code verified successfully
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
 *                   example: "Code verified successfully"
 *       '400':
 *         description: Invalid or expired code
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
 *                     - example: "Invalid code. Please try again."
 *                     - example: "Token has expired. Please request a new one."
 *       '500':
 *         description: Server error
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
 *                   example: "Error verifying reset code"
 *
 * /reset-password:
 *   post:
 *     tags:
 *       - Password Reset
 *     summary: Reset password
 *     description: Resets user's password after verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "newPassword123"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "newPassword123"
 *     responses:
 *       '200':
 *         description: Password reset successfully
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
 *                   example: "Password reset successfully"
 *       '400':
 *         description: Bad request - Passwords don't match
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
 *                   example: "Passwords do not match."
 *       '500':
 *         description: Server error
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
 *                   example: "Error resetting password"
 *     security: []
 */
//forgot password
router.get("/forgot-password", loginController.getForgotPasswordPage);
router.get("/verify-forgot-code", loginController.getVerifyForgotCodePage);
router.get("/reset-password", loginController.getResetPasswordPage);

router.post("/send-code", loginController.sendCode);
router.post("/verify-forgot-code", loginController.handleVerifyForgotCode);
router.post("/resend-code", loginController.resendCode);
router.post("/reset-password", loginController.handleResetPassword);

module.exports = router;
