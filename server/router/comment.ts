import express, { Request, Response } from 'express';
import con from '../util/db';
const router = express.Router();
const logger = require("../util/logger");

interface commentResult {
    commentId: number;
    myMemberId: number;
    boardId: number;
    acId: number;
    commentName: string;
    commentMsg: number;
    commentDelete: number;
    regTime: Date | string;
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

interface User {
    youId: string;
    youPass: string;
    youName: string;
    youNick: string;
    youEmail: string;
    youBirth: string;
    youAddress: string | null;
    youImgFile: string | null;
    youImgSize: string | null;
    memberDelete: number;
    regTime: string | Date;
}

router.post('/write/:boardId', async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const myMemberId = req.body.myMemberId;
    const contents = req.body.contents;

    try {
        const memberSql = 'SELECT * FROM drinkmember WHERE myMemberId = ?';
        const [rows] = await con.query(memberSql, myMemberId) as [User[]]
        const { youNick } = rows[0]

        const postSql = 'INSERT INTO drinkcomment(myMemberId, boardId, commentName, commentMsg) VALUES (?,?,?,?)';
        const commentUpdate = 'UPDATE drinkboard SET boardComment =+ 1 WHERE boardId = ?'
        const values = [myMemberId, boardId, youNick, contents]

        await con.query(postSql, values)
        await con.query(commentUpdate, boardId)

        res.status(200).json({ success: true, message: 'Comment posted successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error occurred while posting comment', error });
    }
})

router.get('/list/:boardId', async (req: Request, res: Response) => {

    const boardId = req.params.boardId;
    const page = parseInt(req.query.page as string);
    const offset = (page+1) * 10;

    console.log(page, 'page')
    console.log(offset,' offset')
    const countSql = 'SELECT COUNT(*) AS total FROM drinkcomment WHERE boardId = ?';
    const [[{ total }]]: [[{ total: number }]] = await con.query(countSql, [boardId]);

    try {
        const commentSql = 'SELECT * FROM drinkcomment WHERE boardId = ? LIMIT ?, ?';
        const [result]: [commentResult[]] = await con.query(commentSql, [boardId, 0, offset]);
        res.status(200).json({ success: true, result: result, total: total })
    } catch (error) {
        res.status(500).json({ success: false })
    }
})

// update 
router.get('/check/:boardId', async (req: Request, res: Response) => {
    const commentId = Number(req.query.commentId);;
    const boardId = Number(req.params.boardId);
    const paramsMember = Number(req.query.myMemberId);

    try {
        const checkSql = 'SELECT * FROM drinkcomment WHERE commentId = ? AND boardId = ?'
        const [[queryResult]]: [[commentResult]] = await con.query(checkSql, [commentId, boardId]);
        const { myMemberId } = queryResult

        if (myMemberId === paramsMember) {
            res.status(200).json({ success: true })
        } else {
            res.status(403).json({ success: false })
        }
    } catch (error) {
        res.status(500).json({ success: false })
    }
})

router.patch('/update/:commentId', async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    const commentMsg = req.body.msg;
    console.log(commentId)
    console.log(commentMsg)

    try {
        const sql = 'UPDATE drinkcomment SET commentMsg = ? WHERE commentId = ?';
        const values = [commentMsg, commentId]
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

export default router;