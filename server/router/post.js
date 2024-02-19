const express = require("express");
const router = express.Router();
const con = require("../db");
const logger = require("../logger");

router.post("/write", async (req, res) => {
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
        const [results, fields] = await con.query(sql, values);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send("serverError");
        logger.error(error); //에러 로깅
    }
});

router.get("/list", async (req, res) => {
    let sql = `SELECT * FROM drinkBoard WHERE boardDelete = 0 AND boardCategory = '자유게시판'`;
    try {
        const [results, fields] = await con.query(sql);
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});

router.get(`/view/:boardId`, async (req, res) => {
    const params = req.params.boardId;
    console.log(params);

    let sql = `SELECT * FROM drinkBoard WHERE boardId = ? AND boardDelete = 0`;
    let value = params;
    try {
        const [results, fields] = await con.query(sql, value);
        res.status(200).json({ success: true, post: results });
    } catch (err) {
        logger.error(err);
        res.status(400).json({ success: false, message: "serverERR" });
    }
});
module.exports = router;
