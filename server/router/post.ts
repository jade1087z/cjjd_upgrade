import { ImageFile } from './../../client/src/interface/post/ImageFile.interface';
import express, { Request, Response } from 'express';
import con from '../util/db';
import { CustomFile } from '../interface/postInterface/file.interface';
import { BoardResult } from '../interface/postInterface/board.interface';
import { checkResults } from '../interface/postInterface/check.interface';
const setUpload = require('../util/multerS3')
const logger = require("../util/logger");
const router = express.Router();

router.post('/write/:mymemberId', async (req: Request, res: Response) => {
    const myMemberId = req.params.mymemberId;
    const { boardTitle, boardContents, boardAuthor } = req.body
    try {
        const sql = `INSERT INTO drinkBoard(myMemberId, boardTitle, boardContents, boardAuthor) VALUES (?, ?, ?, ?)`;
    let values = [myMemberId, boardTitle, boardContents, boardAuthor];
        await con.query(sql, values);
        res.status(200).json({ success: true });
    } catch (error) {
        console.log(error);
        logger.error(error); //에러 로깅
        res.status(500).send("serverError");
    }
})

router.patch('/update/:boardId', async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const { boardTitle, boardContents } = req.body

    try {
        const sql = 'UPDATE drinkboard SET boardTitle = ?, boardContents = ? WHERE boardId = ?';
        const values = [boardTitle, boardContents, boardId]
        await con.query(sql, values)
        res.status(200).json({ success: true });
    } catch (error) {
        logger.error(error)
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
})
// router.post('/write/:mymemberId', (req, res, next) => setUpload('cjjdup/post')(req, res, next), async (req: Request, res: Response) => {

//     const myMemberId = req.params.mymemberId;
//     const { boardTitle, boardContents, boardAuthor, imgRange } = req.body

//     function isCustomFile(file: any): file is CustomFile {
//         return file && typeof file === 'object' && 'location' in file;
//     }

//     let location: string[] = [];
//     let size: number[] = [];
//     console.log(req.file, ' req file ')
//     if (req.files && Array.isArray(req.files)) {
//         req.files.forEach(file => {
//             if (isCustomFile(file)) {
//                 // if문 안에서 선언된 변수에 값 할당
//                 location?.push(file.location)
//                 size?.push(file.size)
//             }
//         })
//     }
//     const locationJson = JSON.stringify(location)
//     const siezJson = JSON.stringify(size)
//     const RangeJson = JSON.stringify(imgRange)
//     const sql = `INSERT INTO drinkBoard(myMemberId, boardTitle, boardContents, boardAuthor, boardImgFile, boardImgSize, boardImgRange) VALUES (?, ?, ?, ?, ?,?, ?)`;
//     let values = [myMemberId, boardTitle, boardContents, boardAuthor, locationJson, siezJson, RangeJson];

//     try {
//         await con.query(sql, values);
//         res.status(200).json({ success: true });
//     } catch (error) {
//         console.log(error);
//         logger.error(error); //에러 로깅
//         res.status(500).send("serverError");
//     }

// })

// boardId 값에 따른 특정 유저 게시글 페이지 라우터 하나 -> 무한 스크롤 

