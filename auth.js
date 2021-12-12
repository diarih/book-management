// Export Modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// Call express and Set PORT
const app = express();
const PORT = 3000;

// User Middleware Bodyparser
app.use(bodyParser.json());

// Create Token Secret
const accessTokenSecret = "youraccesstokensecret";

// Users Account
const users = [
  {
    username: "terra",
    password: "password123admin",
    role: "admin",
  },
  {
    username: "dave",
    password: "password123member",
    role: "member",
  },
];

// Login User
app.post("/login", (req, res) => {

  // Read Body input on json username and password
  const { username, password } = req.body;

  // Check username and password are valid
  const isUser = users.find((e) => {
    return e.username === username && e.password === password;
  });

  // Validation
  if (isUser) {
    const accessToken = jwt.sign(
      { username: isUser.username, role: isUser.role },
      accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});

// Run Server
app.listen(PORT, () => {
  console.log("auth server connected at", PORT);
});
