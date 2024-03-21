import express, {Request, Response} from 'express';
import multer from 'multer';
const logger = require('../util/logger')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const router = express.Router();
const setUpload = require('../util/multerS3')


router.post('/post', (req, res, next) => setUpload('cjjdup/post')(req, res, next), async (req: Request, res: Response) => {
    console.log(req.files, 'req.file')
    try {
        if(req.files) {
            const file: any = req.files;
            console.log(file[0].location)
            res.status(200).json({success: true, url: file[0].location, size: file.size})
        } else {
            logger.error('파일x')
            res.status(400).json({success: false})
        }
    } catch (error) {
        logger.error('파일 업로드 x')
        res.status(500).json({success: false})
    }
})

// router.post('/post', upload.single('file'), async (req: Request, res: Response) => {
//     console.log(req.file)
//     try {
//         if(req.file) {
//             const file = {
//                 originalName: req.file.originalname,
//                 size: req.file.size,
//                 mimetype: req.file.mimetype,
//                 content: req.file.buffer.toString('base64')
//             };
//             res.status(200).json({success: true, url: file})
//         } else {
//             logger.error('파일 업로드 x')
//             res.status(400).json({success: false})
//         }
//     } catch (error) {
//         logger.error('파일 업로드 x')
//         res.status(500).json({success: false})
//     }
// })
export default router

