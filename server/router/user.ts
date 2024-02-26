import express, { Request, Response } from 'express';
import con from '../db';
const router = express.Router();
const logger = require("../logger");
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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


router.post('/register', async(req: Request, res: Response) => {
    console.log(req.body)
    try {
        const {youId, youPass, youName, youNick, youEmail, youBirth, youAddress} = req.body;
        const hashedPassword = await bcrypt.hash(youPass, 10)
        let sql = 'INSERT INTO drinkmember(youId, youPass, youName, youNick, youEmail, youBirth, youAddress) VALUES(?, ?, ?, ?, ?, ?, ?)';
        let values  = [youId, hashedPassword, youName, youNick, youEmail, youBirth, 'youAddress'];
        con.query(sql, values)
        res.status(201).send()
    } catch(error){
        res.status(500).send()
    }
})

router.post('/login', async(req: Request, res: Response) => {
    const {youId, youPass} = req.body;
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


