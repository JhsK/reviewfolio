import express from 'express';
import Application from '../models/application';
import Programmer from '../models/programmer';
import RequestPost from '../models/requestPost';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.get('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const applicant = await Application.findAll({
      where: { RequestPostId: Number(req.params.id) },
    });

    return res.json(applicant);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const programmer = await Programmer.findOne({
      where: { UserId: req.user?.id },
    });

    const result = await Application.create({
      ProgrammerId: programmer?.id,
      RequestPostId: req.body.id,
    });

    const applicant = await Application.findAll({
      where: { RequestPostId: req.body.id },
    });

    const post = await RequestPost.findOne({
      where: { id: req.body.id },
    });

    if (applicant.length === post?.maxReviewer) {
      await post.update({
        status: 'ing',
      });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
