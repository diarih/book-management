// Export Modules
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// Call module and set PORT
const app = express();
const PORT = 4000;

// Use Middleware body-parser
app.use(bodyParser.json());

// Token Secret
const accessTokenSecret = "youraccesstokensecret";

// Create Library Books
const books = [
  {
    author: "Robert Martin",
    country: "USA",
    language: "English",
    pages: 209,
    title: "Clean Code",
    year: 2008,
  },
  {
    author: "Dave Thomas & Andy Hunt",
    country: "USA",
    language: "English",
    pages: 784,
    title: "The Pragmatic Programmer",
    year: 1999,
  },
  {
    author: "Kathy Sierra, Bert Bates",
    country: "USA",
    language: "English",
    pages: 928,
    title: "Head First Java",
    year: 2003,
  },
];

// Create Middleware Authorization
const authenticateJWT = (req, res, next) => {

  // Read header on authorization
  const authHeader = req.headers.authorization;

  // check public or private key
  if (authHeader) {

    const token = authHeader;

    // Verification on jwt
    jwt.verify(token, accessTokenSecret, (err, user) => {
      // check public or private key is exist
      if (err) {
        return res.status(403).send({
          message: "you are not admin"
        });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send({
      message: "you must login"
    });
  }
};

// get all books on admin or member
app.get("/books", authenticateJWT, (req, res) => {
  res.json(books);
});

// add book to library books at line 17
app.post("/books", authenticateJWT, (req, res) => {

  // get json role on payload who store from req.user
  const { role } = req.user;

  // check role is admin
  if (role !== "admin") {
    return res.status(403).send({
      message: "you are not admin"
    });
  }

  const book = req.body;
  books.push(book);

  res.send("Book added successfully");
});

// run server
app.listen(PORT, () => {
  console.log("book server connected at", PORT);
});
