require("dotenv").config();
const FacebookStrategy = require("passport-facebook").Strategy;
import passport from "passport";
import AuthService from "../services/auth.service";
import { v4 as uuidv4 } from "uuid";

const configLoginWithFacebook = () => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "emails", "name", "displayName"],
        enableProof: true,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const typeLogin = "facebook";
          let rawData = {
            username: profile.displayName,
            email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
            facebookId: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
          };

          let user = await AuthService.upsertUserSocialMedia(
            typeLogin,
            rawData
          );
          user.code = uuidv4();
          return cb(null, user);
        } catch (error) {
          console.error("Facebook authentication error:", error);
          return cb(error, null);
        }
      }
    )
  );
};

export default configLoginWithFacebook;
