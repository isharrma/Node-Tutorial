const https = require("https");
const path = require("path");
const fs = require("fs");
const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const cookieSession = require("cookie-session");
const { verify } = require("crypto");

require("dotenv").config();

const app = express();
const PORT = 8000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

//Callback function for verifiying the credentials.
function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google  profile", profile);
  done(null, profile);
}

//-------- MIDDLEWARES -----------------------------------------

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Saves the sesssion to cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

// Creates a cookie session for passport
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, //Makes it 24 hours
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
  })
);

app.use(passport.initialize());

app.use(passport.session());
//-------- MIDDLEWARES ENDS -----------------------------------------

//Checks if the user has been successfully authenticated or nt
function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in.",
    });
  }
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("Google poked you!");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

app.get("/failure", (req, res) => {
  return res.send("Failed to Login");
});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send(`You just got rick rolled LMAO!!`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port: ${PORT}....`);
  });
