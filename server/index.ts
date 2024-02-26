// express
import express from "express";
import path from "path";
import postRouter from "./router/post";
import userRouter from "./router/user";

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "../../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
// router
