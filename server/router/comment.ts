import express, { Request, Response } from 'express';
import con from '../util/db';
import { commentResult } from '../interface/commentInterface/commentResult';
import { User } from '../interface/userInterface/user.interface';
const router = express.Router();
const logger = require("../util/logger");

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

router.post('/write/:boardId', async (req: Request, res: Response) => {
    const id = req.params.boardId; // boardId 또는 acId
    const myMemberId = req.body.myMemberId;
    const contents = req.body.contents;
    const type = req.body.type; // 'board' 또는 'ac'

    console.log(type)
    try {
        const memberSql = 'SELECT * FROM drinkmember WHERE myMemberId = ?';
        const [rows] = await con.query(memberSql, myMemberId) as [User[]];
        const { youNick } = rows[0];

        let postSql, commentUpdate;
        if (type === 'board') {
            postSql = 'INSERT INTO drinkcomment(myMemberId, boardId, commentName, commentMsg) VALUES (?,?,?,?)';
            commentUpdate = 'UPDATE drinkboard SET boardComment = boardComment + 1 WHERE boardId = ?';
        } else if (type === 'ac') {
            postSql = 'INSERT INTO drinkcomment(myMemberId, acId, commentName, commentMsg) VALUES (?,?,?,?)';
            commentUpdate = 'UPDATE drinklist SET acComment = acComment + 1 WHERE acId = ?';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid type' });
        }

        const values = [myMemberId, id, youNick, contents];

        await con.query(postSql, values);
        await con.query(commentUpdate, id);

        res.status(200).json({ success: true, message: 'Comment posted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occurred while posting comment', error });
    }
});

router.get('/list/:boardId', async (req: Request, res: Response) => {
    const id = req.params.boardId; // boardId 또는 acId
    const page = parseInt(req.query.page as string);
    const type = req.query.type; // 'board' 또는 'ac'
    const offset = (page + 1) * 10;
    let more: boolean = false;
    console.log(type)
    try {
        let countSql, commentSql;
        if (type === 'board') {
            countSql = 'SELECT COUNT(*) AS total FROM drinkcomment WHERE boardId = ?';
            commentSql = 'SELECT * FROM drinkcomment WHERE boardId = ? ORDER BY regTime DESC LIMIT ?, ?';
        } else if (type === 'ac') {
            countSql = 'SELECT COUNT(*) AS total FROM drinkcomment WHERE acId = ?';
            commentSql = 'SELECT * FROM drinkcomment WHERE acId = ? ORDER BY regTime DESC LIMIT ?, ?';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid type' });
        }

        const [[{ total }]]: [[{ total: number }]] = await con.query(countSql, [id]);
        const [result]: [commentResult[]] = await con.query(commentSql, [id, 0, offset]);
        if (result.length === total) more = true;

        res.status(200).json({ success: true, result: result, total: total, more: more });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

router.get('/myList/:id', async (req: Request, res: Response) => {
    const id = req.params.id; // boardId 또는 acId
    const page = parseInt(req.query.page as string);
    const type = req.query.type; // 'board' 또는 'ac'
    const offset = (page + 1) * 10;
    let more: boolean = false;
    console.log(type)
    try {
        let countSql, commentSql;
        if (type === 'board') {
            countSql = 'SELECT COUNT(*) AS total FROM drinkcomment WHERE boardId = ?';
            commentSql = 'SELECT * FROM drinkcomment WHERE boardId = ? ORDER BY regTime DESC LIMIT ?, ?';
        } else if (type === 'ac') {
            countSql = 'SELECT COUNT(*) AS total FROM drinkcomment WHERE acId = ?';
            commentSql = 'SELECT * FROM drinkcomment WHERE acId = ? ORDER BY regTime DESC LIMIT ?, ?';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid type' });
        }

        const [[{ total }]]: [[{ total: number }]] = await con.query(countSql, [id]);
        const [result]: [commentResult[]] = await con.query(commentSql, [id, 0, offset]);
        if (result.length === total) more = true;

        res.status(200).json({ success: true, result: result, total: total, more: more });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

router.get('/check/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const commentId = Number(req.query.commentId);
    const paramsMember = Number(req.query.myMemberId);
    const type = req.query.type; // 'board' 또는 'ac'
    console.log(type)
    try {
        let checkSql;
        if (type === 'board') {
            checkSql = 'SELECT * FROM drinkcomment WHERE commentId = ? AND boardId = ?';
        } else if (type === 'ac') {
            checkSql = 'SELECT * FROM drinkcomment WHERE commentId = ? AND acId = ?';
        } else {
            return res.status(400).json({ success: false, message: 'Invalid type' });
        }

        const [[queryResult]] = await con.query(checkSql, [commentId, id]);
        const { myMemberId } = queryResult;

        if (myMemberId === paramsMember) {
            res.status(200).json({ success: true });
        } else {
            res.status(403).json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

router.patch('/update/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const commentMsg = req.body.msg;
    console.log(id)
    console.log(commentMsg)

    try {
        const sql = 'UPDATE drinkcomment SET commentMsg = ? WHERE commentId = ?';
        const values = [commentMsg, id]
        await con.query(sql, values)
        res.status(200).json({ success: true });
    } catch (error) {
        logger.error(error)
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }

})
// delete 
router.delete('/delete/:commentId', async (req: Request, res: Response) => {
    const commentId = Number(req.params.commentId);
    const paramsMember = Number(req.query.myMemberId);

    const [rows] = await con.query('SELECT * FROM drinkcomment WHERE commentId = ?', [commentId]);

    try {
        const { myMemberId } = rows[0]
        if (rows.length === 0) {
            res.status(404).json({ success: false, message: "해당 글이 존재하지 않습니다." });
            return;
        }

        if (paramsMember === myMemberId) {
            await con.query('DELETE FROM drinkcomment WHERE commentId = ?', [commentId])
            res.status(200).json({ success: true, message: "게시글 수정이 가능합니다." })
        } else if (paramsMember !== myMemberId) {
            res.status(403).json({ success: false, message: "게시글 삭제 권한이 없습니다." });
            return;
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
})


// boardId 값에 따른 특정 유저 게시글 페이지 라우터 하나 -> 무한 스크롤 
router.get("/myComment/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    console.log(id, 'commentId')
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 18; // 한 페이지에 표시할 게시물 수
    const offset = (page - 1) * pageSize;

    const countSql = 'SELECT COUNT(*) AS total FROM drinkcomment WHERE myMemberId = ?';
    const sql = `SELECT * FROM drinkcomment WHERE myMemberId = ? ORDER BY regTime DESC LIMIT ${offset}, ${pageSize}`;

    try {
        console.log("queryok", page)

        const [[{ total }]]: [[{ total: number }]] = await con.query(countSql, id);
        const [results]: [BoardResult[]] = await con.query(sql, id);
        res.status(200).json({ success: true, result: results, total: total });
    } catch (err) {
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});

export default router;