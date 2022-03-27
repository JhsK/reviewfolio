import express from 'express';
import RequestPost from '../models/requestPost';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
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
