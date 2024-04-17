import express, { Request, Response } from 'express';
import con from '../util/db'
import { alcohol } from '../interface/acInterface/ac.Interface';
import { checkResults } from '../interface/postInterface/check.interface';
const router = express.Router();
const logger = require("../util/logger")

router.get('/list/:category', async (req: Request, res: Response) => {
   const category = req.params.category;
   console.log(category)
   try {
      if (category === '전체') {
         let sql = 'SELECT * FROM drinklist'
         const [rows] = await con.query(sql)
         const result = rows
         console.log(result)
         res.status(200).json({ success: true, drinkList: result })
      } else {
         let sql = 'SELECT * FROM drinklist WHERE acCategory= ?';
         const [rows]: alcohol[] = await con.query(sql, category)
         const result = rows
         console.log(result)
         res.status(200).json({ success: true, drinkList: result })
      }
   } catch (error) {
      res.status(500).json({ success: false })
      logger.error(error)
   }
})
router.get('/ranking', async (req: Request, res: Response) => {
   try {
      let sql = 'SELECT * FROM drinklist ORDER BY acView DESC, acLike DESC LIMIT 10';
      const [rows]: alcohol[] = await con.query(sql)
      const result = rows
      res.status(200).json({success: true, drinkList: result})
   } catch (error) {
      res.status(500).json({success: false})
      logger.error(error)
   } 

})

router.get('/view/:acId', async (req: Request, res: Response) => {
   const acId = req.params.acId;
   const myMemberId = Number(req.query.myMemberId);

   console.log(acId)
   console.log(myMemberId, 'myMemberId1')
   console.log('acView')

   let checkSql = "SELECT * FROM drinklikes WHERE myMemberId = ? AND acId = ?";
   let valueForCheckSql = [myMemberId, acId]
   let updateSql = `UPDATE drinklist SET acView = acView + 1 WHERE acId = ?`;
   let sql = `SELECT * FROM drinklist WHERE acId = ?`;
   let value = acId;

   try {

      const [checkResults]: [checkResults[]] = await con.query(checkSql, valueForCheckSql);
      let isLiked = false;
      if (checkResults.length > 0) { isLiked = true }
      console.log(checkResults, 'checkResults')
      console.log(isLiked, 't')

      await con.query(updateSql, value)
      const [acDetail]: [alcohol[]] = await con.query(sql, acId);
      const result = acDetail[0]
      res.status(200).json({ success: true, result: result, isLiked: isLiked })

   } catch (error) {
      res.status(500).json({ success: false })
   }
})

router.post('/acLike/:acId', async (req: Request, res: Response) => {
   const myMemberId = Number(req.body.myMemberId);
   const isLiked = req.body.isLiked
   console.log(isLiked, 'isLike? tr')
   const acId = req.params.acId;
   console.log(myMemberId)
   const values = [myMemberId, acId]
   let sql;
   let updateSql;

   if (isLiked) {
      sql = `DELETE FROM drinkLikes WHERE myMemberId = ? AND acId = ?`
      updateSql = `UPDATE drinklist SET acLike = acLike - 1 WHERE acId = ?`
   } else {
      sql = "INSERT INTO drinkLikes (myMemberId, acId) VALUES (? , ?)";
      updateSql = `UPDATE drinklist SET acLike = acLike + 1 WHERE acId = ?`
   }
   try {
      await con.query(sql, values)
      await con.query(updateSql, acId)
      const [rows] = await con.query(`SELECT * FROM drinklist WHERE acId = ?`, [acId]);
      const result = rows[0];  // 가정: boardId는 유일(unique)하므로 결과의 첫 번째 행을 post로 사용
      console.log(result, 'result')
      res.status(200).json({ success: true, result: result })

   } catch (err) {
      logger.error(err)
      res.status(400).json({ success: false })
   }
})


export default router