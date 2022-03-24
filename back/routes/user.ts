import bcrypt from 'bcrypt';
import express from 'express';
import passport from 'passport';
import User from '../models/user';
import { isLoggedIn, isNotLoggedIn } from './middleware';

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  const user = req.user?.toJSON();
  delete user.password;
  return res.json(user);
});

router.post('/', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      nickname: req.body.nickname,
      userId: req.body.userId,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err: Error, user: User, info: { message: string }) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr: Error) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: ['id', 'nickname', 'userId'],
        });
        return res.json(fullUser);
      } catch (err) {
        console.error(err);
        return next(err);
      }
    });
  })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.send('logout 성공');
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      attributes: ['id', 'nickname'],
    });
    if (!user) {
      return res.status(404).send('no user');
    }
    const jsonUser = user.toJSON();
    return res.json(jsonUser);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;