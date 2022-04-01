import express from 'express';
import Comment from '../models/comment';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      where: { RequestPostId: Number(req.query.postId), ApplicationId: Number(req.query.applicationId) },
    });

    res.json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      UserId: req.user?.id,
      RequestPostId: req.body.postId,
      position: req.body.position,
      ApplicationId: req.body.ApplicationId,
    });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
