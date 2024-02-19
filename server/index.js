// express
const express = require("express");
const path = require("path");
const app = express();
const port = 5050;
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", require("./router/post.js"));
app.use("/api/user", require("./router/user.js"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// router
