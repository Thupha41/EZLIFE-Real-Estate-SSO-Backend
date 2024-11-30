import AuthService from "../services/auth.service";
import { OK } from "../core/success.response";
import { ErrorResponse, BadRequestResponse } from "../core/error.response";
const handleRegister = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!email || !phone || !password) {
      return new OK({
        EM: "",
        DT: "",
      }).send(res);
    }
    if (password && password.length < 4) {
      throw new BadRequestResponse({
        EM: "Password must be longer than 3 characters", // error message
        EC: "0", // Error code
        DT: "", // data
      }).send(res);
    }
    // Service: create user
    let data = await AuthService.register(req.body);
    console.log(">>> check response code", data.EC);
    // Respond with the error or success message from AuthService
    return new OK({
      EC: data.EC,
      EM: data.EM,
      DT: data.DT,
    }).send(res);
  } catch (error) {
    console.error("Error in handleRegister:", error);
    if (error instanceof ErrorResponse) {
      return error.send(res);
    }
    return new ErrorResponse({
      EM: "Error message from server",
    }).send(res);
  }
};

const getLoginPage = (req, res) => {
  const { serviceURL } = req.query;
  return res.render("login.ejs", {
    redirectURL: serviceURL,
  });
};
const handleLogin = async (req, res) => {
  try {
    console.log(">>> check req.body AuthController login", req.body);
    let data = await AuthService.login(req.body);
    if (data && data.DT && data.DT.access_token) {
      res.cookie("access_token", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        domain: "ezlife-real-estate-frontend.vercel.app",
        secure: true,
        sameSite: "None",
        path: "/",
      });
    }

    return new OK({
      EM: data.EM,
      DT: { ...data.DT, redirectURL: req.body.redirectURL },
    }).send(res);
  } catch (error) {
    console.error("Error in handleLogin:", error);

    if (error instanceof ErrorResponse) {
      return error.send(res);
    }
    return new ErrorResponse({
      EM: "Error message from server",
    }).send(res);
  }
};

const handleLogout = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return new OK({
      EM: "Clear cookies successfully",
    }).send(res);
  } catch (error) {
    console.error(error);
    return new ErrorResponse({
      EM: "Error message from server",
    }).send(res);
  }
};

export default {
  handleRegister,
  handleLogin,
  handleLogout,
  getLoginPage,
};
