import express, { Request, Response } from 'express';
import con from '../db';
const router = express.Router();
const logger = require("../logger");

interface checkResults {
    likeId: number;
    myMemberId: number;
    boardId: number;
    acId: number;
    likeCategory: string;
    likeDelete: number
}

interface QueryResult {
    boardId: number;
    myMemberId: number;
    boardCategory: string;
    boardTitle: string;
    boardContents: string;
    boardAuthor: string;
    boardView: number;
    boardLike: number;
    boardComment: number;
    boardImgFile: string | null;
    boardImgSize: string | null;
    boardDelete: number;
    regTime: Date | string;
}

router.post("/write", async (req: Request, res: Response) => {
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


router.get("/list", async (req: Request, res: Response) => {
    let sql = `SELECT * FROM drinkBoard WHERE boardDelete = 0 AND boardCategory = '자유게시판'`;
    
    try {
        console.log("queryok")
        const [results]: [QueryResult[]] = await con.query(sql);
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});


router.get(`/view/:boardId`, async (req: Request, res: Response) => {
    const params = req.params.boardId;
    const myMemberId = 2;
    let checkSql = "SELECT * FROM drinkLikes WHERE myMemberId = ? AND boardId = ?";
    let updateSql = `UPDATE drinkBoard SET boardView = boardView + 1 WHERE boardId = ? AND boardDelete = 0`;
    let sql = `SELECT * FROM drinkBoard WHERE boardId = ? AND boardDelete = 0 AND boardCategory = '자유게시판'` ;

    let valueForCheckSql = [myMemberId, params]
    let value = params;

    try {
        const [checkResults]: [checkResults[]] = await con.query(checkSql, valueForCheckSql);
        let isLiked = false;
        if (checkResults.length > 0) { isLiked = true }

        await con.query(updateSql, value)
        
        const [[results]]: QueryResult[][] = await con.query(sql, value);
        
        res.status(200).json({ success: true, post: results, isLiked: isLiked });

    } catch (err) {
        logger.error(err);
        res.status(400).json({ success: false, message: "serverERR" });
    }
});

// 추천 업데이트 기능 
router.post(`/boardLike/:boardId`, async (req: Request, res: Response) => {
    const myMemberId = req.body.myMemberId;
    const isLiked = req.body.isLiked
    const boardId = req.params.boardId;

    const values = [myMemberId, boardId]
    let sql;
    let updateSql;

    if (isLiked) {
        sql = `DELETE FROM drinkLikes WHERE myMemberId = ? AND boardId = ?`
        updateSql = `UPDATE drinkBoard SET boardLike = boardLike - 1 WHERE boardId = ?`
    } else {
        sql = "INSERT INTO drinkLikes (myMemberId, boardId) VALUES (? , ?)";
        updateSql = `UPDATE drinkBoard SET boardLike = boardLike + 1 WHERE boardId = ?`
    }

    try {
        await con.query(sql, values)
        await con.query(updateSql, boardId)
        res.status(200).json({ success: true })
    } catch (err) {
        logger.error(err)
        res.status(400).json({ success: false })
    }

})
export default router;

// 문제
// 추천을 누르고 리랜더링시 반영되지 않음 -> setBtnLike의 상태가

// 다른 멤버아이디로 접근시 -> setBtnLike의 상태가 달라야함