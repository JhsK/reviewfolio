import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import RequestPost from '../models/requestPost';
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
    filename(req, file, done) { // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 20MB
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const newPost = await RequestPost.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user!.id,
    });

    return res.json(newPost);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/files', isLoggedIn, upload.array('files'), (req, res, next) => { // POST /post/images
  console.log(req.files);
  res.json((req.files as Express.Multer.File[]).map((v) => v.filename));
});

// router.get('/:id', async (req, res, next) => {
//   try {
//     const post = await Post.findOne({
//       where: { id: req.params.id },
//       include: [{
//         model: User,
//         attributes: ['id', 'nickname'],
//       }, {
//         model: Image,
//       }, {
//         model: User,
//         as: 'Likers',
//         attributes: ['id'],
//       }],
//     });
//     return res.json(post);
//   } catch (e) {
//     console.error(e);
//     return next(e);
//   }
// });

router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await RequestPost.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await RequestPost.destroy({ where: { id: req.params.id } });
    return res.send(req.params.id);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
