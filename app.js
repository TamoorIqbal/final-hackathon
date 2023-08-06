import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { isAuthenticatedUser } from "./middleware/Auth.js";
import User from "./models/UserModel.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
const absolutePath = path.resolve("uploads");
app.use("/api/v1/uploads", express.static(absolutePath));

// Initialize Passport
app.use(passport.initialize());

// Configure Passport middleware
isAuthenticatedUser(passport);

import user from "./routes/UserRoute.js";
import product from "./routes/ProductRoute.js";
import cart from "./routes/CartRoute.js";
import order from "./routes/OrderRoute.js";
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", cart);
app.use("/api/v1", order);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.resolve(process.cwd(), "frontend", "build");
  app.use(express.static(frontendBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, "index.html"));
  });
}

export default app;
