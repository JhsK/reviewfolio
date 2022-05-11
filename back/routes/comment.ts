import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import Comment from '../models/comment';
import CommentFile from '../models/commentFile';
import { isLoggedIn } from './middleware';

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 20MB
});

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      where: { RequestPostId: Number(req.query.postId), ApplicationId: Number(req.query.applicationId) },
      include: [
        {
          model: CommentFile,
        },
      ],
    });

    res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      UserId: req.user?.id,
      RequestPostId: req.body.postId,
      position: req.body.position,
      ApplicationId: req.body.ApplicationId,
    });

    if (req.body.file) {
      const createFile = await CommentFile.create({ src: req.body.file });
      await newComment.addCommentFile(createFile);
    }

    res.json(newComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/file', isLoggedIn, upload.single('file'), async (req, res, next) => {
  try {
    console.log(req.file);
    res.json((req.file as Express.Multer.File).filename);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
