const express = require("express");
const cors = require("cors");
const app = express();

const AuthorRoutePath = require("./routes/author.router");
const BookRoutePath = require("./routes/book.router");
const db = require("./routes/db.router");
const versionApi = "/api/v1/"
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());
app.use(versionApi + "authors/", AuthorRoutePath);
app.use(versionApi + "books/", BookRoutePath);
app.use(versionApi + "db/", db);

app.listen(3000, () => {
    console.log("initialize server");
})