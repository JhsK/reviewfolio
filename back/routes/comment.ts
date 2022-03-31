import express from 'express';
import Comment from '../models/comment';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.get('/:id', isLoggedIn, async (req, res, next) => {
  console.log(req.params);
  try {
    // const StudentComment = await Comment.findAll({
    //   where: { RequestPostId: req.params.id, position: 'student'},
    // });

    // const ProgrammerComment = await Comment.findAll({
    //     where: { RequestPostId: req.params.id, position: 'programmer'},
    //   });

    // const returnComment = [StudentComment, ProgrammerComment];

    const comment = await Comment.findAll({
      where: { RequestPostId: req.params.id },
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
    });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
