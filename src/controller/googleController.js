require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
import AuthService from "../services/auth.service";
import { v4 as uuidv4 } from "uuid";
const configLoginWithGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        const typeLogin = "google";
        let rawData = {
          username: profile.displayName,
          email: profile.emails?.[0]?.value || "",
          googleId: profile.id,
          first_name: profile.name?.givenName,
          last_name: profile.name?.familyName,
        };
        console.log(">>> checkout profile", profile);
        let user = await AuthService.upsertUserSocialMedia(typeLogin, rawData);
        user.code = uuidv4();
        return cb(null, user);
      }
    )
  );
};
export default configLoginWithGoogle;
