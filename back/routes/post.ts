import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import Application from '../models/application';
import File from '../models/file';
import RequestPost from '../models/requestPost';
import User from '../models/user';
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

router.get('/', async (req, res, next) => {
  try {
    let where = {};

    const posts = await RequestPost.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'job'],
        },
        {
          model: File,
        },
      ],
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
    });
    console.log(posts);
    return res.json(posts);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const newPost = await RequestPost.create({
      title: req.body.title,
      body: req.body.body,
      UserId: req.user!.id,
      maxReviewer: req.body.reviewer,
      type: req.body.reviewType,
    });

    if (req.body.files) {
      if (Array.isArray(req.body.files)) {
        const createFile = await Promise.all(
          req.body.files.map((uploadFile: string) => File.create({ src: uploadFile })),
        );
        await newPost.addFiles(createFile);
      } else {
        const createFile = await File.create({ src: req.body.image });
        await newPost.addFile(createFile);
      }
    }

    const findUser = await User.findOne({
      where: { id: req.user?.id },
    });

    await User.update(
      {
        ticket: (findUser?.ticket as number) - req.body.reviewer,
      },
      {
        where: { id: req.user?.id },
      },
    );

    return res.json(newPost);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.put('/', isLoggedIn, upload.none(), async (req, res, next) => {
  console.log(req.body);
  try {
    const updatePost = await RequestPost.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: { id: req.body.requestPostId },
      },
    );
    return res.json(updatePost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/files', isLoggedIn, upload.array('files'), (req, res, next) => {
  console.log(req.files);
  res.json((req.files as Express.Multer.File[]).map((v) => v.filename));
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await RequestPost.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname', 'job'],
        },
        {
          model: File,
        },
        {
          model: Application,
        },
      ],
    });
    return res.json(post);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

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

router.get('/user/request', isLoggedIn, async (req, res, next) => {
  const requestList = await RequestPost.findAll({
    where: { UserId: req.user?.id },
    include: [
      {
        model: Application,
      },
    ],
  });

  res.json(requestList);
});

export default router;
