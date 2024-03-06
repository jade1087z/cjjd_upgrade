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

interface BoardResult {
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
    let myMemberId = req.body.myMemberId;
    let boardCategory = req.body.boardCategory;
    let boardTitle = req.body.boardTitle;
    let boardContents = req.body.boardContents;
    let boardAuthor = req.body.boardAuthor; // member 정보에서 닉네임 가져오기

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
        const [results]: [BoardResult[]] = await con.query(sql);
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});


router.get(`/view/:boardId`, async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const myMemberId = Number(req.query.myMemberId);
    console.log(myMemberId, 'myMemberId1')

    let checkSql = "SELECT * FROM drinklikes WHERE myMemberId = ? AND boardId = ?";
    let valueForCheckSql = [myMemberId, boardId]
    let updateSql = `UPDATE drinkBoard SET boardView = boardView + 1 WHERE boardId = ? AND boardDelete = 0`;
    let sql = `SELECT * FROM drinkBoard WHERE boardId = ? AND boardDelete = 0 AND boardCategory = '자유게시판'`;
    let value = boardId;

    try {
        const [checkResults]: [checkResults[]] = await con.query(checkSql, valueForCheckSql);
        let isLiked = false;
        if (checkResults.length > 0) { isLiked = true }

        await con.query(updateSql, value)

        const [[results]]: BoardResult[][] = await con.query(sql, value);

        res.status(200).json({ success: true, post: results, isLiked: isLiked });

    } catch (err) {
        logger.error(err);
        res.status(400).json({ success: false, message: "serverERR" });
    }
});

// 추천 업데이트 기능 
router.post(`/boardLike/:boardId`, async (req: Request, res: Response) => {
    const myMemberId = Number(req.body.myMemberId);
    const isLiked = req.body.isLiked
    const boardId = req.params.boardId;
    console.log(myMemberId)
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
        const [rows] = await con.query(`SELECT * FROM drinkBoard WHERE boardId = ?`, [boardId]);
        const post = rows[0];  // 가정: boardId는 유일(unique)하므로 결과의 첫 번째 행을 post로 사용
        console.log(post, 'post')
        res.status(200).json({ success: true, post: post })
        
    } catch (err) {
        logger.error(err)
        res.status(400).json({ success: false })
    }

})

// 게시글 수정 파트
router.get('/check/:boardId', async (req: Request, res: Response) => {
    const boardId = Number(req.params.boardId);
    const paramsMember = Number(req.query.myMemberId);
    try {
        const [rows] = await con.query('SELECT * FROM drinkboard WHERE boardId = ?', [boardId]);
        const {myMemberId} = rows[0]
        if (rows.length === 0) {
            res.status(404).json({success: false, message: "해당 게시글이 존재하지 않습니다."});
            return;
        }
        if(paramsMember === myMemberId) {
            res.status(200).json({success: true, message: "게시글 수정이 가능합니다."})
        } else if(paramsMember !== myMemberId) {
            res.status(403).json({success: false, message: "게시글 수정 권한이 없습니다."});
            return;
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "서버 오류가 발생했습니다."});
    }
})

router.patch('/update/:boardId', async(req: Request, res:Response) => {
    const boardId = req.params.boardId;
    console.log(boardId)
    const title = req.body.boardTitle;
    const contents = req.body.boardContents;
    
    try {
        const sql = 'UPDATE drinkboard SET boardTitle = ?, boardContents = ? WHERE boardId = ?';
        const values = [title, contents, boardId]
        const [result, fields] = await con.query(sql, values)
        
        res.status(200).json({success: true});
    } catch (error) {
        logger.error(error)
        res.status(500).json({success: false, message: "서버 오류가 발생했습니다."});
    }

})

// 게시글 삭제 부분 
router.delete('/delete/:boardId', async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const paramsMember = Number(req.query.myMemberId);
    console.log(boardId)
    console.log(paramsMember)

    try {
        const [rows] = await con.query('SELECT * FROM drinkboard WHERE boardId = ?', [boardId]);
        const {myMemberId} = rows[0]
        if (rows.length === 0) {
            res.status(404).json({success: false, message: "해당 게시글이 존재하지 않습니다."});
            return;
        }

        if(paramsMember === myMemberId) {
            const result = await con.query('DELETE FROM drinkboard WHERE boardId = ?', [boardId])
            res.status(200).json({success: true, message: "게시글 수정이 가능합니다."})
        } else if(paramsMember !== myMemberId) {
            res.status(403).json({success: false, message: "게시글 삭제 권한이 없습니다."});
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: "서버 오류가 발생했습니다."});
    }

})

export default router;