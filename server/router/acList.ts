import express, {Request, Response} from 'express';
import con from '../util/db'
const router = express.Router();
const logger = require("../util/logger")

router.get('/list/:category', async (req:Request, res:Response) => {
   const category = req.params.category;
   console.log(category) 
   try {
      if(category === '전체'){
         let sql = 'SELECT * FROM drinklist' 
         const [rows] = await con.query(sql)
         const result = rows
         console.log(result)
         res.status(200).json({success: true, drinkList: result})
      } else {
         let sql = 'SELECT * FROM drinklist WHERE acCategory= ?';
         const [rows] = await con.query(sql, category)
         const result = rows
         console.log(result)
         res.status(200).json({success: true, drinkList: result})
      }
   } catch (error) {
      res.status(500).json({success: false})
      logger.error(error)
   }
   
   
})

export default router