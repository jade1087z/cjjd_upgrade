"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
const logger = require("../logger");
router.post("/write", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let myMemberId = 1;
    let boardCategory = req.body.boardCategory;
    let boardTitle = req.body.boardTitle;
    let boardContents = req.body.boardContents;
    let boardAuthor = "admin"; // member 정보에서 닉네임 가져오기
    let sql = `INSERT INTO drinkBoard(myMemberId, boardCategory, boardTitle, boardContents, boardAuthor) VALUES (?, ?, ?, ?, ?)`;
    let values = [
        myMemberId,
        boardCategory,
        boardTitle,
        boardContents,
        boardAuthor,
    ];
    try {
        const [results, fields] = yield db_1.default.query(sql, values);
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send("serverError");
        logger.error(error); //에러 로깅
    }
}));
router.get("/list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sql = `SELECT * FROM drinkBoard WHERE boardDelete = 0 AND boardCategory = '자유게시판'`;
    try {
        console.log("queryok");
        const [results] = yield db_1.default.query(sql);
        res.status(200).json({ success: true, postList: results });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
}));
router.get(`/view/:boardId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.boardId;
    const myMemberId = 2;
    let checkSql = "SELECT * FROM drinkLikes WHERE myMemberId = ? AND boardId = ?";
    let updateSql = `UPDATE drinkBoard SET boardView = boardView + 1 WHERE boardId = ? AND boardDelete = 0`;
    let sql = `SELECT * FROM drinkBoard WHERE boardId = ? AND boardDelete = 0 AND boardCategory = '자유게시판'`;
    let valueForCheckSql = [myMemberId, params];
    let value = params;
    try {
        const [checkResults] = yield db_1.default.query(checkSql, valueForCheckSql);
        let isLiked = false;
        if (checkResults.length > 0) {
            isLiked = true;
        }
        yield db_1.default.query(updateSql, value);
        const [[results]] = yield db_1.default.query(sql, value);
        res.status(200).json({ success: true, post: results, isLiked: isLiked });
    }
    catch (err) {
        logger.error(err);
        res.status(400).json({ success: false, message: "serverERR" });
    }
}));
// 추천 업데이트 기능 
router.post(`/boardLike/:boardId`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myMemberId = req.body.myMemberId;
    const isLiked = req.body.isLiked;
    const boardId = req.params.boardId;
    const values = [myMemberId, boardId];
    let sql;
    let updateSql;
    if (isLiked) {
        sql = `DELETE FROM drinkLikes WHERE myMemberId = ? AND boardId = ?`;
        updateSql = `UPDATE drinkBoard SET boardLike = boardLike - 1 WHERE boardId = ?`;
    }
    else {
        sql = "INSERT INTO drinkLikes (myMemberId, boardId) VALUES (? , ?)";
        updateSql = `UPDATE drinkBoard SET boardLike = boardLike + 1 WHERE boardId = ?`;
    }
    try {
        yield db_1.default.query(sql, values);
        yield db_1.default.query(updateSql, boardId);
        res.status(200).json({ success: true });
    }
    catch (err) {
        logger.error(err);
        res.status(400).json({ success: false });
    }
}));
exports.default = router;
// 문제
// 추천을 누르고 리랜더링시 반영되지 않음 -> setBtnLike의 상태가
// 다른 멤버아이디로 접근시 -> setBtnLike의 상태가 달라야함
