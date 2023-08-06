import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import User from "../models/UserModel.js";

const AUTH_HEADER = "authorization";
// Configure JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jllgshllWEUJHGHYJkjsfjds90",
};

export const isAuthenticatedUser = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      if (payload && payload.id) {
        try {
          const user = await User.findById(payload.id);

          if (!user) {
            return done(null, false);
          }
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      } else {
        done(null, false);
      }
    })
  );
};

// export const isAuthenticatedUser = passport.authenticate("jwt", {
//   session: false,
// });

// import passport from "passport";
// import {JwtStrategy} from "passport-jwt";
// // import ExtractJwt from ("passport-jwt").ExtractJwt;
// import jwt from "jsonwebtoken";
// import User from "../models/UserModel.";

// // Configure JWT strategy
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

//  export const isAuthenticatedUser = passport.use(
//   new JwtStrategy(jwtOptions, async (payload, done) => {
//     try {
//       const user = await User.findById(payload.id);

//       if (!user) {
//         return done(null, false);
//       }

//       done(null, user);
//     } catch (error) {
//       done(error, false);
//     }
//   })
// );

// // exports.isAuthenticatedUser = passport.authenticate("jwt", { session: false });