router.get("/authpagelist/:boardAuthor", async (req: Request, res: Response) => {
    const boardAuthor = req.params.boardAuthor
    console.log(boardAuthor, 'boardAU')
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 18; // 한 페이지에 표시할 게시물 수
    const offset = (page - 1) * pageSize;

    let sql = `SELECT * FROM drinkBoard WHERE boardDelete = 0 AND boardAuthor = ? ORDER BY regTime DESC LIMIT ${offset}, ${pageSize}`;

    try {
        console.log("queryok", page)
        const [results]: [BoardResult[]] = await con.query(sql, boardAuthor);
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});

// 전체 리스트 가져오기  -> 무한 스크롤 
router.get("/pagelist", async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 18; // 한 페이지에 표시할 게시물 수
    const offset = (page - 1) * pageSize;

    let sql = `SELECT * FROM drinkBoard WHERE boardDelete = 0 ORDER BY regTime DESC LIMIT ${offset}, ${pageSize}`;

    try {
        console.log("queryok", page)
        const [results]: [BoardResult[]] = await con.query(sql);
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});

// 전체 리스트 가져오기 .
router.get("/list", async (req: Request, res: Response) => {
    let sql = `SELECT * FROM drinkBoard WHERE boardDelete = 0 ORDER BY regTime DESC`;

    try {
        console.log("queryok")
        const [results]: [BoardResult[]] = await con.query(sql);
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});

router.get("/bestpost", async (req: Request, res: Response) => {
    let results: BoardResult[] = [];
    let daysAgo = 0;

    try {
        while (results.length < 15) {
            let sql = `SELECT * FROM drinkboard WHERE boardDelete = 0 AND regTime < NOW() - INTERVAL ${daysAgo} DAY ORDER BY boardView DESC, boardLike DESC, regTime DESC`;
            let [additionalResults]: [BoardResult[]] = await con.query(sql)
            console.log(additionalResults, 'queryOK')

            results = results.concat(additionalResults);
            daysAgo++;
            if (additionalResults.length === 0) break;
        }

        if (results.length > 15) {
            results = results.slice(0, 15);
        }
        console.log(results, 'queryOK')
        res.status(200).json({ success: true, postList: results });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: "serverERR" });
        logger.error(err);
    }
});

// view page
router.get(`/view/:boardId`, async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const myMemberId = req.query.myMemberId;
    console.log(myMemberId, 'myMemberId1')

    let checkSql = "SELECT * FROM drinklikes WHERE myMemberId = ? AND boardId = ?";
    let valueForCheckSql = [myMemberId, boardId]
    let updateSql = `UPDATE drinkBoard SET boardView = boardView + 1 WHERE boardId = ? AND boardDelete = 0`;
    let sql = `SELECT * FROM drinkBoard WHERE boardId = ? AND boardDelete = 0`;
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
        const { myMemberId } = rows[0]
        if (rows.length === 0) {
            res.status(404).json({ success: false, message: "해당 게시글이 존재하지 않습니다." });
            return;
        }
        if (paramsMember === myMemberId) {
            res.status(200).json({ success: true, message: "게시글 수정이 가능합니다." })
        } else if (paramsMember !== myMemberId) {
            res.status(403).json({ success: false, message: "게시글 수정 권한이 없습니다." });
            return;
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
})

// router.patch('/update/:boardId', (req, res, next) => setUpload('cjjdup/post')(req, res, next), async (req: Request, res: Response) => {
//     const boardId = req.params.boardId;
//     const { boardTitle, boardContents, newRange } = req.body
//     console.log(newRange)

//     function isCustomFile(file: any): file is CustomFile {
//         return file && typeof file === 'object' && 'location' in file;
//     }

//     let location: string | undefined = undefined;
//     let size: number | undefined = undefined;

//     if (isCustomFile(req.file)) {
//         // if문 안에서 선언된 변수에 값 할당
//         location = req.file.location;
//         size = req.file.size;
//     }

//     console.log(req.file, 'reqfile')
//     console.log(location, 'location update')
//     console.log(size, 'siz')


//     try {
//         const sql = 'UPDATE drinkboard SET boardTitle = ?, boardContents = ?, boardImgFile = ?, boardImgSize = ?, boardImgRange = ? WHERE boardId = ?';
//         const values = [boardTitle, boardContents, location, size, newRange, boardId]
//         await con.query(sql, values)

//         res.status(200).json({ success: true });
//     } catch (error) {
//         logger.error(error)
//         res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
//     }

// })

// 게시글 삭제 부분 
router.delete('/delete/:boardId', async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const paramsMember = Number(req.query.myMemberId);
    console.log(boardId)
    console.log(paramsMember)

    try {
        const [rows] = await con.query('SELECT * FROM drinkboard WHERE boardId = ?', [boardId]);
        const { myMemberId } = rows[0]
        if (rows.length === 0) {
            res.status(404).json({ success: false, message: "해당 게시글이 존재하지 않습니다." });
            return;
        }

        if (paramsMember === myMemberId) {
            const result = await con.query('DELETE FROM drinkboard WHERE boardId = ?', [boardId])
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