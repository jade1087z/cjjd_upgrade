const express = require("express");
const router = express.Router();
const con = require("../db");

router.post("/write", (req, res) => {
    let boardId = 1;
    let myMemberId = 1;
    let boardCategory = req.body.boardCategory;
    let boardTitle = "req.body.boardTitle";
    let boardContents = "req.body.boardContents";
    let boardAuthor = "x";
    let boardView = 0;
    let boardLike = 0;
    let boardComment = 0;
    let boardDelete = 1;
    let regTime = Math.floor(Date.now() / 1000);

    let sql = `INSERT INTO drinkBoard(boardId, myMemberId, boardCategory, boardTitle, boardContents, boardAuthor, boardView, boardLike, boardComment, boardDelete, regTime) VALUES ( '${boardId}','${myMemberId}', '${boardCategory}', '${boardTitle}', '${boardContents}', '${boardAuthor}', '${boardView}', '${boardLike}', '${boardComment}', '${boardDelete}', '${regTime}')`;
    con.query(sql, function (error, results, fields) {
        if (error) {
            res.status(500).send("Server Error");
            console.log(error);
            console.log(sql);
        } else {
            res.status(200).json({ success: true });
        }
    });
});

module.exports = router;
