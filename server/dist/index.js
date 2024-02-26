"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const post_1 = __importDefault(require("./router/post"));
const user_1 = __importDefault(require("./router/user"));
const app = (0, express_1.default)();
const port = 5050;
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/post", post_1.default);
app.use("/api/user", user_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build/index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build/index.html"));
});
// router
