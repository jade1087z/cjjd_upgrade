import express, { Request, Response } from 'express';
import con from '../db';
const router = express.Router();
const logger = require("../logger");
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { error } from 'console';

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


router.post('/register', async (req: Request, res: Response) => {
    console.log(req.body)
    try {
        const { youId, youPass, youName, youNick, youEmail, youBirth, youAddress } = req.body;
        const hashedPassword = await bcrypt.hash(youPass, 10)
        let sql = 'INSERT INTO drinkmember(youId, youPass, youName, youNick, youEmail, youBirth, youAddress) VALUES(?, ?, ?, ?, ?, ?, ?)';
        let values = [youId, hashedPassword, youName, youNick, youEmail, youBirth, 'youAddress'];
        con.query(sql, values)
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/check', async (req: Request, res: Response) => {
    try {
        const {field, value} = req.body;
        let sql = `SELECT * FROM drinkmember WHERE ${field} = ?`
        const [rows, fields] = await con.query(sql, [value])
        console.log(rows.length, 'result')
        if (rows.length > 0) {   
            res.status(400).json({ success: false, message: 'cannot use' }) // 값이 있는 경우 
        } else {
            res.status(200).json({ success: true, message: 'can use' }) // 없는 경우 true 
        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'cannot use' }) // 값이 있는 경우 
        logger.error(error);
    }
})



router.post('/login', async (req: Request, res: Response) => {
    const { youId, youPass } = req.body;
    // if(user == null) {
    //     return res.status(400).send('cannot find user');
    // }
    // try {
    //     if(await bcrypt.compare(youPass, user.youPass)){
    //         const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string)
    //         res.json({ accessToken: accessToken });
    //     } else {
    //         res.send('not allowed');
    //     }
    // } catch {
    //     res.status(500).send()
    // }

})

export default router;


