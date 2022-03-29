import express from 'express';
import Application from '../models/application';
import Programmer from '../models/programmer';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    const programmer = await Programmer.findOne({
        where: { UserId: req.user?.id },
    });

    const result = await Application.create({
        ProgrammerId: programmer?.id,
        RequestPostId: req.body.id,
    });

    res.json(result);
})

export default router;