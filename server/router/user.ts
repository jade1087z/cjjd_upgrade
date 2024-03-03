import express, { Request, Response } from 'express';
import con from '../db';
const router = express.Router();
const logger = require("../logger");
const jwt = require("../jwt");
import bcrypt from 'bcryptjs';

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
        const youAddress = req.body.youAddress1 + req.body.youAddress2 + req.body.youAddress3;
        const { youId, youPass, youName, youNick, youEmail, youBirth } = req.body;
        const hashedPassword = await bcrypt.hash(youPass, 10)
        let sql = 'INSERT INTO drinkmember(youId, youPass, youName, youNick, youEmail, youBirth, youAddress) VALUES(?, ?, ?, ?, ?, ?, ?)';
        let values = [youId, hashedPassword, youName, youNick, youEmail, youBirth, youAddress];
        con.query(sql, values)
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/check', async (req: Request, res: Response) => {
    try {
        const { field, value } = req.body;
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
    try {
        const { youId, youPass } = req.body;
        let sql = 'SELECT * FROM drinkmember WHERE youId = ?';
        let value = [youId]
        const result = await con.query(sql, value);
        console.log(result[0][0],'resu')

        if (result.length > 0) {
            const user = result[0][0];
            console.log(user.youPass)
            if (await bcrypt.compare(youPass, user.youPass)) {
                const payload = {
                    userId: user.youId,
                    exp: Math.floor(Date.now() / 1000)  + (600 * 60),
                }
                const accessToken = jwt.generateToken(payload)
                res.status(200).json({ success: true, accessToken: accessToken, user: user })

            } else {
                res.status(403).send('Invalid password');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send()
    }

})

router.get('/info', async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401)
    }
    try {
        const userInfo = jwt.verifyToken(token)
        console.log(userInfo)
        res.status(200).json({success: true, userInfo: userInfo})
    } catch (error) {
        logger.error(error)
    }
})

//  UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with 
// the reason "jwt expired".
// 다음 에러는 jwt 토큰 만료시 생김 리프레쉬 토큰을 만들던지 // 서버에서 에러 처리를 하던지 해결할 것

export default router;


