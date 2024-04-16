require('dotenv').config()  // env file loading
import { Request, Response, NextFunction } from 'express';
// express
import express from "express";
import path from "path";
import postRouter from "./server/router/post";
import userRouter from "./server/router/user";
import commentRouter from "./server/router/comment";
import acListRouter from "./server/router/acList";
import uploadRouter from "./server/router/upload";

const app = express();
const port = 5050;

app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commentRouter);
app.use("/api/acList", acListRouter);
app.use("/api/upload", uploadRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  
  app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
// router


