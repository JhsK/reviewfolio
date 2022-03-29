import express from 'express';
import Programmer from '../models/programmer';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    const programmer = Programmer.findOrCreate({
        where: { UserId: req.user?.id },
    });
})