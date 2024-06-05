const express = require("express");
const app = express();

const AuthorRoutePath = require("./routes/author.router");
const BookRoutePath = require("./routes/book.router");
const versionApi = "/api/v1/"

app.use(versionApi + "authors/", AuthorRoutePath);
app.use(versionApi + "books/", BookRoutePath);

app.listen(3000, () => {
    console.log("initialize server");
})